package com.akshar.rest.persistence;


import com.akshar.rest.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User,Long> {
    @Query("select u from User u where u.email = ?1")
    User findByEmailAddress(String email);
}