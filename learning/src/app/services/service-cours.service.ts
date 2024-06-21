import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cours } from '../modules/cours';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceCoursService {
  private apiUrl = 'http://localhost:8088/SpringMVC/api';
  private selectedCourse: any;
  constructor(private http:HttpClient) { }

  addCours(titre: string, prix: number, file: File): Observable<Cours> {
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('prix', prix.toString());
    formData.append('file', file);

    return this.http.post<Cours>(`${this.apiUrl}/addCours`, formData);
  }
  updateCours(id: number, titre: string, prix: number, file: File | null): Observable<Cours> {
    const formData: FormData = new FormData();
    formData.append('titre', titre);
    formData.append('prix', prix.toString());
    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http.put<Cours>(`${this.apiUrl}/updateCours/${id}`, formData);
  }

  setSelectedCourse(cours: any): void {
    this.selectedCourse = cours;
  }

  getSelectedCourse(): any {
    return this.selectedCourse;
  }
  updateCoursWithoutFile(id: number, titre: string, prix: number): Observable<Cours> {
    const body = { id, titre, prix }; // Corps de la requête sans le champ de fichier
    return this.http.put<Cours>(`${this.apiUrl}/updateCours/${id}`, body);
  }
  getAllCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/allCours`).pipe(
      map(coursList => coursList.map(cours => {
        cours.displayPicture = `${this.apiUrl}/displayPicture/${cours.id}`;
        return cours;
      }))
    );
  }

  deleteCours(courseId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8088/SpringMVC/api/deleteCours/${courseId}`);
  }

}
