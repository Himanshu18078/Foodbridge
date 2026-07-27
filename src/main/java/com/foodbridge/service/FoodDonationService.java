package com.foodbridge.service;

import com.foodbridge.entity.FoodDonation;
import com.foodbridge.entity.User;
import com.foodbridge.enums.DonationStatus;
import com.foodbridge.repository.FoodDonationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FoodDonationService {
    //Instance Variable
    private final FoodDonationRepository foodDonationRepository;
    // Constructor for constructor injection
    FoodDonationService(FoodDonationRepository foodDonationRepository){
        this.foodDonationRepository = foodDonationRepository;
    }
    //Function to create food donation
    public FoodDonation createDonation(FoodDonation foodDonation) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Get tha authentication objects from the security context that you store while authenticating the object
        User donor = (User)authentication.getPrincipal();
        // get the object from the authentication object and make it user type and store it in the donor
        foodDonation.setDonor(donor);
        foodDonation.setStatus(DonationStatus.AVAILABLE);
        return foodDonationRepository.save(foodDonation);
    }
    public List<FoodDonation> getAvailableDonations() {
        return foodDonationRepository.findByStatus(DonationStatus.AVAILABLE);
    }
}
