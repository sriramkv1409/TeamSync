package com.example.springbbootfirst.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RegisterDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int empId;

    @Column(name = "emp_name")
    private String name;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "user_name",nullable = false,unique = true)
    private String userName;

    @ManyToMany(fetch = FetchType.EAGER,cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "user_roles",joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "empId"),
    inverseJoinColumns = @JoinColumn(name = "role_id",referencedColumnName = "roleId"))
    private Set<Roles> roles;

    @OneToMany(mappedBy = "employee")
    @JsonManagedReference
    private List<Task> tasks;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Attendance> attendanceRecords = new ArrayList<>();


}

