package com.example.blog_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<Map<String,Object>> handlePostNotFound(PostNotFoundException ex){
        Map<String,Object> response= new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status",404);
        response.put("error","Not found");
        response.put("message",ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> handleValidationErrors(MethodArgumentNotValidException ex){
        Map<String,Object> response= new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status",400);
        response.put("error","Bad Request");

        Map<String,String> fieldErrors=new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> fieldErrors.put(error.getField(),error.getDefaultMessage()));

        response.put("message","Validation failed");
        response.put("errors",fieldErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
