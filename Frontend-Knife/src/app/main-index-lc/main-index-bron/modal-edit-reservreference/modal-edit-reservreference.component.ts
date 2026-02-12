import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNgxMask, IConfig } from 'ngx-mask';
import { ReservReference } from 'src/app/classes/reservreference';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ReferenceService } from 'src/app/services/reference.service';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@Component({
  selector: 'app-modal-edit-reservreference',
  templateUrl: './modal-edit-reservreference.component.html',
  styleUrls: ['./modal-edit-reservreference.component.css'],
  providers: [provideNgxMask(maskConfigFunction)]
})
export class ModalEditReservreferenceComponent implements OnInit {
  reservReference: ReservReference = new ReservReference();
  authService!: AuthorizationService;
  numberFormControl = new FormControl('', [
    Validators.min(1),
    Validators.max(15),
 ]);
 primer: boolean = true;

 constructor(private _snackBar: MatSnackBar, private authServ : AuthorizationService, private refService: ReferenceService, private dialogRef: MatDialogRef<ModalEditReservreferenceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  this.authService = authServ;
 }

 ngOnInit(): void {
    if (this.data.reservReference != null){
      this.reservReference = Object.assign({}, this.data.reservReference);
      this.reservReference.date = new Date(this.reservReference.date!);
    }
  }

  onBronClick(): void {
    this.refService.reservReference(this.reservReference, false).subscribe((data) => {
      if (data) {
        this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
        this.dialogRef.close('ok');
      }
      else {

      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  callNumber() {
    if (this.reservReference.phone != null)
      if (this.reservReference.phone.charAt(0) == '+')
        window.open('tel:' + this.reservReference.phone);
      else window.open('tel:+' + this.reservReference.phone);
  }

  getDuration(duration: number): string {
    if (Math.floor(duration/60) == 0)
      return duration%60 + " мин"
    else if (duration%60 == 0)
      return Math.floor(duration/60) + " ч"
    else return Math.floor(duration/60) + " ч." + ' ' + duration%60 + " мин"
  }
}
