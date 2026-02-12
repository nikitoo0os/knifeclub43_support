import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNgxMask, IConfig } from 'ngx-mask';
import { ReservBlock } from 'src/app/classes/reservblock';
import { ReferenceService } from 'src/app/services/reference.service';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@Component({
  selector: 'app-modal-closeclub',
  templateUrl: './modal-closeclub.component.html',
  styleUrls: ['./modal-closeclub.component.css'],
  providers: [provideNgxMask(maskConfigFunction)]
})
export class ModalCloseclubComponent {
  reservblock: ReservBlock = new ReservBlock();
  timeFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([01]?[0-9]|2[0-3])(:?[0-5][0-9])$')]);
  timeFormControl2 = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([01]?[0-9]|2[0-3])(:?[0-5][0-9])$')]);
  errorMessageTime = '';
  errorMessageTimeEquals = '';

  constructor(private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<ModalCloseclubComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private refService: ReferenceService) {}

  ngOnInit(): void {
    if (this.data.reservblock != null) {
      this.reservblock = Object.assign({}, this.data.reservblock);
      //console.log(this.reservblock);
      //this.reservblock.date = new Date(this.reservblock.date!);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onBronClick(): void {
    if (this.data.date != null)
      this.reservblock.date = this.data.date;
    if (!this.reservblock.timeStartBlock?.includes(':'))
      this.reservblock.timeStartBlock = this.reservblock.timeStartBlock?.slice(0, 2) + ':' + this.reservblock.timeStartBlock?.slice(2);
    if (!this.reservblock.timeEndBlock?.includes(':'))
      this.reservblock.timeEndBlock = this.reservblock.timeEndBlock?.slice(0, 2) + ':' + this.reservblock.timeEndBlock?.slice(2);
    //console.log(this.reservblock);
    
    if (this.parseTime(this.reservblock.timeStartBlock) < this.parseTime(this.reservblock.timeEndBlock)) {
      this.errorMessageTimeEquals = '';
      if (this.timeFormControl.valid && this.timeFormControl2.valid) {
        if (this.data.reservblock != null) {
          this.reservblock.date = this.data.date;
        }
        this.refService.saveReservBlock(this.reservblock).subscribe(() => {
          if (this.data.reservblock != null) { this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 }) }
          else this._snackBar.open("Добавление данных прошло успешно", "Закрыть", { duration: 2000 })
          this.dialogRef.close('ok');
        });
      } else this.errorMessageTime = 'Заполните время';
    }
    else {
      this.errorMessageTime = 'Заполните время';
      if (this.timeFormControl.valid && this.timeFormControl2.valid) {
        this._snackBar.open("Время начала не может быть больше времени окончания!", "Закрыть", { duration: 2000 })
      }
    }
  }

  parseTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Устанавливаем часы и минуты
    return date;
  }
}
