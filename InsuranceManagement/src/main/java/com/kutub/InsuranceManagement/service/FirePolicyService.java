package com.kutub.InsuranceManagement.service;

import com.kutub.InsuranceManagement.entity.Policy;
import com.kutub.InsuranceManagement.repository.FirePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FirePolicyService {

    @Autowired
    private FirePolicyRepository firePolicyRepository;


    // Get all FirePolicies
    public List<Policy> getAllFirePolicy() {
        return firePolicyRepository.findAll();
    }


    // Add a new FirePolicy
    public void saveFirePolicy(Policy fp) {
         firePolicyRepository.save(fp);
    }

    // Find a FirePolicy entity by its ID
    public Policy findById(int id){

        return  firePolicyRepository.findById(id).get();
    }

    // Update FirePolicy by id
    public  void updateFirePolicy(Policy fp, int id){
        firePolicyRepository.save(fp);

    }

    // Delete FirePolicy by id
    public void deleteFirePolicy(int id) {
        firePolicyRepository.deleteById(id);
    }

}
