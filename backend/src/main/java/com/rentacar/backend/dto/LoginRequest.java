package com.rentacar.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username; // email or phone
    private String password;
}
