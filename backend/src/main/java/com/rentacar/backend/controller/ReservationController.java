package com.rentacar.backend.controller;

import com.rentacar.backend.model.Reservation;
import com.rentacar.backend.repository.ReservationRepository;
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

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
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
