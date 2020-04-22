import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import { MatDialog} from "@angular/material";
import { UserModalComponent } from 'src/app/components/user/user-modal/user-modal.component';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

 
 private dataSource = new MatTableDataSource<User>([]);

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ){}


    ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data;
    });
  }


  refresh() {
  this.userService.getUsers().subscribe((data: User[]) => {
    this.dataSource.data = data;
  });
  }


  openDialog(id): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '300px',
      data: {
        id:id
      }
    });
  
  dialogRef.afterClosed().subscribe(
    data => {
      if(data){
        this.yesDelete(data.id);
      }
      }
  );   
  }

  onEditClick(id){
    console.log('edit id: ' + id);
    this.router.navigate(['editUser/' + id]);
  }


  get columns(): string[] {
    // return a string array of the columns in the table
    // the order of these values will be the order your columns show up in
    return ['name', 'email', 'phone', 'edit', 'delete'];
  }

  

  yesDelete(id){
    this.userService.delete(id).subscribe(data => {
      console.log('Data: ' + data.message);
      if(data.message === 200){
        this.deleteFromTable(id);             
      }
    });
  }

  

  deleteFromTable(id: string){
    this.dataSource.data.splice(+id,1);
    this.refresh();
  }
}
