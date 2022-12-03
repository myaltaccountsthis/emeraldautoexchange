package com.emeraldautoexchange.eaebackend.controllers;

import com.emeraldautoexchange.eaebackend.Vehicle;
import com.emeraldautoexchange.eaebackend.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainController {
    @Autowired
    VehicleRepository repo;

    @GetMapping("/add/{num1}/{num2}")
    int add(@PathVariable int num1, @PathVariable int num2) {
        return num1 + num2;
    }

    @GetMapping("/inventory")
    List<Vehicle> getInventory() {
        return repo.findAllByOrderByIdAsc();
    }
}
