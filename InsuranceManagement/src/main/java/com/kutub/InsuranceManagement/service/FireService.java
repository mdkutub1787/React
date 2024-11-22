package com.kutub.InsuranceManagement.service;

import com.kutub.InsuranceManagement.entity.Fire;
import com.kutub.InsuranceManagement.entity.Policy;
import com.kutub.InsuranceManagement.repository.FireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FireService {

    @Autowired
    private FireRepository fireRepository;


    // Get all FirePolicies
    public List<Fire> getAllFire() {
        return fireRepository.findAll();
    }


    // Add a new FirePolicy
    public void saveFire(Fire f) {
        fireRepository.save(f);
    }

    // Find a FirePolicy entity by its ID
    public Fire findById(int id){

        return  fireRepository.findById(id).get();
    }

    // Update FirePolicy by id
    public  void updateFire(Fire f, int id){
        fireRepository.save(f);

    }

    // Delete FirePolicy by id
    public void deleteFire(int id) {
        fireRepository.deleteById(id);
    }

}
