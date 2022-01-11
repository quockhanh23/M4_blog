package com.example.test_spring_boot_rest_ajax_blog.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    @Column(length = 100000)
    private String content;
    private LocalDateTime time;
    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    public Blog(Long id, String title, String content, LocalDateTime time, Status status) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.time = time;
        this.status = status;
    }

    public Blog() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
