package com.example.test_spring_boot_rest_ajax_blog.controller;

import com.example.test_spring_boot_rest_ajax_blog.model.Blog;
import com.example.test_spring_boot_rest_ajax_blog.model.City;
import com.example.test_spring_boot_rest_ajax_blog.model.Nation;
import com.example.test_spring_boot_rest_ajax_blog.model.Status;
import com.example.test_spring_boot_rest_ajax_blog.service.CityService;
import com.example.test_spring_boot_rest_ajax_blog.service.NationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cities")
public class CityRestController {
    @Autowired
    private CityService cityService;
    @Autowired
    private NationService nationService;

    @GetMapping("")
    public ResponseEntity<Iterable<City>> findAllCity() {
        Iterable<City> cities = cityService.findAll();
        return new ResponseEntity<>(cities, HttpStatus.OK);
    }

    @GetMapping("/nation")
    public ResponseEntity<Iterable<Nation>> findAllNation() {
        Iterable<Nation> nations = nationService.findAll();
        return new ResponseEntity<>(nations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> findCityById(@PathVariable Long id) {
        Optional<City> cityOptional = cityService.findById(id);
        if (!cityOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cityOptional.get(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> updateCity(@PathVariable Long id, @RequestBody City city) {
        Optional<City> cityOptional = cityService.findById(id);
        city.setId(cityOptional.get().getId());
        cityService.save(city);
        return new ResponseEntity<>(cityOptional.get(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<City> saveCity(@RequestBody City city) {
        cityService.save(city);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Long id) {
        Optional<City> cityOptional = cityService.findById(id);
        if (!cityOptional.isPresent()) {
            return new ResponseEntity<>(cityOptional.get(), HttpStatus.NOT_FOUND);
        }
        cityService.remove(id);
        return new ResponseEntity<>(cityOptional.get(), HttpStatus.NO_CONTENT);
    }


}
