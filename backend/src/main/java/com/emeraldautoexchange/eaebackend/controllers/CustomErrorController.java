package com.emeraldautoexchange.eaebackend.controllers;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomErrorController implements ErrorController {
    @GetMapping(value = "/error", produces = "text/plain")
    @ResponseBody
    String error() {
        return "Error 404: Not Found";
    }
}
