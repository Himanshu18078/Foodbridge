package com.foodbridge.service;

import com.foodbridge.entity.FoodDonation;
import com.foodbridge.entity.User;
import com.foodbridge.enums.DonationStatus;
import com.foodbridge.repository.FoodDonationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.NumberUp;
import java.util.List;
import java.util.Optional;


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
    //Function to accept the donation
    public FoodDonation acceptsDonation(Long donationId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User ngo = (User)authentication.getPrincipal();
        Optional<FoodDonation> foodDonation = foodDonationRepository.findById(donationId);
        if(foodDonation.isEmpty()){
            throw new IllegalArgumentException("Donation doesn't exists");
        }
        FoodDonation foodDonationObject = foodDonation.get();
        if(foodDonationObject.getStatus() == DonationStatus.AVAILABLE){
            foodDonationObject.setNgo(ngo);
            foodDonationObject.setStatus(DonationStatus.ACCEPTED);
            return foodDonationRepository.save(foodDonationObject);
        }
        throw new IllegalArgumentException("Donation is not available");
    }
    public List<FoodDonation> getAcceptedDonation(){
        return foodDonationRepository.findByStatus(DonationStatus.ACCEPTED);
    }
    //function to pick up the donation
    public FoodDonation pickUpDonation(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User volunteer = (User)authentication.getPrincipal();
        Optional<FoodDonation> foodDonation = foodDonationRepository.findById(id);
        if(foodDonation.isEmpty()){
            throw new IllegalArgumentException("Donation doesn't exists");
        }
        FoodDonation foodDonationObject = foodDonation.get();
        if(foodDonationObject.getStatus() == DonationStatus.ACCEPTED){
            foodDonationObject.setVolunteer(volunteer);
            foodDonationObject.setStatus(DonationStatus.PICKED_UP);
            return foodDonationRepository.save(foodDonationObject);
        }
        throw new IllegalArgumentException("Donation is not available");
    }
    //function to deliver the food
    public FoodDonation deliverDonation(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User volunteer = (User)authentication.getPrincipal();
        Optional<FoodDonation> foodDonation = foodDonationRepository.findById(id);
        if(foodDonation.isEmpty()){
            throw new IllegalArgumentException("Donation doesn't exists");
        }
        FoodDonation foodDonationObject = foodDonation.get();
        if(foodDonationObject.getVolunteer().getId().equals(volunteer.getId()) && foodDonationObject.getStatus() == DonationStatus.PICKED_UP){
            foodDonationObject.setStatus(DonationStatus.DELIVERED);
            return foodDonationRepository.save(foodDonationObject);
        }
        throw new IllegalArgumentException("Donation cannot be delivered");
    }
}
