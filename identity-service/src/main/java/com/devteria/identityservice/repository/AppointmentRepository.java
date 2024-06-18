package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Appointment;
import com.devteria.identityservice.entity.DoctorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,String> {
}
