package com.example.springbbootfirst.Controllers;

import com.example.springbbootfirst.Models.JwtResponse;
import com.example.springbbootfirst.Models.LoginRequest;
import com.example.springbbootfirst.Models.RegisterDetails;
import com.example.springbbootfirst.Models.UserDetailsDto;
import com.example.springbbootfirst.Repository.RegisterDetailsRepository;
import com.example.springbbootfirst.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public String addNewUser(@RequestBody UserDetailsDto registerDetails){
        authService.addNewEmployee(registerDetails);
        return "Employee Register Successfully";
    }

    @PostMapping("/login")
    public JwtResponse Login(@RequestBody LoginRequest login) {
        return authService.authenticate(login);
    }

}
