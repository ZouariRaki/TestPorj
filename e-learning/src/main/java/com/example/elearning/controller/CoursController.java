package com.example.elearning.controller;


import com.example.elearning.entity.Cours;
import com.example.elearning.repository.CoursRepository;
import com.example.elearning.service.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class CoursController {

    @Autowired
    private CoursService coursService;
@Autowired
private CoursRepository coursRepository;

    @PostMapping("/addCours")
    public ResponseEntity<Cours> createNewUser(@RequestParam String titre,@RequestParam Float prix, @RequestPart("file")MultipartFile file) throws IOException {
        Cours cours=Cours.builder().titre(titre).prix(prix).displayPicture(file.getBytes()).build();
        coursRepository.save(cours);
        cours.setDisplayPicture(null);
        return  ResponseEntity.ok(cours);
    }


    @GetMapping("/allCours")
    public List<Cours> getAllCours(){
        return coursService.getCours();
    }

    @PutMapping("/updateCours/{id}")
    public ResponseEntity<Cours> updateCours(@PathVariable Long id, @RequestParam String titre, @RequestParam Float prix, @RequestPart("file") MultipartFile file) throws IOException {
        Cours existingCours = coursRepository.findById(id).orElseThrow(() -> new RuntimeException("Cours not found"));
        existingCours.setTitre(titre);
        existingCours.setPrix(prix);
        if (file != null && !file.isEmpty()) {
            existingCours.setDisplayPicture(file.getBytes());
        }
        coursRepository.save(existingCours);
        existingCours.setDisplayPicture(null);
        return ResponseEntity.ok(existingCours);
    }
    @GetMapping("/displayPicture/{id}")
    public ResponseEntity<ByteArrayResource> getDisplayPicture(@PathVariable Long id) {
        Cours cours = coursService.getCoursById(id).orElseThrow(() -> new RuntimeException("Cours not found"));
        ByteArrayResource resource = new ByteArrayResource(cours.getDisplayPicture());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"image.jpg\"")
                .body(resource);
    }


    @DeleteMapping("/deleteCours/{id}")
    public String deleteCours(@PathVariable (value = "id") Long id){
        return coursService.deleteCours(id);
    }

}
