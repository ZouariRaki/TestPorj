import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../modules/cours';

@Injectable({
  providedIn: 'root'
})
export class ServiceCoursService {

  constructor(private http:HttpClient) { }


  getAllCours(): Observable<Cours[]>{
    return this.http.get<Cours[]>("http://localhost:8088/SpringMVC/api/allCours")
  }

  addCours(cours:Cours):Observable<any>{
    return this.http.post<any>("http://localhost:8088/SpringMVC/api/addCours",cours);
  }


  updateCours(cours: any): Observable<Cours> {
    
    return this.http.put<Cours>("http://localhost:8088/SpringMVC/api/updateCours", cours);
  }

  deleteCours(courseId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8088/SpringMVC/api/deleteCours/${courseId}`);
  }

}
