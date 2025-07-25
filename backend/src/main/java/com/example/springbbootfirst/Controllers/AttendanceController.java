package com.example.springbbootfirst.Controllers;

import com.example.springbbootfirst.Models.Attendance;
import com.example.springbbootfirst.Services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/check-in/{username}")
    public Attendance checkIn(@PathVariable String username) {
        return attendanceService.checkIn(username);
    }

    @PostMapping("/check-out/{username}")
    public Attendance checkOut(@PathVariable String username) {
        return attendanceService.checkOut(username);
    }

    @GetMapping("/today/{username}")
    public Optional<Attendance> getByUserName(@PathVariable String username){
        return attendanceService.getTodayAttendanceByUsername(username);
    }

    @GetMapping("/all")
    public List<Attendance> getAll(){
        return  attendanceService.getAllAttendance();
    }

    @GetMapping("/today")
    public List<Attendance> getTodayAttendance(){
        LocalDate today = LocalDate.now();
        return attendanceService.getTodayAttendance(today);
    }
}
