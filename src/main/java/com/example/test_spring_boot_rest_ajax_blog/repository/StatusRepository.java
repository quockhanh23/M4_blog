package com.example.test_spring_boot_rest_ajax_blog.repository;

import com.example.test_spring_boot_rest_ajax_blog.model.Blog;
import com.example.test_spring_boot_rest_ajax_blog.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    List<Blog> findByNameContaining(String name);

}
