package com.foodbridge.entity;

import com.foodbridge.enums.DonationStatus;
import com.foodbridge.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @ManyToOne
    @JoinColumn(name = "ngo_id")
    private User ngo;

    @ManyToOne
    @JoinColumn(name = "volunteer_id")
    private User volunteer;
    @NotBlank(message = "Food name is required...")
    private String foodName;
    @Min(value = 1 , message = "Quantity must be at least one...")
    private int quantity;
    @NotBlank(message = "Pickup address is required...")
    private String pickupAddress;
    @Future(message = "Expiry time must be in future...")
    private Timestamp expiryTime;
    @Enumerated(EnumType.STRING)
    private DonationStatus status;
    private String imageUrl;
}
