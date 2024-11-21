package com.kutub.InsuranceManagement.restcontroller;

import com.kutub.InsuranceManagement.entity.Policy;
import com.kutub.InsuranceManagement.service.FirePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/firepolicy")
@CrossOrigin("*")
public class FirePolicyController {

    @Autowired
    private FirePolicyService firePolicyService;

    // Get all FirePolicies
    @GetMapping("/")
    public List<Policy> getAllFirePolicies() {
        return firePolicyService.getAllFirePolicy();
    }

    // Create a new FirePolicy
    @PostMapping("/save")
    public void saveFirePolicy(@RequestBody Policy fp) {
         firePolicyService.saveFirePolicy(fp);
    }

    // Update a FirePolicy by ID
    @PutMapping("/update/{id}")
    public  void updateFirePolicy(@RequestBody Policy fp){
        firePolicyService.saveFirePolicy(fp);
    }

    // Delete a FirePolicy by ID
    @DeleteMapping("/delete/{id}")
    public void deleteFirePolicyById(@PathVariable int id) {
        firePolicyService.deleteFirePolicy(id);
    }


}
