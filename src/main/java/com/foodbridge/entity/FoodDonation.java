package com.foodbridge.entity;

import com.foodbridge.enums.DonationStatus;
import com.foodbridge.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class FoodDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne// Many food donations can belong to one user (donor).
    @JoinColumn(name = "donor_id")
    /*
     Creates a foreign key column "donor_id" in the food_donation table.
     Hibernate stores the id of the User object assigned as the donor.
    */
    private User donor;
    private String foodName;
    private int quantity;
    private String pickupAddress;
    private Timestamp expiryTime;
    @Enumerated(EnumType.STRING)
    private DonationStatus status;
}
