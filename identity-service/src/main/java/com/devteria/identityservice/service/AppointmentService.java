package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.*;
import com.devteria.identityservice.dto.response.AppointmentResponse;
import com.devteria.identityservice.dto.response.AuthenticationResponse;
import com.devteria.identityservice.dto.response.IntrospectResponse;
import com.devteria.identityservice.entity.Appointment;
import com.devteria.identityservice.entity.InvalidatedToken;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.AppointMapper;
import com.devteria.identityservice.repository.AppointmentRepository;
import com.devteria.identityservice.repository.InvalidatedTokenRepository;
import com.devteria.identityservice.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

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


    public AppointmentResponse create(String userId,AppointmentRequest request) throws MessagingException {
        log.info("check user id"+userId);
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Appointment appointment = appointMapper.toAppointment((request));
        appointment.setUser(user);
        log.info("check full user"+user.getFirstname());
        appointment = appointmentRepository.save(appointment);
        // Prepare and send confirmation email
        sendConfirmationEmail(appointment, user);

//        helper.setTo("nguyenvantu14012003@gmail.com");
//        helper.setSubject("nguyenvantu14012003@gmail.com");
//        helper.setText("text", true); // true indicates html
//
//        emailSender.send(message);




       return  appointMapper.toAppointmentResponse(appointment);

//        log.info("Creating appointment for user with id: {}", userId);
//        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
//        Appointment appointment = appointMapper.toAppointment(request);
//        appointment.setUser(user);
//        appointment = appointmentRepository.save(appointment);
//
//        // Send confirmation email
//        MimeMessage message = emailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//        helper.setTo(user.getEmail());
//        helper.setSubject("Appointment Confirmation");
//
//        // Get email content with replaced placeholders
//        String emailContent = getEmailContent(appointment, user);
//        helper.setText(emailContent, true); // true for HTML content
//
//        emailSender.send(message);
//
//        return appointMapper.toAppointmentResponse(appointment);
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
            log.info("check user email"+ user.getFirstname());
            // Load the email template from resources
            Resource resource = resourceLoader.getResource("classpath:/appointment_confirmation_email.html");
            String templateContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);

            // Replace placeholders with actual values
            String emailContent = templateContent.replace("{{ fullName }}", appointment.getFullName())
                    .replace("{{ selectedDay }}", String.valueOf(appointment.getSelectedDay()))
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


}
