import { Component, OnInit } from '@angular/core';
import { ServiceCoursService } from 'src/app/services/service-cours.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private coursService: ServiceCoursService) { }
  listCours: any[] = [];

  ngOnInit(): void {

    this.getAllCours();
  }

  getAllCours(){
    return this.coursService.getAllCours().subscribe(res=>{
      this.listCours = res;
    });
  }
}
