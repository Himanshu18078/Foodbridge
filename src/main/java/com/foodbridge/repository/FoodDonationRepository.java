package com.foodbridge.repository;

import com.foodbridge.entity.FoodDonation;
import com.foodbridge.entity.User;
import com.foodbridge.enums.DonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

public interface FoodDonationRepository extends JpaRepository<FoodDonation,Long> {
    List<FoodDonation> findByStatus(DonationStatus status);

}
