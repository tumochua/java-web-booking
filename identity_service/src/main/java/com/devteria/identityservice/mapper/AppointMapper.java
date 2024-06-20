package com.devteria.identityservice.mapper;

import org.mapstruct.Mapper;

import com.devteria.identityservice.dto.request.AppointmentRequest;
import com.devteria.identityservice.dto.response.AppointmentResponse;
import com.devteria.identityservice.entity.Appointment;

@Mapper(componentModel = "spring")
public interface AppointMapper {
    Appointment toAppointment(AppointmentRequest appointmentRequest);

    AppointmentResponse toAppointmentResponse(Appointment appointment);
}
