package com.example.test_spring_boot_rest_ajax_blog.model;

import javax.persistence.*;

@Entity
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

    public City(Long id, String name, long population, long acreage, int GDP, String description, Nation nation) {
        this.id = id;
        this.name = name;
        this.population = population;
        this.acreage = acreage;
        this.GDP = GDP;
        this.description = description;
        this.nation = nation;
    }

    public City() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPopulation() {
        return population;
    }

    public void setPopulation(long population) {
        this.population = population;
    }

    public long getAcreage() {
        return acreage;
    }

    public void setAcreage(long acreage) {
        this.acreage = acreage;
    }

    public int getGDP() {
        return GDP;
    }

    public void setGDP(int GDP) {
        this.GDP = GDP;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Nation getNation() {
        return nation;
    }

    public void setNation(Nation nation) {
        this.nation = nation;
    }
}
