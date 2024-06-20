import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cours } from 'src/app/modules/cours';
import { ServiceCoursService } from 'src/app/services/service-cours.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  postFormm!: FormGroup;
  courses: Cours[] = [];
  selectedCourse: Cours | null = null; // Add this property

  constructor(private formBuilder: FormBuilder, private serviceCours: ServiceCoursService) { }

  ngOnInit(): void {
    this.postFormm = this.formBuilder.group({
      id: [null],
      titre: [""],
      image: [""],
      prix: [0]
    });

    this.loadCourses();
  }

  loadCourses(): void {
    this.serviceCours.getAllCours().subscribe(data => {
      console.log('Fetched courses:', data); // Add logging
      this.courses = data;
    }, error => {
      console.error('Error loading courses:', error);
    });
  }

  onSubmit(): void {
    const cours = this.postFormm.value;
    if (this.selectedCourse) {
      // Update course
      this.serviceCours.updateCours(cours).subscribe(response => {
        console.log('Course updated:', response);
        this.loadCourses(); // Refresh the list of courses
        this.clearForm(); // Clear the form after updating
      }, error => {
        console.error('Error updating course:', error);
      });
    } else {
      // Add new course
      this.serviceCours.addCours(cours).subscribe(response => {
        console.log('Course added:', response);
        this.loadCourses(); // Refresh the list of courses
        this.clearForm(); // Clear the form after adding
      }, error => {
        console.error('Error adding course:', error);
      });
    }
  }

  onUpdate(cours: Cours): void {
    this.postFormm.patchValue(cours);
    this.selectedCourse = cours;
  }

  onDelete(courseId: number): void {
    this.serviceCours.deleteCours(courseId).subscribe(response => {
      console.log('Course deleted:', response);
      this.loadCourses(); // Refresh the list of courses
    }, error => {
      console.error('Error deleting course:', error);
    });
  }

  clearForm(): void {
    this.postFormm.reset();
    this.selectedCourse = null;
  }
}