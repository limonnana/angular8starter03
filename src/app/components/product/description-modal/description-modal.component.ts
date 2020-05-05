import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

interface DialogDescriptionData {
  description: string;
}

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.scss']
})
export class DescriptionModalComponent {

  description: string;

  constructor(
    public dialogRef: MatDialogRef<DescriptionModalComponent>,
   
    @Inject(MAT_DIALOG_DATA) public data: DialogDescriptionData
    ) {
       this.description = data.description;
     }

 

  closeMe(): void {
    this.dialogRef.close();
  }

}
