import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cours } from 'src/app/modules/cours';
import { ServiceCoursService } from 'src/app/services/service-cours.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  coursList: Cours[] = [];

  constructor(private coursService: ServiceCoursService,private router: Router) {}

  ngOnInit(): void {
    this.fetchCours();
  }
  fetchCours(): void {
    this.coursService.getAllCours().subscribe({
      next: (response) => {
        this.coursList = response;
      },
      error: (error) => {
        console.error('Error fetching cours', error);
      }
    });
  }
  navigateToAddCourse(): void {
    this.router.navigate(['/addcours']);
  }
  editCourse(cours: any): void {
    this.coursService.setSelectedCourse(cours); // Transmettez le cours sélectionné au service
    this.router.navigate(['/update-cours']); // Redirigez vers le composant de mise à jour
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursService.deleteCours(id).subscribe({
        next: () => {
          
          this.coursList = this.coursList.filter(cours => cours.id !== id);
          this.fetchCours();
          this.showSuccessAlertAndRedirect();
        },
        error: (error) => {
          console.error('Error deleting cours', error);
        }
      });
    }
  }
  showSuccessAlertAndRedirect(): void {
    alert('Course updated successfully!');
    this.router.navigate(['/list']); // Redirigez vers la liste des cours
  }
}