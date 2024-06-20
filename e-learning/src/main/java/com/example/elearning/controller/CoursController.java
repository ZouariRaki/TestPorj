package com.example.elearning.controller;


import com.example.elearning.entity.Cours;
import com.example.elearning.service.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CoursController {

    @Autowired
    private CoursService coursService;


    @PostMapping("/addCours")
    public Cours addCours(@RequestBody Cours cours){
        return coursService.addCours(cours);
    }
    @GetMapping("/allCours")
    public List<Cours> getAllCours(){
        return coursService.getCours();
    }
    @PutMapping("/updateCours")
    public String updateCours(@RequestBody Cours cours){
        return coursService.updateCours(cours);
    }


    @DeleteMapping("/deleteCours/{id}")
    public String deleteCours(@PathVariable (value = "id") Long id){
        return coursService.deleteCours(id);
    }

}
