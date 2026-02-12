import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-main-index-rules',
  templateUrl: './main-index-rules.component.html',
  styleUrls: ['./main-index-rules.component.css']
})
export class MainIndexRulesComponent {
  constructor(private dialogRef: MatDialogRef<MainIndexRulesComponent>) {}
  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddClick(): void {
    this.dialogRef.close();
  }    
  
  onKeyPress(event: any) {
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
}
