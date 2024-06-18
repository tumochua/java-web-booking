package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.DoctorProfile;
import com.devteria.identityservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorProfileRepository extends JpaRepository<DoctorProfile,String> {
    Optional<DoctorProfile> findByUser(User user);

}
