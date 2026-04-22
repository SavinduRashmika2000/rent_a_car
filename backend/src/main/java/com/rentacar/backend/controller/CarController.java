package com.rentacar.backend.controller;

import com.rentacar.backend.model.Car;
import com.rentacar.backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}
