package com.devteria.identityservice.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.DateFormatSymbols;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import com.devteria.identityservice.dto.request.*;
import com.devteria.identityservice.dto.response.AppointmentResponse;
import com.devteria.identityservice.entity.Appointment;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.AppointMapper;
import com.devteria.identityservice.repository.AppointmentRepository;
import com.devteria.identityservice.repository.UserRepository;
import com.nimbusds.jose.*;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppointmentService {

    AppointmentRepository appointmentRepository;
    UserRepository userRepository;
    AppointMapper appointMapper;
    JavaMailSender emailSender;
    ResourceLoader resourceLoader;

    public AppointmentResponse create(String userId, AppointmentRequest request) throws MessagingException {
        log.info("check user id" + userId);
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Create Appointment object
        Appointment appointment = appointMapper.toAppointment((request));
        appointment.setUser(user);

        // Set createdAt field
        appointment.setSelectDay(LocalDateTime.now());

        log.info("check full user" + user.getFirstname());
        appointment = appointmentRepository.save(appointment);

        // Prepare and send confirmation email
        sendConfirmationEmail(appointment, user);

        return appointMapper.toAppointmentResponse(appointment);
    }

    private void sendConfirmationEmail(Appointment appointment, User user) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(appointment.getEmail()); // Set recipient's email here
        helper.setSubject("Appointment Confirmation");

        // Process the email template with appointment and user details
        String emailContent = getEmailContent(appointment, user);
        helper.setText(emailContent, true); // true indicates HTML content

        emailSender.send(message);
    }

    private String getEmailContent(Appointment appointment, User user) {
        try {
            log.info("check user email" + user.getFirstname());
            // Load the email template from resources
            Resource resource = resourceLoader.getResource("classpath:/appointment_confirmation_email.html");
            String templateContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);

            // Replace placeholders with actual values
            String emailContent = templateContent
                    .replace("{{ fullName }}", appointment.getFullName())
                    .replace(
                            "{{ selectedDay }}",
                            getDayOfWeek(appointment.getSelectedDay())) // Chuyển đổi thành thứ trong tuần
                    .replace("{{ selectedTime }}", appointment.getSelectedTime())
                    .replace("{{ userFirstname }}", user.getFirstname())
                    .replace("{{ userLastname }}", user.getLastname())
                    .replace("{{ userEmail }}", user.getEmail())
                    .replace("{{ userPhoneNumber }}", user.getPhonenumber());

            return emailContent;
        } catch (IOException e) {
            log.error("Failed to load or process email template: {}", e.getMessage());
            return ""; // Handle the error appropriately
        }
    }

    public List<AppointmentResponse> getAppointmentsByUserId() {
        return appointmentRepository.findAllWithUser().stream()
                .map(appointMapper::toAppointmentResponse)
                .toList();
    }

    private String getDayOfWeek(int selectedDay) {
        // Đối tượng DateFormatSymbols để lấy các tên của các ngày trong tuần
        DateFormatSymbols dfs = new DateFormatSymbols();

        // Lấy tên của các ngày trong tuần
        String[] weekdays = dfs.getWeekdays();

        // Trả về tên của ngày trong tuần dựa vào số selectedDay
        // Weekdays trong Java bắt đầu từ Chủ nhật (1) đến Thứ 7 (7)
        return weekdays[selectedDay];
    }
}
