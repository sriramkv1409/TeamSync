package com.example.springbbootfirst.Services;

import com.example.springbbootfirst.Models.*;
import com.example.springbbootfirst.Repository.RegisterDetailsRepository;
import com.example.springbbootfirst.Repository.RolesRepository;
import com.example.springbbootfirst.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    RegisterDetailsRepository registerDetailsRepository;

    @Autowired
    RolesRepository rolesRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    public String addNewEmployee(UserDetailsDto register){

        System.out.println("Saving: " + register);
        RegisterDetails registerDetails = new RegisterDetails();
        registerDetails.setEmpId(register.getEmpId());
        registerDetails.setName(register.getName());
        registerDetails.setEmail(register.getEmail());
        registerDetails.setPassword(passwordEncoder.encode(register.getPassword()));
        registerDetails.setUserName(register.getUserName());
        Set<Roles> roles = new HashSet<>();
        for(String roleName:register.getRoleNames()){
            Roles role = rolesRepository.findByRoleName(roleName).orElse(null);
            roles.add(role);
        }
        registerDetails.setRoles(roles);
        registerDetailsRepository.save(registerDetails);
        return "Employee Added Successfully";
    }

//    public String authenticateUser(String email, String password) {
//        RegisterDetails user = registerDetailsRepository.findByEmail(email);
//
//        if (user == null) {
//            return "User not found!";
//        }
//
//        if (!passwordEncoder.matches(password, user.getPassword())) {
//            return "Invalid password!";
//        }
//
//        return "Login successful for: " + user.getName();
//    }
public JwtResponse authenticate(LoginRequest login) {
    Authentication authentication =
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            login.getUserName(),login.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = jwtTokenProvider.generateToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    Set<String> roles = userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toSet());

    return new JwtResponse(jwt,userDetails.getUsername(),roles);

}

    public Optional<RegisterDetails> getUserByUsername(String username){
        return registerDetailsRepository.findByUserName(username);
    }
}
