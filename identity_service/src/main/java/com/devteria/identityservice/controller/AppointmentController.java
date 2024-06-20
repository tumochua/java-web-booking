package com.devteria.identityservice.controller;

import java.util.List;

import jakarta.mail.MessagingException;

import org.springframework.web.bind.annotation.*;

import com.devteria.identityservice.dto.request.*;
import com.devteria.identityservice.dto.response.AppointmentResponse;
import com.devteria.identityservice.service.AppointmentService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AppointmentController {
    AppointmentService appointmentService;

    @PostMapping("/{userId}")
    ApiResponse<AppointmentResponse> create(@PathVariable String userId, @RequestBody AppointmentRequest request)
            throws MessagingException {
        log.info("check request {}" + userId);
        return ApiResponse.<AppointmentResponse>builder()
                .result(appointmentService.create(userId, request))
                .build();
    }

    @GetMapping()
    public ApiResponse<List<AppointmentResponse>> getAppointmentsByUserId() {
        return ApiResponse.<List<AppointmentResponse>>builder()
                .result(appointmentService.getAppointmentsByUserId())
                .build();
    }
}
