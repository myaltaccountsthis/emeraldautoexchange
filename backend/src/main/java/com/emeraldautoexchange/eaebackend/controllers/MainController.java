package com.emeraldautoexchange.eaebackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @GetMapping("/add/{num1}/{num2}")
    int add(@PathVariable int num1, @PathVariable int num2) {
        return num1 + num2;
    }
}
