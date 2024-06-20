package com.devteria.identityservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.devteria.identityservice.entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Appointment a WHERE a.user.id = :userId")
    void deleteByUserAppointmentId(@Param("userId") String userId);

    List<Appointment> findByUserId(String userId);

    @Query("SELECT a FROM Appointment a JOIN FETCH a.user")
    List<Appointment> findAllWithUser();
}
