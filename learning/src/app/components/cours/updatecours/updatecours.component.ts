import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'src/app/modules/cours';
import { ServiceCoursService } from 'src/app/services/service-cours.service';

@Component({
  selector: 'app-updatecours',
  templateUrl: './updatecours.component.html',
  styleUrls: ['./updatecours.component.css']
})
export class UpdatecoursComponent implements OnInit {
  selectedCours: Cours = { id: 0, titre: '', prix: 0, displayPicture: null };
  selectedFile: File | null = null;

  constructor(private coursService: ServiceCoursService, private router: Router) { }

  ngOnInit(): void {
    this.selectedCours = this.coursService.getSelectedCourse();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateCours(): void {
    if (this.selectedCours && this.selectedCours.id) {
      if (this.selectedFile) {
        // Si un fichier a été sélectionné, appelez la méthode de mise à jour avec le fichier
        this.coursService.updateCours(this.selectedCours.id, this.selectedCours.titre, this.selectedCours.prix, this.selectedFile).subscribe({
          next: (updatedCours) => {
            console.log('Cours updated:', updatedCours);
            this.showSuccessAlertAndRedirect();
            // Redirigez l'utilisateur ou affichez un message de succès, etc.
          },
          error: (error) => {
            console.error('Error updating cours:', error);
            // Affichez un message d'erreur ou prenez d'autres mesures en cas d'erreur
          }
        });
      } else {
        // Si aucun fichier n'a été sélectionné, appelez la méthode de mise à jour sans le fichier
        this.coursService.updateCoursWithoutFile(this.selectedCours.id, this.selectedCours.titre, this.selectedCours.prix).subscribe({
          next: (updatedCours) => {
            console.log('Cours updated:', updatedCours);
            // Redirigez l'utilisateur ou affichez un message de succès, etc.
          },
          error: (error) => {
            console.error('Error updating cours:', error);
            // Affichez un message d'erreur ou prenez d'autres mesures en cas d'erreur
          }
        });
      }
    } else {
      console.error('Invalid selected course.');
      // Affichez un message ou prenez d'autres mesures si le cours sélectionné est invalide
    }
  }

  showSuccessAlertAndRedirect(): void {
    alert('Course updated successfully!');
    this.router.navigate(['/list']); // Redirigez vers la liste des cours
  }
}