package com.example.springbbootfirst.Services;

import com.example.springbbootfirst.Models.RegisterDetails;
import com.example.springbbootfirst.Models.UserDetailsImpl;
import com.example.springbbootfirst.Repository.RegisterDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    RegisterDetailsRepository registerDetailsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        /*
        3 things
        1. Loading data from your database
        2. setting up the authorities
        3. returning up proper UserDetails
         */

        //Step 1
        RegisterDetails user = registerDetailsRepository.findByUserName(username)
                .orElseThrow(()->new RuntimeException("User Not Found"));

        //Step 2
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(user, authorities);
    }
}