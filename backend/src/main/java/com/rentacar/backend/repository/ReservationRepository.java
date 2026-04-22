package com.rentacar.backend.repository;

import com.rentacar.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByCarId(Long carId);

    @org.springframework.data.jpa.repository.Query("SELECT r FROM Reservation r WHERE r.car.id = :carId AND " +
           "((:startDate <= r.endDate) AND (:endDate >= r.startDate)) AND r.status != 'CANCELLED'")
    List<Reservation> findOverlappingReservations(
            @org.springframework.data.repository.query.Param("carId") Long carId,
            @org.springframework.data.repository.query.Param("startDate") java.time.LocalDate startDate,
            @org.springframework.data.repository.query.Param("endDate") java.time.LocalDate endDate);
}
