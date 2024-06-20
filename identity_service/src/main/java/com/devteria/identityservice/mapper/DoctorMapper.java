package com.devteria.identityservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import com.devteria.identityservice.dto.request.DoctorProfileRequest;
import com.devteria.identityservice.dto.response.DoctorProfileResponse;
import com.devteria.identityservice.entity.DoctorProfile;
import com.devteria.identityservice.entity.User;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    @Mappings({@Mapping(target = "id", ignore = true), @Mapping(target = "user", ignore = true)})
    DoctorProfile toDoctorProfile(DoctorProfileRequest request);

    DoctorProfileResponse toDoctorProfileResponse(DoctorProfile doctorProfile);

    @Named("userToResponse")
    default User userToResponse(User user) {
        // Custom mapping logic from User to DoctorProfileResponse.User
        return user;
    }
}
