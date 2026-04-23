package com.rentacar.backend.controller;

import com.rentacar.backend.model.Car;
import com.rentacar.backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carRepository.findById(id).orElse(null);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Car addCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setName(carDetails.getName());
                    car.setRating(carDetails.getRating());
                    car.setType(carDetails.getType());
                    car.setCategory(carDetails.getCategory());
                    car.setTransmission(carDetails.getTransmission());
                    car.setFuel(carDetails.getFuel());
                    car.setSeats(carDetails.getSeats());
                    car.setDoors(carDetails.getDoors());
                    car.setAc(carDetails.isAc());
                    car.setPrice(carDetails.getPrice());
                    car.setOriginalPrice(carDetails.getOriginalPrice());
                    car.setImage(carDetails.getImage());
                    car.setAvailable(carDetails.isAvailable());
                    carRepository.save(car);
                    return ResponseEntity.ok("Car updated successfully!");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        return carRepository.findById(id)
                .map(car -> {
                    carRepository.delete(car);
                    return ResponseEntity.ok("Car deleted successfully!");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
