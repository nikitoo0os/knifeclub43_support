import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reference } from 'src/app/classes/reference';
import { ReferenceService } from 'src/app/services/reference.service';
import { provideNgxMask, IConfig } from 'ngx-mask';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@Component({
  selector: 'app-modal-reference',
  templateUrl: './modal-reference.component.html',
  styleUrls: ['./modal-reference.component.css'],
  providers: [provideNgxMask(maskConfigFunction)]
})
export class ModalReferenceComponent implements OnInit {
  reference: Reference = new Reference();
  time: any;
  errorMessage = 'Заполните поле';

  name = new FormControl('', [Validators.required, Validators.maxLength(150)]);
  duration = new FormControl('', [Validators.required, Validators.maxLength(3)]);
  durationClient = new FormControl('', [Validators.required, Validators.maxLength(3)]);
  reservDuration = new FormControl('', [Validators.required, Validators.maxLength(3)]);
  price = new FormControl('', [Validators.required]);
  timeStartFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([01]?[0-9]|2[0-3])(:?[0-5][0-9])$')]);
  timeEndFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([01]?[0-9]|2[0-3])(:?[0-5][0-9])$')]);
  timeStartHolidayFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([01]?[0-9]|2[0-3])(:?[0-5][0-9])$')]);
  timeEndHolidayFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([01]?[0-9]|2[0-3])(:?[0-5][0-9])$')]);

  constructor(private _snackBar: MatSnackBar, private refService: ReferenceService, private dialogRef: MatDialogRef<ModalReferenceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.reference.status = true;
    if (this.data.reference != null) {
      this.reference = Object.assign({}, this.data.reference);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onBronClick(): void {
    if (!this.reference.timeStart?.includes(':'))
      this.reference.timeStart = this.reference.timeStart?.slice(0, 2) + ':' + this.reference.timeStart?.slice(2);
    if (!this.reference.timeEnd?.includes(':'))
      this.reference.timeEnd = this.reference.timeEnd?.slice(0, 2) + ':' + this.reference.timeEnd?.slice(2);

    if (!this.reference.timeStartHoliday?.includes(':'))
      this.reference.timeStartHoliday = this.reference.timeStartHoliday?.slice(0, 2) + ':' + this.reference.timeStartHoliday?.slice(2);
    if (!this.reference.timeEndHoliday?.includes(':'))
      this.reference.timeEndHoliday = this.reference.timeEndHoliday?.slice(0, 2) + ':' + this.reference.timeEndHoliday?.slice(2);

    if (this.parseTime(this.reference.timeStart) >= this.parseTime(this.reference.timeEnd)) {
      this._snackBar.open("Время начала занятий в будни не может быть больше времени окончания!", "Закрыть", { duration: 2000 });
      return;
    }

    if (this.parseTime(this.reference.timeStartHoliday) >= this.parseTime(this.reference.timeEndHoliday)) {
      this._snackBar.open("Время начала занятий в выходные не может быть больше времени окончания!", "Закрыть", { duration: 2000 });
      return;
    }

    this.updateErrorMessage();
    if (this.name.valid && this.duration.valid && this.durationClient.valid && this.reservDuration.valid && this.price.valid && this.timeStartFormControl.valid && this.timeEndFormControl.valid && this.timeStartHolidayFormControl.valid && this.timeEndHolidayFormControl.valid) {
      this.refService.saveReference(this.reference).subscribe(() => {
        if (this.data.reference != null) this._snackBar.open("Изменение данных прошло успешно", "Закрыть", { duration: 2000 });
        else this._snackBar.open("Добавление данных прошло успешно", "Закрыть", { duration: 2000 });
        this.dialogRef.close('ok');
      });
    }
  }

  onChange(e : any) {
    this.reference.status = e.checked;
  }
  
  parseTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Устанавливаем часы и минуты
    return date;
  }

  updateErrorMessage() {
    // if (this.name.hasError('required')) {
    //   this.errorMessageEmail = 'Заполните поле';
    // }

    // if (this.numberFormControl.hasError('required')) {
    //   this.errorMessageCountPersons = 'Введите количество человек';
    // } else if (this.numberFormControl.hasError('min')) {
    //   this.errorMessageCountPersons = 'Минимум 1 человек';
    // } else if (this.numberFormControl.hasError('max')) {
    //   this.errorMessageCountPersons = 'Максимум 15 человек';
    // } else {
    //   this.errorMessageCountPersons = '';
    // }

    // if (this.fio.hasError('required')) {
    //   this.errorMessageFio = 'Введите фамилию';
    // } else {
    //   this.errorMessageFio = '';
    // }

    // if (this.phoneNumber.hasError('required')) {
    //   this.errorMessagePhoneNumber = 'Введите номер телефона';
    // } else if (this.phoneNumber.hasError('pattern')) {
    //   this.errorMessagePhoneNumber = 'Неправильный номер';
    // } else {
    //   this.errorMessagePhoneNumber = '';
    // }
  }
}
