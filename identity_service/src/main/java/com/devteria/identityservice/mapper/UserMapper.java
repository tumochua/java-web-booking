package com.devteria.identityservice.mapper;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import com.devteria.identityservice.dto.request.UserCreationRequest;
import com.devteria.identityservice.dto.request.UserUpdateRequest;
import com.devteria.identityservice.dto.response.UserResponse;
import com.devteria.identityservice.entity.Role;
import com.devteria.identityservice.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "firstname", target = "firstname")
    @Mapping(source = "lastname", target = "lastname")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "username", target = "username")
    @Mapping(source = "password", target = "password")
    @Mapping(source = "address", target = "address")
    @Mapping(source = "dob", target = "dob")
    @Mapping(source = "phonenumber", target = "phonenumber")
    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRoles")
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    default Set<String> roleNameSet(Set<Role> roles) {
        return roles != null ? roles.stream().map(Role::getName).collect(Collectors.toSet()) : Collections.emptySet();
    }

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);

    @Named("mapRoles")
    default Set<Role> mapRoles(Set<String> roleNames) {
        return roleNames.stream()
                .map(roleName -> {
                    Role role = new Role();
                    role.setName(roleName);
                    return role;
                })
                .collect(Collectors.toSet());
    }
}
