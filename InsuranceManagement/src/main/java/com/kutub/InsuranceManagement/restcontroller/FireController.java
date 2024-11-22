package com.kutub.InsuranceManagement.restcontroller;

import com.kutub.InsuranceManagement.entity.Fire;
import com.kutub.InsuranceManagement.entity.Policy;
import com.kutub.InsuranceManagement.service.FireService;
import com.kutub.InsuranceManagement.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/fire")
@CrossOrigin("*")
public class FireController {

    @Autowired
    private FireService fireService;

    // Get all FirePolicies
    @GetMapping("/")
    public List<Fire> getAllFire() {
        return fireService.getAllFire();
    }

    // Create a new FirePolicy
    @PostMapping("/save")
    public void saveFire(@RequestBody Fire f) {
        fireService.saveFire(f);
    }

    // Update a FirePolicy by ID
    @PutMapping("/update/{id}")
    public  void updateFire(@RequestBody Fire f){
        fireService.saveFire(f);
    }

    // Delete a FirePolicy by ID
    @DeleteMapping("/delete/{id}")
    public void deleteFireById(@PathVariable int id) {
        fireService.deleteFire(id);
    }


}
