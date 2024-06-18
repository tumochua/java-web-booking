package com.devteria.identityservice.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppointmentRequest {
    String fullName;
    String email;
    String phoneNumber;
    String gender;
    String address;
    int selectedDay;
    String selectedTime;
}
