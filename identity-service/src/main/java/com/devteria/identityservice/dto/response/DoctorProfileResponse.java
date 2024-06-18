package com.devteria.identityservice.dto.response;

import com.devteria.identityservice.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorProfileResponse {
    String id;
    String userNameDetail;
    String title;
    String imageLink;
    String hospitalAddress;
    String examinationAddress;
    BigDecimal examinationPrice;
    String markdownContent;
    String specialization;
    User user;
}
