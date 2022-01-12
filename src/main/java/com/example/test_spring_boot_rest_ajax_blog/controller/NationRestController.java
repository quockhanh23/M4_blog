package com.example.test_spring_boot_rest_ajax_blog.controller;

import com.example.test_spring_boot_rest_ajax_blog.model.City;
import com.example.test_spring_boot_rest_ajax_blog.model.Nation;
import com.example.test_spring_boot_rest_ajax_blog.service.NationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/nations")
public class NationRestController {
    @Autowired
    private NationService nationService;

    @GetMapping("/{id}")
    public ResponseEntity<Nation> findNationById(@PathVariable Long id) {
        Optional<Nation> nationOptional = nationService.findById(id);
        if (!nationOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(nationOptional.get(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Nation> saveCity(@RequestBody Nation nation) {
        nationService.save(nation);
        return new ResponseEntity<>(nation, HttpStatus.OK);
    }

}
