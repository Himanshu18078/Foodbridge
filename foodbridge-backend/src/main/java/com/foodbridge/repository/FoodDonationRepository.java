package com.foodbridge.repository;

import com.foodbridge.entity.FoodDonation;
import com.foodbridge.enums.DonationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodDonationRepository extends JpaRepository<FoodDonation, Long> {

    Page<FoodDonation> findByStatus(DonationStatus status, Pageable pageable);
    Page<FoodDonation> findByStatusIn(List<DonationStatus> statuses, Pageable pageable);

}