package com.rentacar.backend.config;

import com.rentacar.backend.model.Car;
import com.rentacar.backend.model.Role;
import com.rentacar.backend.model.User;
import com.rentacar.backend.repository.CarRepository;
import com.rentacar.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(CarRepository carRepository, UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(new User(null, "Admin", "admin@rentacar.com", "0771234567", encoder.encode("admin123"), Role.ADMIN));
                System.out.println("Admin user created: admin@rentacar.com / admin123");
            }
            if (carRepository.count() == 0) {
                carRepository.saveAll(List.of(
                    new Car(null, "BMW X5 2024", 4.8, "SUV", "Automatic", "Petrol", 5, "New York", 120.0, 150.0, "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600"),
                    new Car(null, "Mercedes C-Class 2024", 4.6, "Sedan", "Automatic", "Petrol", 5, "Los Angeles", 95.0, 120.0, "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600"),
                    new Car(null, "Toyota RAV4 2024", 4.5, "SUV", "Automatic", "Petrol", 5, "Chicago", 80.0, 100.0, "https://images.unsplash.com/photo-1621007947382-34dd86bbaee3?auto=format&fit=crop&q=80&w=600"),
                    new Car(null, "Audi A4 2024", 4.7, "Sedan", "Automatic", "Petrol", 5, "Miami", 110.0, 130.0, "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=600"),
                    new Car(null, "Tesla Model 3", 4.9, "Sedan", "Automatic", "Electric", 5, "San Francisco", 90.0, 110.0, "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=600")
                ));
                System.out.println("Database seeded with sample cars.");
            }
        };
    }
}
