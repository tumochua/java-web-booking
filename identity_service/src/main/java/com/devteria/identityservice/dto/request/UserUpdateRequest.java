package com.devteria.identityservice.dto.request;

import java.time.LocalDate;
import java.util.List;

import com.devteria.identityservice.validator.DobConstraint;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    String email;
    String username;
    String firstname;
    String lastname;
    String phonenumber;
    String address;
    // String password;
    @DobConstraint(min = 18, message = "INVALID_DOB")
    LocalDate dob;

    // List<String> roles;
    List<RoleRequest> roles;
}
