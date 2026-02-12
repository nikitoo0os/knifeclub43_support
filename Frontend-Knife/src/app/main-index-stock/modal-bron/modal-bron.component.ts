import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { provideNgxMask, IConfig } from 'ngx-mask';
import { ReservReference } from 'src/app/classes/reservreference';
import { ReferenceService } from 'src/app/services/reference.service';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
        <div class="example-pizza-party">
          <div>
            <mat-icon>error_outline</mat-icon>
          </div>
          <span class="message">Для подтверждения бронирования мы свяжемся с вами в Telegram или ВКонтакте для внесения предоплаты. Пожалуйста, укажите ваш никнейм в Telegram, так как номер телефона может быть не привязан или свяжитесь с нами в группе ВКонтакте.</span>
          <button class="close-button" mat-button (click)="close()">Закрыть</button>
        </div>
  `,
  styles: [`
    .example-pizza-party {
      display: flex; /* Используем Flexbox */
      align-items: center; /* Центрируем элементы по вертикали */
      justify-content: space-between; /* Размещаем элементы по краям */
      color: #FF4500; /* Цвет текста белый */
      font-weight: bold; /* Жирный текст */
    }

    .message {
      flex-grow: 1; /* Позволяет тексту занимать доступное пространство */
      margin-left: 8px; /* Отступ между иконкой и текстом */
      margin-right: 16px; /* Отступ между текстом и кнопкой */
    }

    .close-button {
      color: white; /* Цвет текста кнопки белый */
    }
  `]
})
export class PizzaPartyComponent {
  constructor(private snackBarRef: MatSnackBarRef<PizzaPartyComponent>) {}

  close() {
    this.snackBarRef.dismiss(); // Закрытие Snackbar
  }
}

@Component({
  selector: 'app-modal-bron',
  templateUrl: './modal-bron.component.html',
  styleUrls: ['./modal-bron.component.css'],
  providers: [DatePipe, provideNgxMask(maskConfigFunction)]
})

export class ModalBronComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  fio = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  numberFormControl = new FormControl('', [Validators.min(1), Validators.max(15)]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern('^([7]|[8])[- ]?[(]?[0-9]{3}[)]?[- ]?[0-9]{3}[- ]?([0-9]{4}|[0-9]{2}[- ]?[0-9]{2})$')]);
  reg = '';

  response_value: boolean = true;

  errorMessageEmail = 'Введите E-mail';
  errorMessageFio = 'Введите фамилию';
  errorMessageCountPersons = 'Введите количество человек';
  errorMessagePhoneNumber = 'Введите номер телефона';  

  reservReference: ReservReference = new ReservReference();

  constructor(private _snackBar: MatSnackBar, private datepipe: DatePipe, private refService: ReferenceService, private dialogRef: MatDialogRef<ModalBronComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // 'Для подтверждения бронирования Вам может быть отправлено сообщения на What’s App или Telegram для внесения предоплаты.'
    this.reservReference.count_person = 1;
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 10000,
      verticalPosition: 'top', // Позиция сверху
      horizontalPosition: 'center' // Позиция по горизонтали (можно также 'start' или 'end')
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onBronClick(): void {
    this.updateErrorMessage();
    if (this.email.valid && this.phoneNumber.valid && this.fio.valid && this.numberFormControl.valid)
    {
      this.reservReference.date = this.data.date;
      this.reservReference.time = this.data.time;
      this.reservReference.reference = this.data.reference;
      //this.reservReference.dateBron = new Date();
      if (this.response_value && this.response_value != null) {  
        this.refService.reservReference(this.reservReference, true).subscribe((data) => {
          //console.log(data);
          this.response_value = data;
          if (data == null) {
            this._snackBar.open('У-пс! Это время можно забронировать только по т. +7 (8332) 79-94-74!', "Закрыть", { 
              duration: 10000
            });
          }
          else if (data) {
            this._snackBar.open('Отлично! Вы успешно забронировали время ' + this.reservReference!.time + ' ' + this.datepipe.transform(this.data.date, 'd MMMM') + '!' + ' Ваша бронь будет действительна после внесения предоплаты. Бронь без внесения предоплаты будет отменена.', "Закрыть", { duration: 10000 });
            this.dialogRef.close();
          }
          else {
            this._snackBar.open('У-пс! Ваше время занято, пожалуйста, выберите другое время бронирования!', "Закрыть", { duration: 10000 });
            //this.dialogRef.close();
          }
        });
      }
      else if (this.response_value == null) this._snackBar.open('У-пс! Это время можно забронировать только по т. +7 (8332) 79-94-74!', "Закрыть", { duration: 10000 });
      else this._snackBar.open('У-пс! Ваше время занято, пожалуйста, выберите другое время бронирования!', "Закрыть", { duration: 10000 });
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessageEmail = 'Введите E-mail';
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail = 'Введите корректное значение';
    } else {
      this.errorMessageEmail = '';
    }

    if (this.numberFormControl.hasError('required')) {
      this.errorMessageCountPersons = 'Введите количество человек';
    } else if (this.numberFormControl.hasError('min')) {
      this.errorMessageCountPersons = 'Минимум 1 человек';
    } else if (this.numberFormControl.hasError('max')) {
      this.errorMessageCountPersons = 'Максимум 15 человек';
    } else {
      this.errorMessageCountPersons = '';
    }

    if (this.fio.hasError('required')) {
      this.errorMessageFio = 'Введите фамилию';
    } else {
      this.errorMessageFio = '';
    }

    if (this.phoneNumber.hasError('required')) {
      this.errorMessagePhoneNumber = 'Введите номер телефона';
    } else if (this.phoneNumber.hasError('pattern')) {
      this.errorMessagePhoneNumber = 'Неправильный номер';
    } else {
      this.errorMessagePhoneNumber = '';
    }
  }

  getDuration(duration: number): string {
    if (Math.floor(duration/60) == 0)
      return duration%60 + " мин"
    else if (duration%60 == 0)
      return Math.floor(duration/60) + " ч"
    else return Math.floor(duration/60) + " ч." + ' ' + duration%60 + " мин"
  }
}
