package com.devteria.identityservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devteria.identityservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // boolean existsByUsername(String username);

    boolean existsByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);

    //    @Query("SELECT u FROM User u WHERE u.username = :username OR u.email = :email")
    //    Optional<User> findByUsernameOrEmail(@Param("username") String username, @Param("email") String email);

    // @Query("SELECT u FROM User u WHERE u.username = '%username%' OR u.email =
    // '%email%'")
    // Optional<User> findByUsernameOrEmailUnsafe(@Param("username") String
    // username, @Param("email") String email);

    Optional<User> findByUsername(String username);

    // Thêm phương thức tìm kiếm
    @Query("SELECT u FROM User u WHERE u.username LIKE %:searchTerm% OR u.email LIKE %:searchTerm%")
    List<User> searchByUsernameOrEmail(@Param("searchTerm") String searchTerm);
}
