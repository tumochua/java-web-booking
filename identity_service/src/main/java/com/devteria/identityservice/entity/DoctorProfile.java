package com.devteria.identityservice.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String userNameDetail;
    String title;
    String imageLink;
    String hospitalAddress;
    String examinationAddress;
    BigDecimal examinationPrice;

    @Lob
    @Column(name = "markdown_content", columnDefinition = "TEXT")
    String markdownContent;

    String specialization;

    @ManyToOne
    User user;
}
