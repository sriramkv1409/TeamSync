package com.example.springbbootfirst.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRoleDTO {
    private String name;
    private String roleName;
}
