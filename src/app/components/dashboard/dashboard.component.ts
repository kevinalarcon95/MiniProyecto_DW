import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  status: boolean = false;

  constructor(private afAuth: AngularFireAuth, private Router: Router){

  }

  ngOnInit(): void {}

  clickEvent(){
      this.status = !this.status;
  }

  logout(){
    this.afAuth.signOut().then(() => this.Router.navigate(['/login']));
  }
}
