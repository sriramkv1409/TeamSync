package com.example.springbbootfirst.Services;

import com.example.springbbootfirst.Models.RegisterDetails;
import com.example.springbbootfirst.Models.Task;
import com.example.springbbootfirst.Models.TaskDTO;
import com.example.springbbootfirst.Repository.RegisterDetailsRepository;
import com.example.springbbootfirst.Repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private RegisterDetailsRepository employeeRepository;
    public Task assignTask(TaskDTO taskDTO) {
        // 1. Find the employee to assign the task to
        RegisterDetails employee = employeeRepository.findById(taskDTO.getEmpId())
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: " + taskDTO.getEmpId()));

        // 2. Create a new Task entity
        Task newTask = new Task();
        newTask.setDescription(taskDTO.getDescription());
        newTask.setDueDate(LocalDate.parse(taskDTO.getDueDate()));
        newTask.setStatus("PENDING");
        newTask.setEmployee(employee);

        // 3. Save the new task to the database
        return taskRepository.save(newTask);
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public List<Task> getTaskByEmployeeId(int empId) {
        return taskRepository.findByEmployeeEmpId(empId);
    }

    public List<Task> getTaskByName(String userName) {
        return taskRepository.findByEmployeeUserName(userName);
    }

    public Task updateTaskStatus(Long taskId, String status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public String deleteTaskById(Long taskId) {
         taskRepository.deleteById(taskId);
         return "Task deleted Succesfully";
    }
}