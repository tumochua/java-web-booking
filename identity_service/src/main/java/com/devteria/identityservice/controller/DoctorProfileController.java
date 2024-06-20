package com.devteria.identityservice.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.request.DoctorProfileRequest;
import com.devteria.identityservice.dto.response.DoctorProfileResponse;
import com.devteria.identityservice.service.DoctorProfileService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/doctor")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DoctorProfileController {

    DoctorProfileService doctorProfileService;

    @PostMapping("/{userId}")
    ApiResponse<DoctorProfileResponse> createOrUpdate(
            @PathVariable String userId, @RequestBody DoctorProfileRequest request) {
        return ApiResponse.<DoctorProfileResponse>builder()
                .result(doctorProfileService.createOrUpdate(userId, request))
                .build();
    }

    @GetMapping
    ApiResponse<List<DoctorProfileResponse>> getDoctorProfiles() {
        return ApiResponse.<List<DoctorProfileResponse>>builder()
                .result(doctorProfileService.getDoctorProfile())
                .build();
    }

    @GetMapping("/{doctorProfileId}")
    ApiResponse<DoctorProfileResponse> getDoctorProfile(@PathVariable String doctorProfileId) {
        return ApiResponse.<DoctorProfileResponse>builder()
                .result(doctorProfileService.getDoctorProfileById(doctorProfileId))
                .build();
    }

    @GetMapping("/check/{userId}")
    ApiResponse<DoctorProfileResponse> getDoctorProfileByUserId(@PathVariable String userId) {
        return ApiResponse.<DoctorProfileResponse>builder()
                .result(doctorProfileService.getDoctorProfileByUserId(userId))
                .build();
    }
}
