package com.devteria.identityservice.dto.response;

import com.devteria.identityservice.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppointmentResponse {
    String fullName;
    String email;
    String phoneNumber;
    String gender;
    String address;
    int selectedDay;
    String selectedTime;
    User user;
}
