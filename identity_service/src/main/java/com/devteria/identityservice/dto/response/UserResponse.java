package com.devteria.identityservice.dto.response;

import java.time.LocalDate;
import java.util.Set;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String email;
    String username;
    String firstname;
    String lastname;
    String phonenumber;
    String address;
    LocalDate dob;
    Set<RoleResponse> roles;
}
