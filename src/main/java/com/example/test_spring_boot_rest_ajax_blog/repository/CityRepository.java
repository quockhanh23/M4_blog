package com.example.test_spring_boot_rest_ajax_blog.repository;

import com.example.test_spring_boot_rest_ajax_blog.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
}
