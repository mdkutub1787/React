package com.kutub.InsuranceManagement.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date;
    private String bankName;
    private String policyholder;
    private String address;
    private double sumInsurd;


    @JsonIgnore
    @OneToMany(mappedBy = "policy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Bill> bills;

}
