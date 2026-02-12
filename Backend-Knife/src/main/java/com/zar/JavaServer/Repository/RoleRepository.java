package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role,Long> {
    List<Role> findAll();
}
