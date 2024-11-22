package com.kutub.InsuranceManagement.service;

import com.kutub.InsuranceManagement.entity.Bill2;
import com.kutub.InsuranceManagement.repository.BillRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService2 {

    @Autowired
    private BillRepository2 billRepository;

    // Get all Bills
    public List<Bill2> getAllBills() {
        return billRepository.findAll();
    }

    // Save a new Bill with calculations
    public Bill2 saveBill2(Bill2 bill) {
        calculatePremiums(bill); // Perform calculations before saving
        return billRepository.save(bill);
    }

    // Update an existing Bill by ID
    public Bill2 updateBill2(int id, Bill2 updatedBill) {
        if (!billRepository.existsById(id)) {
            throw new RuntimeException("Bill not found with ID: " + id);
        }
        updatedBill.setId(id); // Ensure the ID is set for updating
        calculatePremiums(updatedBill); // Recalculate premiums
        return billRepository.save(updatedBill);
    }

    // Delete a Bill by ID
    public void deleteBill(int id) {
        if (!billRepository.existsById(id)) {
            throw new RuntimeException("Bill not found with ID: " + id);
        }
        billRepository.deleteById(id);
    }

    // Calculation method for premiums
    private void calculatePremiums(Bill2 bill) {
        double fireRate = bill.getFire() / 100; // Fire rate in percentage
        double rsdRate = bill.getRsd() / 100;   // RSD rate in percentage
        double taxRate = bill.getTax() / 100;   // Tax rate in percentage

        double sumInsured = bill.getSumInsured(); // Sum Insured from Bill2 entity

        // Calculate net premium
        double netPremium = (sumInsured * fireRate) + (sumInsured * rsdRate);
        bill.setNetPremium(roundToTwoDecimalPlaces(netPremium));

        // Calculate tax on net premium
        double tax = netPremium * taxRate;

        // Calculate gross premium
        double grossPremium = netPremium + tax;
        bill.setGrossPremium(roundToTwoDecimalPlaces(grossPremium));
    }

    // Method to round to two decimal places
    private double roundToTwoDecimalPlaces(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
