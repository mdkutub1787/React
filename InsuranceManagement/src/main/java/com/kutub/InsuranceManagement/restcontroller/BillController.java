package com.kutub.InsuranceManagement.restcontroller;

import com.kutub.InsuranceManagement.entity.Bill;
import com.kutub.InsuranceManagement.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/bill")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private BillService billService;


    @GetMapping("/")
    public List<Bill> getAllBills() {
        return billService.getAllBill();
    }



    @PostMapping("/save")
    public void saveBill(@RequestBody Bill b) {
        billService.saveBill(b);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateBill(@PathVariable int id, @RequestBody Bill b) {
        try {
            billService.updateBill(b, id);
            return ResponseEntity.ok("Bill updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    @DeleteMapping("/delete/{id}")
    public void deleteBillById(@PathVariable int id) {
        billService.deleteBill(id);
    }

    // Get bill by ID
    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable int id) {
        Bill bill = billService.getBillById(id);
        return ResponseEntity.ok(bill);
    }

    // Search bills by policyholder
    @GetMapping("/searchpolicyholder")
    public List<Bill> getBillsByPolicyholder(@RequestParam String policyholder) {
        return billService.getBillsByPolicyholder(policyholder);
    }



    @GetMapping("/searchpolicyid")
    public ResponseEntity<List<Bill>> findBillsByPolicyId(@RequestParam("policyid") int policyid) {
        List<Bill> bills = billService.findBillByPolicyId(policyid);
        return ResponseEntity.ok(bills);
    }



}
