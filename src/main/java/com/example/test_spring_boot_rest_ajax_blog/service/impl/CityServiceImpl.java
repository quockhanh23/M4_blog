package com.example.test_spring_boot_rest_ajax_blog.service.impl;

import com.example.test_spring_boot_rest_ajax_blog.model.City;
import com.example.test_spring_boot_rest_ajax_blog.repository.CityRepository;
import com.example.test_spring_boot_rest_ajax_blog.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepository cityRepository;

    @Override
    public Iterable<City> findAll() {
        return cityRepository.findAll();
    }

    @Override
    public Optional<City> findById(Long id) {
        return cityRepository.findById(id);
    }

    @Override
    public void save(City city) {
        cityRepository.save(city);
    }

    @Override
    public void remove(Long id) {
        cityRepository.deleteById(id);
    }
}
