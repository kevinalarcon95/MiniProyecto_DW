import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  dataUser: any;
  status: boolean = false;
  receivedName: string = '';

  constructor(private afAuth: AngularFireAuth, private Router: Router, private auth: AuthService){}

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified){
        this.dataUser = user;
        console.log(user);
        this.clickEvent();
      }
      // else{
      //     this.Router.navigate(["/login"]);
      // }
    })
    
  }

  logout(){
    this.auth.logout().then(() => this.Router.navigate(['/login']));
  }

  clickEvent() {
    this.status = !this.status;
    document.dispatchEvent(new CustomEvent('statusChange', { detail: this.status }));
    console.log(this.status);
  }

  @HostListener('document:nameSelected', ['$event.detail'])
  onStatusChange(option: string) {
    this.receivedName = option;
  }
} 
