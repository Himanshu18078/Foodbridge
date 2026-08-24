package com.foodbridge.controller;

import com.foodbridge.entity.FoodDonation;
import com.foodbridge.service.FileStorageService;
import com.foodbridge.service.FoodDonationService;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;

@RestController
@RequestMapping("/donations")
public class FoodDonationController {

    // Instance Variables
    private final FoodDonationService foodDonationService;
    private final FileStorageService fileStorageService;

    // Constructor
    public FoodDonationController(
            FoodDonationService foodDonationService,
            FileStorageService fileStorageService) {

        this.foodDonationService = foodDonationService;
        this.fileStorageService = fileStorageService;
    }

    // Create Donation
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('DONOR')")
    public ResponseEntity<FoodDonation> createDonation(
            @RequestParam String foodName,
            @RequestParam Integer quantity,
            @RequestParam String pickupAddress,
            @RequestParam String expiryTime,
            @RequestParam MultipartFile image) throws IOException {

        FoodDonation foodDonation = new FoodDonation();

        foodDonation.setFoodName(foodName);
        foodDonation.setQuantity(quantity);
        foodDonation.setPickupAddress(pickupAddress);
        foodDonation.setExpiryTime(Timestamp.valueOf(expiryTime));

        // Save image and get filename
        String imageUrl = fileStorageService.saveFile(image);

        // Store filename in database
        foodDonation.setImageUrl(imageUrl);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(foodDonationService.createDonation(foodDonation));
    }

    // Get Available Donations
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
            @ParameterObject Pageable pageable) {

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