package com.example.test_spring_boot_rest_ajax_blog.controller;

import com.example.test_spring_boot_rest_ajax_blog.model.Blog;
import com.example.test_spring_boot_rest_ajax_blog.model.Status;
import com.example.test_spring_boot_rest_ajax_blog.service.BlogServiceImpl;
import com.example.test_spring_boot_rest_ajax_blog.service.StatusServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/blogs")
public class BlogRestController {
    @Autowired
    private BlogServiceImpl blogService;
    @Autowired
    private StatusServiceImpl statusService;

    @GetMapping("/statuses")
    public ResponseEntity<Iterable<Status>> findAllStatus() {
        Iterable<Status> statuses = statusService.findAll();
        return new ResponseEntity<>(statuses, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<Iterable<Blog>> findAllBlog() {
        Iterable<Blog> blogs = blogService.findAll();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @GetMapping("/search1")
    public ResponseEntity<Iterable<Blog>> findBlogByStatus1() {
        Iterable<Blog> blogs;
        blogs = blogService.findAllStatusPublic();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Optional<Blog>> findOne(@PathVariable Long id) {
        Optional<Blog> houses = blogService.findById(id);

        return new ResponseEntity<>(houses, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Blog> saveBlog(@RequestBody Blog blog) {
        LocalDateTime time = LocalDateTime.now();
        blog.setTime(time);
        Optional<Status> statusOptional = statusService.findById(1L);
        blog.setStatus(statusOptional.get());
        blogService.save(blog);
        return new ResponseEntity<>(blog, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Blog> deleteHouse(@PathVariable Long id) {
        Optional<Blog> blogOptional = blogService.findById(id);
        if (!blogOptional.isPresent()) {
            return new ResponseEntity<>(blogOptional.get(), HttpStatus.NOT_FOUND);
        }
        blogService.remove(id);
        return new ResponseEntity<>(blogOptional.get(), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> saveBlog(@PathVariable Long id, @RequestBody Blog blog) {
        Optional<Blog> blogOptional = blogService.findById(id);
        blog.setId(blogOptional.get().getId());
        blogService.save(blog);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> findHomeById(@PathVariable Long id) {
        Optional<Blog> blogOptional = blogService.findById(id);
        if (!blogOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(blogOptional.get(), HttpStatus.OK);
    }
}