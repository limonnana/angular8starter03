import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

interface DialogData {
  id: string;
  type: string;
}

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {

  id:string;
  typeToDelete:string;
  form: FormGroup;


  constructor 
  (
  public dialogRef: MatDialogRef<GenericModalComponent>,
  private fb: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    this.id = data.id;
    this.typeToDelete = data.type;
  }

  ngOnInit(): void {
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
