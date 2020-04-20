import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList: User[];

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  onEditClick(id){
    console.log('edit id: ' + id);
    this.router.navigate(['editUser/' + id]);
  }

  onDeleteClick(id){
    console.log('delete id: ' + id);
  }

  get columns(): string[] {
    // return a string array of the columns in the table
    // the order of these values will be the order your columns show up in
    return ['name', 'email', 'phone', 'edit', 'delete'];
  }

}
