package com.example.elearning.service;


import com.example.elearning.entity.Cours;
import com.example.elearning.repository.CoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class CoursService {


    @Autowired
    private CoursRepository coursRepository;





    public List<Cours> getCours(){
    return coursRepository.findAll();
    }

    public String updateCours(Cours cours) {
        Cours cours1=coursRepository.findById(cours.getId()).get();
        cours1.setTitre(cours.getTitre());
        cours1.setPrix(cours.getPrix());

        coursRepository.save(cours1);
        return "Course Updated Successfully";
    }

    public Optional<Cours> getPostById(Long id) {
        return coursRepository.findById(id);
    }


    public Optional<Cours> getCoursById(Long id) {
        return coursRepository.findById(id);
    }

    public String deleteCours(Long id) {
        coursRepository.deleteById(id);
        return "Course Deleted Successfully";
    }




}
