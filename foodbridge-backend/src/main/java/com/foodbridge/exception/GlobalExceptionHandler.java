package com.foodbridge.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handles all IllegalArgumentException exceptions
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> illegalArgumentExceptionHandler(
            IllegalArgumentException ex) {

        return ResponseEntity
                .badRequest()
                .body(ex.getMessage());
    }

    // Handles validation exceptions thrown by @Valid
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> methodArgumentNotValidExceptionHandler(
            MethodArgumentNotValidException ex) {

        // Stores field names and their corresponding error messages
        Map<String, String> errors = new HashMap<>();

        // Loop through all validation errors
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {

            // Add field name as key and error message as value
            errors.put(error.getField(), error.getDefaultMessage());
        }

        // Return 400 Bad Request with all validation errors
        return ResponseEntity
                .badRequest()
                .body(errors);
    }
}