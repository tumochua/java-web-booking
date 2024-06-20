package com.devteria.identityservice.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String fullName;
    String email;
    String phoneNumber;
    String gender;
    String address;
    int selectedDay;
    String selectedTime;
    LocalDateTime selectDay;

    @ManyToOne
    @JoinColumn(name = "user_appointment_id")
    User user;
}
