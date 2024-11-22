package com.kutub.InsuranceManagement.repository;

import com.kutub.InsuranceManagement.entity.Fire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FireRepository extends JpaRepository<Fire,Integer> {
}
