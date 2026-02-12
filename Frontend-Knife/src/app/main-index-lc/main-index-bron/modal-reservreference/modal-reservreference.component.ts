import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservReference } from 'src/app/classes/reservreference';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { IConfig, provideNgxMask } from 'ngx-mask';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@Component({
  selector: 'app-modal-reservreference',
  templateUrl: './modal-reservreference.component.html',
  styleUrls: ['./modal-reservreference.component.css'],
  providers: [provideNgxMask(maskConfigFunction)]
})
export class ModalReservreferenceComponent implements OnInit {
  email = new FormControl('', [Validators.email]);
  fio = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  phoneNumber = new FormControl('', [Validators.pattern('^([7]|[8])[- ]?[(]?[0-9]{3}[)]?[- ]?[0-9]{3}[- ]?([0-9]{4}|[0-9]{2}[- ]?[0-9]{2})$')]);

  errorMessageEmail = 'Введите E-mail';
  errorMessageFio = 'Введите фамилию';
  errorMessagePhoneNumber = 'Введите номер телефона';  

  reservReference: ReservReference = new ReservReference();
  authService!: AuthorizationService;
  status: boolean = false;
  numberFormControl = new FormControl('', [
    Validators.min(1),
    Validators.max(15),
 ]);

  constructor(private _snackBar: MatSnackBar, private authServ: AuthorizationService, private refService: ReferenceService, private dialogRef: MatDialogRef<ModalReservreferenceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { this.authService = authServ; }

  ngOnInit(): void {
    if (this.data.reservReference != null){
      this.reservReference = Object.assign({}, this.data.reservReference);
      if (this.data.reservReference.status == true) this.status = this.data.reservReference.status
    }
  }

  onNoClick(): void {
    if(confirm("Вы действительно хотите отменить заявку?")) {
      if (this.data.color == 'orange' || this.data.color == 'green' || this.data.color == 'red') {
        this.reservReference.status = false;
        this.reservReference.closedbron = false;
        this.reservReference.dateConfirmCancel = new Date();
        this.reservReference.date = new Date(this.reservReference.date!);
      } else if (this.data.color == 'cyan') {
        this.reservReference.closedbron = false;
        this.reservReference.status = false;
        this.reservReference.date = new Date(this.reservReference.date!);
      }
      this.refService.reservReference(this.reservReference, false).subscribe(() => {
        this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
        this.dialogRef.close('ok');
      });
    }
  }
  
  onBronClick(): void {
    if (this.data.color == 'orange') {
      if (this.status) {
        if (this.status != this.reservReference.status) {
          
          this.reservReference.status = true;
          this.reservReference.dateConfirmCancel = new Date(); 
        }
      } else {
        if (this.status != this.reservReference.status) {
          this.reservReference.status = null;
          this.reservReference.dateConfirmCancel = null;
        }
      }
      this.reservReference.date = new Date(this.reservReference.date!);
    } else if (this.data.color == 'gray') {
      this.updateErrorMessage();
      this.reservReference.date = this.data.date;
      this.reservReference.time = this.data.time;
      this.reservReference.reference = this.data.reference;
      this.reservReference.dateBron = new Date();
      this.reservReference.closedbron = false;
      if (this.status) {
        this.reservReference.status = true;
        this.reservReference.dateConfirmCancel = new Date(); 
      } else this.reservReference.status = null;
    } else if (this.data.color == 'green') {
      if (!this.status) this.reservReference.status = null;
      this.reservReference.date = new Date(this.reservReference.date!);
    } else if (this.data.color == 'red') {
      this.reservReference.date = new Date(this.reservReference.date!);
    }

    if (this.data.color == 'gray') {
      if (this.email.valid && this.phoneNumber.valid && this.fio.valid) {
        this.refService.reservReference(this.reservReference, false).subscribe((data) => {
          if (data) {
            this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
            this.dialogRef.close('ok');
          }
        });
      }
    }
    else {
      this.refService.reservReference(this.reservReference, false).subscribe((data) => {
        if (data) {
          this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
          this.dialogRef.close('ok');
        }
      });
    }
  }

  onBronAutoClick(): void {
    if (this.data.color == 'gray') {
      this.reservReference.fioClient = '';
      this.reservReference.phone = '';
      this.reservReference.email = '';
      this.reservReference.count_person = 0;
      this.reservReference.date = this.data.date;
      this.reservReference.time = this.data.time;
      this.reservReference.reference = this.data.reference;
      this.reservReference.dateBron = new Date();
      this.reservReference.closedbron = true;
      this.reservReference.status = null;
    } else if (this.data.color == 'blue') {
      this.updateErrorMessage();
      this.reservReference.date = this.data.date;
      this.reservReference.time = this.data.time;
      this.reservReference.reference = this.data.reference;
      this.reservReference.dateBron = new Date();
      this.reservReference.dateConfirmCancel = new Date();
      this.reservReference.status = true;
      this.reservReference.closedbron = true;
    }
    
    if (this.data.color == 'blue') {
      if (this.email.valid && this.phoneNumber.valid && this.fio.valid) {
        this.refService.reservReference(this.reservReference, false).subscribe((data) => {
          if (data) {
            this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
            this.dialogRef.close('ok');
          }
        });
      }
    }
    else {
      this.refService.reservReference(this.reservReference, false).subscribe((data) => {
        if (data) {
          this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
          this.dialogRef.close('ok');
        }
      });
    }
  }

  visibleCheckBox(): boolean {
    if (this.data.color == 'green' || this.data.color == 'gray' || this.data.color == 'orange')
      return true;
    else return false;
  }

  visibleButtonOtmena(): boolean {
    if (this.data.color == 'orange' || this.data.color == 'green' || this.data.color == 'cyan' || this.data.color == 'red')
    return true;
  else return false;
  }

  visibleButtonBron(): boolean {
    if (this.data.color == 'green' || this.data.color == 'gray' || this.data.color == 'orange' || this.data.color == 'red')
      return true;
    else return false;
  }

  visibleButtonClosedBron(): boolean {
    if (this.data.color == 'gray' || this.data.color == 'blue')
      return true;
    else return false;
  }

  onChange(e : any) {
    this.status = e.checked;
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

  updateErrorMessage() {
    if (this.email.hasError('email')) {
      this.errorMessageEmail = 'Введите корректное значение';
    } else {
      this.errorMessageEmail = '';
    }

    if (this.fio.hasError('required')) {
      this.errorMessageFio = 'Введите фамилию';
    } else {
      this.errorMessageFio = '';
    }

    if (this.phoneNumber.hasError('pattern')) {
      this.errorMessagePhoneNumber = 'Неправильный номер';
    } else {
      this.errorMessagePhoneNumber = '';
    }
  }
}
