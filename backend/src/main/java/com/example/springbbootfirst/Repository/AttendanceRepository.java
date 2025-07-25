package com.example.springbbootfirst.Repository;

import com.example.springbbootfirst.Models.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByEmployeeEmpIdAndDate(int empId, LocalDate date);
    List<Attendance> findByEmployeeEmpId(int empId);
    Optional<Attendance> findByEmployeeUserNameAndDate(String username, LocalDate date);
    List<Attendance> findByDate(LocalDate date);
}
