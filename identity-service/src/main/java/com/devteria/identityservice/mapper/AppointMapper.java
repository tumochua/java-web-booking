package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.AppointmentRequest;
import com.devteria.identityservice.dto.request.DoctorProfileRequest;
import com.devteria.identityservice.dto.response.AppointmentResponse;
import com.devteria.identityservice.dto.response.DoctorProfileResponse;
import com.devteria.identityservice.entity.Appointment;
import com.devteria.identityservice.entity.DoctorProfile;
import com.devteria.identityservice.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface AppointMapper {
    Appointment toAppointment(AppointmentRequest appointmentRequest);

    AppointmentResponse toAppointmentResponse (Appointment appointment);

}
