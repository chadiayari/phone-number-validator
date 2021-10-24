import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-contact-opened',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class DialogOverviewExampleDialog {
  faLinkedin = faLinkedin;
  faWhatsapp = faWhatsapp;
  faEnvelope = faEnvelope;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  //close button action
  onNoClick(): void {
    this.dialogRef.close();
  }

}
