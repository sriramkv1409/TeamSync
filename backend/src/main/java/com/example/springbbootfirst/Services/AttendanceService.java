package com.example.springbbootfirst.Services;

import com.example.springbbootfirst.Models.Attendance;
import com.example.springbbootfirst.Models.RegisterDetails;
import com.example.springbbootfirst.Repository.AttendanceRepository;
import com.example.springbbootfirst.Repository.RegisterDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private RegisterDetailsRepository registerRepository;

    public Attendance checkIn(String username) {
        RegisterDetails employee = registerRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();
        Optional<Attendance> existing = attendanceRepository.findByEmployeeUserNameAndDate(username, today);
        if (existing.isPresent()) {
            throw new RuntimeException("Already checked in today");
        }

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setDate(today);
        attendance.setCheckIn(LocalDateTime.now());

        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut(String username) {
        Attendance attendance = attendanceRepository.findByEmployeeUserNameAndDate(username, LocalDate.now())
                .orElseThrow(() -> new RuntimeException("Check-in not found"));

        if (attendance.getCheckOut() != null) {
            throw new RuntimeException("Already checked out today");
        }

        attendance.setCheckOut(LocalDateTime.now());
        Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
        attendance.setTotalHours((double) duration.toHours());

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Optional<Attendance> getTodayAttendanceByUsername(String username) {
        return attendanceRepository.findByEmployeeUserNameAndDate(username, LocalDate.now());
    }


    public List<Attendance> getTodayAttendance(LocalDate today) {
         return attendanceRepository.findByDate(today);
    }
}
