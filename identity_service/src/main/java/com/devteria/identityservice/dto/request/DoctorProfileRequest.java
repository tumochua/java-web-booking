package com.devteria.identityservice.dto.request;

import java.math.BigDecimal;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorProfileRequest {
    String userNameDetail;
    String title;
    String imageLink;
    String hospitalAddress;
    String examinationAddress;
    BigDecimal examinationPrice;
    String markdownContent;
    String specialization;
}
