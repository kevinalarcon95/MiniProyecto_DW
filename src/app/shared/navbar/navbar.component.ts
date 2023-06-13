import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  emailUser: string;
  status: boolean = false;
  receivedName: string = '';

  constructor(private afAuth: AngularFireAuth, private Router: Router, private auth: AuthService, private token: TokenService){}

  ngOnInit(): void {
    this.emailUser = this.token.getEmail();
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified){
        this.clickEvent();
      }
    })
  }

  logout(){
    this.token.clearToken();
    this.auth.logout().then(() => this.Router.navigate(['/login']));
  }

  clickEvent() {
    this.status = !this.status;
    document.dispatchEvent(new CustomEvent('statusChange', { detail: this.status }));
  }

  @HostListener('document:nameSelected', ['$event.detail'])
  onStatusChange(option: string) {
    this.receivedName = option;
  }
} 
