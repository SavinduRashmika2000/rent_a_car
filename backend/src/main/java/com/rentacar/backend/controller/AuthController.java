package com.rentacar.backend.controller;

import com.rentacar.backend.dto.JwtResponse;
import com.rentacar.backend.dto.LoginRequest;
import com.rentacar.backend.dto.SignupRequest;
import com.rentacar.backend.model.Role;
import com.rentacar.backend.model.User;
import com.rentacar.backend.repository.UserRepository;
import com.rentacar.backend.security.JwtUtils;
import com.rentacar.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateTokenFromUsername(authentication.getName());

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getEmail(),
                    userDetails.getPhone(),
                    roles));
        } catch (org.springframework.security.authentication.DisabledException e) {
            return ResponseEntity.badRequest().body("Error: Your account has been deactivated. Please contact support.");
        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.badRequest().body("Error: Invalid username or password.");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        if (userRepository.existsByPhone(signUpRequest.getPhone())) {
            return ResponseEntity.badRequest().body("Error: Phone number is already in use!");
        }

        // Create new user's account
        User user = new User(null,
                signUpRequest.getName(),
                signUpRequest.getEmail(),
                signUpRequest.getPhone(),
                encoder.encode(signUpRequest.getPassword()),
                Role.CUSTOMER,
                true);

        String strRole = signUpRequest.getRole();
        if (strRole != null && strRole.equalsIgnoreCase("ADMIN")) {
            // Check if current user is admin to allow creating another admin
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                user.setRole(Role.ADMIN);
            } else {
                return ResponseEntity.status(403).body("Error: Only admins can create other admins!");
            }
        }

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
