package com.example.test_spring_boot_rest_ajax_blog.service;

import com.example.test_spring_boot_rest_ajax_blog.model.Blog;

public interface BlogService extends GeneralService<Blog> {
    Iterable<Blog> findAllStatusPublic();
}
