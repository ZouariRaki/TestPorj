package com.example.elearning.entity;

import jakarta.persistence.*;


import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Cours {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
      private Long id;
      private String titre;
      private Float prix;
    @Lob
    @Column(length = 1000000)
    private byte[] displayPicture;

}
