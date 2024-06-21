import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCoursService } from 'src/app/services/service-cours.service';

@Component({
  selector: 'app-addcours',
  templateUrl: './addcours.component.html',
  styleUrls: ['./addcours.component.css']
})
export class AddcoursComponent {

  titre: string = '';
  prix: number | null = null;
  file: File | null = null;

  constructor(private coursService: ServiceCoursService, private router:Router) {}

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  addCours(): void {
    if (this.titre && this.prix !== null && this.file) {
      this.coursService.addCours(this.titre, this.prix, this.file).subscribe({
        next: (response) => {
          console.log('Cours added successfully', response);
          this.showSuccessAlertAndRedirect();
        },
        error: (error) => {
          console.error('Error adding cours', error);
        }
      });
    }
  }
  showSuccessAlertAndRedirect(): void {
    alert('Course updated successfully!');
    this.router.navigate(['/list']); // Redirigez vers la liste des cours
  }
}