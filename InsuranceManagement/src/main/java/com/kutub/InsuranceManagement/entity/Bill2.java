package com.kutub.InsuranceManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bills2")
public class Bill2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private double sumInsured;

    @Column(name = "fire_rate", nullable = false)
    private double fire;

    @Column(name = "rsd_rate", nullable = false)
    private double rsd;

    @Column(nullable = false)
    private double netPremium;

    @Column(name = "tax_rate", nullable = false)
    private double tax = 15.0;

    @Column(nullable = false)
    private double grossPremium;
}
