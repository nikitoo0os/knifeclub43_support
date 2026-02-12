import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservRestroom } from 'src/app/classes/reservrestroom';
import { RestroomService } from 'src/app/services/restroom.service';

@Component({
  selector: 'app-modal-reservrestroom',
  templateUrl: './modal-reservrestroom.component.html',
  styleUrls: ['./modal-reservrestroom.component.css']
})
export class ModalReservrestroomComponent {
  reservRestroom: ReservRestroom = new ReservRestroom();
  timeFormControl = new FormControl('', [ Validators.required ]);
  errorMessageTime = '';

  constructor(private _snackBar: MatSnackBar, private restServ: RestroomService, private dialogRef: MatDialogRef<ModalReservrestroomComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data.reservrestroom != null) {
      this.reservRestroom = Object.assign({}, this.data.reservrestroom);
      this.reservRestroom.date = new Date(this.reservRestroom.date!);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onBronClick(): void {
    if (this.timeFormControl.valid) {
      if (this.data.restroom != null) {
        this.reservRestroom.date = this.data.date;
        this.reservRestroom.restroom = this.data.restroom;
      }
      this.restServ.reservRestroom(this.reservRestroom).subscribe(() => {
        if (this.data.reservrestroom != null) { this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 }) }
        else this._snackBar.open("Добавление данных прошло успешно", "Закрыть", { duration: 2000 })
        this.dialogRef.close('ok');
      });
    } else this.errorMessageTime = 'Заполните время';
  }
}
