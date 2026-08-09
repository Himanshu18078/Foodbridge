package com.foodbridge.controller;

import com.foodbridge.entity.FoodDonation;
import com.foodbridge.service.FoodDonationService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springdoc.core.annotations.ParameterObject;

@RestController
@RequestMapping("/donations")
public class FoodDonationController {

    // Instance Variable
    private final FoodDonationService foodDonationService;

    // Constructor
    public FoodDonationController(FoodDonationService foodDonationService) {
        this.foodDonationService = foodDonationService;
    }

    // Create Donation
    @PostMapping
    public ResponseEntity<FoodDonation> createDonation(
            @Valid @RequestBody FoodDonation foodDonation) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(foodDonationService.createDonation(foodDonation));
    }

    // Get Available Donations with Pagination
    @GetMapping("/available")
    public ResponseEntity<Page<FoodDonation>> getAvailableFood(
            @ParameterObject Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(foodDonationService.getAvailableDonations(pageable));
    }

    // Accept Donation
    @PutMapping("/{id}/accept")
    public ResponseEntity<FoodDonation> acceptDonation(@PathVariable Long id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(foodDonationService.acceptsDonation(id));
    }

    // Get Accepted Donations
    @GetMapping("/accepted")
    public ResponseEntity<Page<FoodDonation>> getAcceptedDonation(
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(foodDonationService.getAcceptedDonation(pageable));
    }

    // Pick Up Donation
    @PutMapping("/{id}/pickup")
    public ResponseEntity<FoodDonation> pickUpDonation(@PathVariable Long id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(foodDonationService.pickUpDonation(id));
    }

    // Deliver Donation
    @PutMapping("/{id}/deliver")
    public ResponseEntity<FoodDonation> deliverDonation(@PathVariable Long id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(foodDonationService.deliverDonation(id));
    }
}