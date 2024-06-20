package com.devteria.identityservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(1009, "Email is not valid", HttpStatus.BAD_REQUEST),
    INVALID_PHONE_NUMBER(1010, "Phone number cannot be greater than {max}", HttpStatus.BAD_REQUEST),
    INVALID_ADDRESS(1011, "Invalid address", HttpStatus.BAD_REQUEST),
    INVALID_TOKEN(1012, "Invalid token", HttpStatus.BAD_REQUEST),
    INVALID_FIRST_NAME(1013, "Invalid first name", HttpStatus.BAD_REQUEST),
    INVALID_lAST_NAME(1014, "Invalid last name", HttpStatus.BAD_REQUEST),
    INVALID_REQUEST_JSON(1015, "Invalid JSON format", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1017, "ROle not existed", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
