package com.rentacar.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private Long id;
    private String email;
    private String phone;
    private List<String> roles;
}
