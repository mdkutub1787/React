package com.kutub.InsuranceManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double sumInsurd;

    @Column( name = "fire_rate_% ",nullable = false)
    private double fire;

    @Column( name = "rsd_rate_% ",nullable = false)
    private double rsd;

    @Column(nullable = false)
    private double netPremium;

    @Column( name = "tax_rate_% ",nullable = false)
    private double tax = 15;

    @Column(nullable = false)
    private double grossPremium;

    // Many Bills can belong to one Policy
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "policyId", nullable = false)  // Foreign key for Policy entity
    private Policy policy;






}
