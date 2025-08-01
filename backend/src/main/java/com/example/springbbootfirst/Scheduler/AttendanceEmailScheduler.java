package com.example.springbbootfirst.Scheduler;

import com.example.springbbootfirst.Models.Attendance;
import com.example.springbbootfirst.Services.AttendanceService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class AttendanceEmailScheduler {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private JavaMailSender mailSender;

    // Runs every day at 6 PM
    @Scheduled(cron = "0 0 21 * * *", zone = "Asia/Kolkata")
    public void sendDailyAttendanceReport() {
        List<Attendance> todayRecords = attendanceService.getTodayAttendance(LocalDate.now());

        if (todayRecords.isEmpty()) return;

        StringBuilder emailContent = new StringBuilder("📝 Daily Attendance Report:\n\n");

        for (Attendance record : todayRecords) {
            emailContent.append("👤 Employee: ")
                    .append(record.getEmployee().getUserName())
                    .append("\nDate: ").append(record.getDate())
                    .append("\nCheck-In: ").append(record.getCheckIn() != null ? record.getCheckIn().toString() : "N/A")
                    .append("\nCheck-Out: ").append(record.getCheckOut() != null ? record.getCheckOut().toString() : "N/A")
                    .append("\nTotal Hours: ").append(record.getTotalHours() != null ? record.getTotalHours() + " hrs" : "—")
                    .append("\n------------------------\n");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("sriramkv1409@gmail.com"); // Replace with your admin email
        message.setSubject("Daily Attendance Report - " + LocalDate.now());
        message.setText(emailContent.toString());

        try {
            mailSender.send(message);
            System.out.println("📧 Attendance report sent to admin.");
        } catch (Exception e) {
            System.err.println("❌ Failed to send attendance report: " + e.getMessage());
        }
    }
}
