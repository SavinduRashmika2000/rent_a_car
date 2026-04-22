package com.rentacar.backend.controller;

import com.rentacar.backend.model.Car;
import com.rentacar.backend.model.Reservation;
import com.rentacar.backend.model.User;
import com.rentacar.backend.repository.CarRepository;
import com.rentacar.backend.repository.ReservationRepository;
import com.rentacar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservationRequest) {
        // 1. Fetch full Car and User
        Car car = carRepository.findById(reservationRequest.getCar().getId()).orElse(null);
        User user = userRepository.findById(reservationRequest.getUser().getId()).orElse(null);

        if (car == null || user == null) {
            return ResponseEntity.badRequest().body("Error: Car or User not found.");
        }

        // 2. Check general availability/activity
        if (!car.isAvailable()) {
            return ResponseEntity.badRequest().body("Error: This car is currently offline/not available.");
        }
        if (!user.isActive()) {
            return ResponseEntity.badRequest().body("Error: This customer account is deactivated.");
        }

        // 3. Check for overlapping reservations
        List<Reservation> overlaps = reservationRepository.findOverlappingReservations(
                car.getId(), reservationRequest.getStartDate(), reservationRequest.getEndDate());
        
        if (!overlaps.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: The car is already booked for these dates.");
        }

        // 4. Save
        reservationRequest.setCar(car);
        reservationRequest.setUser(user);
        if (reservationRequest.getStatus() == null) reservationRequest.setStatus("CONFIRMED");
        
        Reservation saved = reservationRepository.save(reservationRequest);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateReservation(@PathVariable Long id, @RequestBody Reservation reservationDetails) {
        return reservationRepository.findById(id)
                .map(reservation -> {
                    reservation.setStatus(reservationDetails.getStatus());
                    reservation.setStartDate(reservationDetails.getStartDate());
                    reservation.setEndDate(reservationDetails.getEndDate());
                    reservation.setTotalPrice(reservationDetails.getTotalPrice());
                    reservationRepository.save(reservation);
                    return ResponseEntity.ok("Reservation updated successfully!");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        return reservationRepository.findById(id)
                .map(reservation -> {
                    reservationRepository.delete(reservation);
                    return ResponseEntity.ok("Reservation deleted successfully!");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
