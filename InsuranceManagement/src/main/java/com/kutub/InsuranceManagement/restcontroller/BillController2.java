package com.kutub.InsuranceManagement.restcontroller;

import com.kutub.InsuranceManagement.entity.Bill2;
import com.kutub.InsuranceManagement.service.BillService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/bill2")
@CrossOrigin("*")
public class BillController2 {

    @Autowired
    private  BillService2 billService2;


    @GetMapping("/")
    public List<Bill2> getAllBills() {
        return billService2.getAllBills();
    }



    @PostMapping("/save")
    public void saveBill(@RequestBody Bill2 b) {
        billService2.saveBill2(b);
    }




}
