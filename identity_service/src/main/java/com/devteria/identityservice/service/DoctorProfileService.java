package com.devteria.identityservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devteria.identityservice.dto.request.DoctorProfileRequest;
import com.devteria.identityservice.dto.response.DoctorProfileResponse;
import com.devteria.identityservice.entity.DoctorProfile;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.DoctorMapper;
import com.devteria.identityservice.repository.DoctorProfileRepository;
import com.devteria.identityservice.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DoctorProfileService {

    DoctorProfileRepository doctorProfileRepository;
    UserRepository userRepository;
    DoctorMapper doctorMapper;

    public DoctorProfileResponse createOrUpdate(String userId, DoctorProfileRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        DoctorProfile doctorProfile = doctorProfileRepository
                .findByUser(user)
                .map(existingProfile -> updateDoctorProfile(existingProfile, request))
                .orElseGet(() -> createNewDoctorProfile(user, request));

        doctorProfile = doctorProfileRepository.save(doctorProfile);

        return doctorMapper.toDoctorProfileResponse(doctorProfile);
    }

    private DoctorProfile createNewDoctorProfile(User user, DoctorProfileRequest request) {
        DoctorProfile doctorProfile = doctorMapper.toDoctorProfile(request);
        doctorProfile.setUser(user);
        return doctorProfile;
    }

    private DoctorProfile updateDoctorProfile(DoctorProfile existingProfile, DoctorProfileRequest request) {
        existingProfile.setUserNameDetail(request.getUserNameDetail());
        existingProfile.setTitle(request.getTitle());
        existingProfile.setImageLink(request.getImageLink());
        existingProfile.setHospitalAddress(request.getHospitalAddress());
        existingProfile.setExaminationAddress(request.getExaminationAddress());
        existingProfile.setExaminationPrice(request.getExaminationPrice());
        existingProfile.setMarkdownContent(request.getMarkdownContent());
        existingProfile.setSpecialization(request.getSpecialization());
        return existingProfile;
    }

    public List<DoctorProfileResponse> getDoctorProfile() {
        return doctorProfileRepository.findAll().stream()
                .map(doctorMapper::toDoctorProfileResponse)
                .toList();
    }

    public DoctorProfileResponse getDoctorProfileById(String doctorProfileId) {
        return doctorMapper.toDoctorProfileResponse(doctorProfileRepository
                .findById(doctorProfileId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    public DoctorProfileResponse getDoctorProfileByUserId(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        DoctorProfile doctorProfile = doctorProfileRepository
                .findByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return doctorMapper.toDoctorProfileResponse(doctorProfile);
    }

    @Transactional
    public void deleteByUserId(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Optional<DoctorProfile> doctorProfileOptional = doctorProfileRepository.findByUser(user);
        if (doctorProfileOptional.isPresent()) {
            DoctorProfile doctorProfile = doctorProfileOptional.get();
            doctorProfileRepository.delete(doctorProfile);
        }
    }
}
