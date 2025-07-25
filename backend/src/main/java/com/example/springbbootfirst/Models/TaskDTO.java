package com.example.springbbootfirst.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long taskId;
    private String description;
    private String dueDate; // Received as a String from JSON
    private int empId;


}