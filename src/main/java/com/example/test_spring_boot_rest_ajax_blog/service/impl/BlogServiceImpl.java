package com.example.test_spring_boot_rest_ajax_blog.service.impl;

import com.example.test_spring_boot_rest_ajax_blog.model.Blog;
import com.example.test_spring_boot_rest_ajax_blog.repository.BlogRepository;
import com.example.test_spring_boot_rest_ajax_blog.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private BlogRepository blogRepository;

    @Override
    public Iterable<Blog> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public Optional<Blog> findById(Long id) {
        return blogRepository.findById(id);
    }

    @Override
    public void save(Blog blog) {
        blogRepository.save(blog);
    }

    @Override
    public void remove(Long id) {
        blogRepository.deleteById(id);
    }

    @Override
    public Iterable<Blog> findAllStatusPublic() {
        return blogRepository.findAllStatusPublic();
    }
}
