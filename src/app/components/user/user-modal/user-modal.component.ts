import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

interface DialogData {
  id: string;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  form: FormGroup;
  id:string;

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      this.id = data.id;
    }

  ngOnInit() {
      this.form = this.fb.group({
          id: [this.id, []]
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
   // console.log(" en la ventana id: " + this.form.value.id);
    this.dialogRef.close(this.form.value);
}


  

}
