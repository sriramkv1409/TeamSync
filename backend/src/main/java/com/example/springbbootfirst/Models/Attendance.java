package com.example.springbbootfirst.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private LocalDateTime checkIn;

    private LocalDateTime checkOut;

    private Double totalHours; // Optional: can be calculated

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "emp_id")
    @JsonIgnoreProperties({"attendanceRecords"})  // prevent infinite recursion
    private RegisterDetails employee;

}
