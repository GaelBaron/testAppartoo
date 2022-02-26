import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {

  user = new  UserModel();
  loggedIn = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
  {
    var myJson = {
      "username":this.user.username,
      "password":this.user.password,
      "role":this.user.role,
    };
    this.http.post<any>('http://localhost:8080/api/login', myJson).subscribe(body => {
      if (body.token) {
        this.loggedIn = true;
        this.router.navigate(['/address', { username:this.user.username,
          password:this.user.password, role:this.user.role, loggedIn:this.loggedIn} ]);
      }
    })
  }

  onRegister()
  {
    var myJson = {
      "username":this.user.username,
      "password":this.user.password,
      "role":this.user.role,
    };
    this.http.post<any>('http://localhost:8080/api/register', myJson).subscribe(body => {
      if (body.token) {
        this.loggedIn = true;
        this.router.navigate(['/address', { username:this.user.username,
          password:this.user.password, role:this.user.role, loggedIn:this.loggedIn} ]);
      }
    })
  }

}
