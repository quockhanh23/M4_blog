package com.example.test_spring_boot_rest_ajax_blog.repository;

import com.example.test_spring_boot_rest_ajax_blog.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Modifying
    @Query(value = "select * from blog where status_id like 1", nativeQuery = true)
    Iterable<Blog> findAllStatusPublic();
}
