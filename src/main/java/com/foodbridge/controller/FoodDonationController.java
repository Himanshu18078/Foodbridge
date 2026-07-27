package com.foodbridge.controller;

import com.foodbridge.entity.FoodDonation;
import com.foodbridge.service.FoodDonationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
public class FoodDonationController {
    //Instance variable
    private final FoodDonationService foodDonationService;
    //Constructor
    public FoodDonationController(FoodDonationService foodDonationService){
        this.foodDonationService = foodDonationService;
    }
    @PostMapping
    public ResponseEntity<FoodDonation> createDonation(@RequestBody FoodDonation foodDonation){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(foodDonationService.createDonation(foodDonation));
    }
    @GetMapping("/available")
    public ResponseEntity<List<FoodDonation>> getAvailableFood(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(foodDonationService.getAvailableDonations());
    }
}
