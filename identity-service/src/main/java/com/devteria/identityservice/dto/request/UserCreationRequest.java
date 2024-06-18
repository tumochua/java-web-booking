package com.devteria.identityservice.dto.request;

import java.time.LocalDate;
import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import com.devteria.identityservice.validator.DobConstraint;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 4, message = "USERNAME_INVALID")
    String username;

    @Size(min = 6, message = "INVALID_PASSWORD")
    String password;

    @NotBlank(message = "INVALID_FIRST_NAME")
    String firstname;

    @NotBlank(message = "INVALID_lAST_NAME")
    String lastname;

    @Email(message = "INVALID_EMAIL", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @NotBlank(message = "INVALID_EMAIL")
    String email;

    @Pattern(regexp = "(^$|[0-9]{10})", message = "INVALID_PHONE_NUMBER")
    String phonenumber;

    @NotBlank(message = "INVALID_ADDRESS")
    String address;

   @DobConstraint(min = 10, message = "INVALID_DOB")
    LocalDate dob;

    Set<String> roles;
}
