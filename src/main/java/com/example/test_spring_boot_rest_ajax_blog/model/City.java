package com.example.test_spring_boot_rest_ajax_blog.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private long population;
    private long acreage;
    private int GDP;
    private String description;
    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;
}
