package com.devteria.identityservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devteria.identityservice.entity.DoctorProfile;
import com.devteria.identityservice.entity.User;

@Repository
public interface DoctorProfileRepository extends JpaRepository<DoctorProfile, String> {
    Optional<DoctorProfile> findByUser(User user);
}
