package com.devteria.identityservice.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.devteria.identityservice.entity.DoctorProfile;
import com.devteria.identityservice.repository.DoctorProfileRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devteria.identityservice.constant.PredefinedRole;
import com.devteria.identityservice.dto.request.RoleRequest;
import com.devteria.identityservice.dto.request.UserCreationRequest;
import com.devteria.identityservice.dto.request.UserUpdateRequest;
import com.devteria.identityservice.dto.response.UserResponse;
import com.devteria.identityservice.entity.Role;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.UserMapper;
import com.devteria.identityservice.repository.RoleRepository;
import com.devteria.identityservice.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    DoctorProfileRepository doctorProfileRepository;

//    public UserResponse createUser(UserCreationRequest request) {
//        //        User user = userMapper.toUser(request);
//        //        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        //
//        //        HashSet<Role> roles = new HashSet<>();
//        //        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
//        //
//        //        user.setRoles(roles);
//        //
//        //        try {
//        //            user = userRepository.save(user);
//        //        } catch (DataIntegrityViolationException exception) {
//        //            throw new AppException(ErrorCode.USER_EXISTED);
//        //        }
//        //
//        //        return userMapper.toUserResponse(user);
//        User user = userMapper.toUser(request);
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//
//        Set<Role> roles = new HashSet<>();
//
//        // Kiểm tra và xử lý roles từ request
//        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
//            boolean foundUserRole = false;
//
//            for (String roleName : request.getRoles()) {
//                // Nếu tìm thấy bất kỳ role nào khác USER_ROLE, lấy role đó và dừng vòng lặp
//                if (!PredefinedRole.USER_ROLE.equals(roleName)) {
//                    roleRepository.findById(roleName).ifPresent(roles::add);
//                    foundUserRole = true;
//                    break;
//                }
//            }
//
//            // Nếu không tìm thấy role nào khác USER_ROLE, thêm role USER_ROLE vào
//            if (!foundUserRole) {
//                roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
//            }
//        } else {
//            // Nếu không có roles nào được gửi lên, mặc định lấy role USER_ROLE
//            roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
//        }
//
//        user.setRoles(roles);
//
//        try {
//            user = userRepository.save(user);
//        } catch (DataIntegrityViolationException exception) {
//            throw new AppException(ErrorCode.USER_EXISTED);
//        }
//
//        return userMapper.toUserResponse(user);
//    }

    public UserResponse createUser(UserCreationRequest request) {
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Set<Role> roles = new HashSet<>();

        // Kiểm tra và xử lý roles từ request
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            for (String roleName : request.getRoles()) {
                roleRepository.findById(roleName).ifPresent(roles::add);
            }
        } else {
            roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        }

        user.setRoles(roles);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(user);
    }


    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        log.info("check name" + name);
        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.name")
    @Transactional
    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        //        User user = userRepository.findById(userId).orElseThrow(() -> new
        // AppException(ErrorCode.USER_NOT_EXISTED));
        //
        //        //        userMapper.updateUser(user, request);
        //        //        user.setPassword(passwordEncoder.encode(request.getPassword()));
        //
        //        var roles = roleRepository.findAllById(request.getRoles());
        //        user.setRoles(new HashSet<>(roles));
        //
        //        return userMapper.toUserResponse(userRepository.save(user));

        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Ánh xạ thông tin từ UserUpdateRequest vào User
        userMapper.updateUser(user, request);

        // Xử lý cập nhật vai trò
        List<String> roleNames =
                request.getRoles().stream().map(RoleRequest::getName).collect(Collectors.toList());

        List<Role> roles = roleRepository.findAllByNameIn(roleNames);
        user.setRoles(new HashSet<>(roles));

        // Lưu cập nhật vào cơ sở dữ liệu
        user = userRepository.save(user);

        // Chuyển đổi User thành UserResponse và trả về
        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userRepository.deleteById(userId);

        DoctorProfile doctorProfile = doctorProfileRepository.findByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        doctorProfileRepository.delete(doctorProfile);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        log.info("In method get Users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse getUser(String id) {
        return userMapper.toUserResponse(
                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    public List<UserResponse> searchUsers(String searchTerm) {
        return userRepository.searchByUsernameOrEmail(searchTerm).stream()
                .map(userMapper::toUserResponse)
                .toList();
    }
}
