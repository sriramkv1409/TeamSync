package com.example.springbbootfirst.Repository;

import com.example.springbbootfirst.Models.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RolesRepository extends JpaRepository<Roles,Integer> {
     Optional<Roles> findByRoleName(String roleName);
}
