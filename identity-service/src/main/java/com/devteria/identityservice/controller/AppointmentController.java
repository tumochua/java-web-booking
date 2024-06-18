package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.*;
import com.devteria.identityservice.dto.response.AppointmentResponse;
import com.devteria.identityservice.dto.response.AuthenticationResponse;
import com.devteria.identityservice.dto.response.DoctorProfileResponse;
import com.devteria.identityservice.dto.response.IntrospectResponse;
import com.devteria.identityservice.service.AppointmentService;
import com.devteria.identityservice.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AppointmentController {
   AppointmentService appointmentService;

    @PostMapping("/{userId}")
    ApiResponse<AppointmentResponse> create (@PathVariable String userId, @RequestBody AppointmentRequest request) throws MessagingException {
        log.info("check request {}"+userId);
        return ApiResponse.<AppointmentResponse>builder()
                .result(appointmentService.create(userId, request))
                .build();
    }

}
