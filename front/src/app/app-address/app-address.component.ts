import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-address',
  templateUrl: './app-address.component.html',
  styleUrls: ['./app-address.component.css']
})
export class AppAddressComponent implements OnInit {

  user = { username: "", password: "", role: ""};
  isLoggedIn = "";
  friendname = "";
  friendList = [];
  roles = ['Guerrier', 'Alchimiste', 'Sorcier', 'Espion', 'Enchanteur'];
  newRole = "";
  userList = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user.username = params.get('username');
      this.user.password = params.get('password');
      this.isLoggedIn = params.get('loggedIn');
      var myJson = { "username": this.user.username };

      this.http.post<any>('http://localhost:8080/api/friends/get', myJson).subscribe(data => {
        this.friendList = data.friends;
        this.http.post<any>('http://localhost:8080/api/role/get', myJson).subscribe(data => {
          this.user.role = data.role;
          this.http.get<any>('http://localhost:8080/api/user/list').subscribe(data => {
            this.userList = data.users;
          })
        })
      })
    })
  }

  Add()
  {
    var myJson = {
      "username":this.user.username,
      "friendname":this.friendname
    };
    this.http.post<any>('http://localhost:8080/api/friends/add', myJson).subscribe(body => {
      this.friendList = body.friends;
    })
  }

  AddByName(name)
  {
    var myJson = {
      "username":this.user.username,
      "friendname":name
    };
    this.http.post<any>('http://localhost:8080/api/friends/add', myJson).subscribe(body => {
      this.friendList = body.friends;
    })
  }

  Del(friendname)
  {
    var myJson = {
      "username":this.user.username,
      "friendname":friendname
    };
    this.http.post<any>('http://localhost:8080/api/friends/unfriend', myJson).subscribe(body => {
      this.friendList = body.friends;
    })
  }

  isInRoles(newRole)
  {
    for (var i = 0; this.roles[i]; i++) {
      if (newRole == this.roles[i]) {
        return (true);
      }
    }
    return (false);
  }

  ChangeRole()
  {
    if (!this.isInRoles(this.newRole)) {
      return (this.user.role);
    }
    var myJson = {
      "username":this.user.username,
      "role":this.newRole
    };
    this.http.post<any>('http://localhost:8080/api/role/change', myJson).subscribe(body => {
      this.user.role = body.role;
    })

  }

}
