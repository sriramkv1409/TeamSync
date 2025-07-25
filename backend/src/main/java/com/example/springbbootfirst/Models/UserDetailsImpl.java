package com.example.springbbootfirst.Models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {

    private final RegisterDetails user;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(RegisterDetails user, Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        this.authorities = authorities;
    }

    public RegisterDetails getUser() {
        return user;
    }

    public String getUserName() {
        return user.getUserName();
    }

    public String getEmail() {
        return user.getEmail();
    }

    public Collection<String> getRoleNames() {
        return user.getRoles().stream()
                .map(role -> role.getRoleName())
                .collect(Collectors.toSet());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName(); // Must match what Spring uses
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
