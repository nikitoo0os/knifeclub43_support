import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restroom } from 'src/app/classes/restroom';
import { RestroomService } from 'src/app/services/restroom.service';

@Component({
  selector: 'app-modal-restroom',
  templateUrl: './modal-restroom.component.html',
  styleUrls: ['./modal-restroom.component.css']
})
export class ModalRestroomComponent implements OnInit {
  restroom: Restroom = new Restroom();

  constructor(private _snackBar: MatSnackBar, private restService: RestroomService, private dialogRef: MatDialogRef<ModalRestroomComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data.restroom != null) this.restroom = Object.assign({}, this.data.restroom);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onBronClick(): void {
    this.restService.saveRestroom(this.restroom).subscribe(() => {
      if (this.data.restroom != null) this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
      else this._snackBar.open("Добавление данных прошло успешно", "Закрыть", { duration: 2000 });
      this.dialogRef.close('ok');
    });
  }
}
