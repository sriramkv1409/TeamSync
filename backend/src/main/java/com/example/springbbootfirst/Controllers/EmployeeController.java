package com.example.springbbootfirst.Controllers;

import com.example.springbbootfirst.Models.*;
import com.example.springbbootfirst.Services.AuthService;
import com.example.springbbootfirst.Services.EmployeeService;
import jakarta.persistence.PostRemove;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
//@RequestMapping("/employee")
public class EmployeeController {
    //Service layer
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AuthService authService;


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/")
    public String sample(){
        return "Welcome to SPRING-BOOT Security Features";
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/employee")
    public List<RegisterDetails> getEmployees(){
        return employeeService.getAllEmployees();
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/employee/{empId}")
    public RegisterDetails getEmployeeById(@PathVariable int empId) {
        return employeeService.getEmployeeById(empId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employee/role/{roleName}")
    public List<EmployeeRoleDTO> getEmployeeByRole(@PathVariable String roleName){
        return employeeService.getEmployeeByRole(roleName);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/employee/add")
    public String addEmployee(@RequestBody UserDetailsDto details){
        authService.addNewEmployee(details);
        return "Employee added Successfully";
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/employee/{empId}")
    public String deleteEmployeeById(@PathVariable int empId){
        return employeeService.deleteEmployeeById(empId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/employee")
    public String deleteAllEmployee(){
        return employeeService.deleteAllEmployee();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/employee/{empId}")
    public String updateRecord(@PathVariable int empId,@RequestBody UserDetailsDto updateDetails){
        return employeeService.updateRecord(empId,updateDetails);
    }

}
