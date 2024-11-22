package com.kutub.InsuranceManagement.repository;

import com.kutub.InsuranceManagement.entity.Bill2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository2 extends JpaRepository<Bill2,Integer> {
}
