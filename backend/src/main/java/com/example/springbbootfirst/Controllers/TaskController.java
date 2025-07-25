package com.example.springbbootfirst.Controllers;

import com.example.springbbootfirst.Models.Task;
import com.example.springbbootfirst.Models.TaskDTO;
import com.example.springbbootfirst.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your React app
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/assign")
    public ResponseEntity<Task> assignTask(@RequestBody TaskDTO taskDTO) {
        Task createdTask = taskService.assignTask(taskDTO);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Task> getallTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/{empId}")
    public List<Task> getTaskByEmployeeId(@PathVariable int empId){
        return taskService.getTaskByEmployeeId(empId);
    }

    @GetMapping("/username/{userName}")
    public List<Task> getTaskByName(@PathVariable String userName){
        return taskService.getTaskByName(userName);
    }

    @PutMapping("/status/{taskId}")
    public ResponseEntity<Task> updateStatus(@PathVariable Long taskId, @RequestBody String status) {
        Task updatedTask = taskService. updateTaskStatus(taskId, status);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{taskId}")
    public String deleteTaskById(@PathVariable Long taskId){
        return taskService.deleteTaskById(taskId);
    }

}