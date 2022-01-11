package com.example.test_spring_boot_rest_ajax_blog.service;

import com.example.test_spring_boot_rest_ajax_blog.model.Blog;
import com.example.test_spring_boot_rest_ajax_blog.model.Status;
import com.example.test_spring_boot_rest_ajax_blog.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class StatusServiceImpl implements StatusService {
    @Autowired
    private StatusRepository statusRepository;

    @Override
    public Iterable<Status> findAll() {
        return statusRepository.findAll();
    }

    @Override
    public Optional<Status> findById(Long id) {
        return statusRepository.findById(id);
    }

    @Override
    public void save(Status status) {
        statusRepository.save(status);
    }

    @Override
    public void remove(Long id) {
        statusRepository.deleteById(id);
    }

}
