import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import { ReferenceService } from '../services/reference.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Reference } from '../classes/reference';
import { FormControl, Validators } from '@angular/forms';
import { ImgReference } from '../classes/imgreference';
import { animationDuration } from '../classes/globals';
import { ModalViewImgComponent } from '../main-index-stock/modal-view-img/modal-view-img.component';
import { MatDialog } from '@angular/material/dialog';
import { Birthday } from '../classes/birthday';
import { TopBron } from '../classes/topbron';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-main-index',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(2000)
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(100%)' })),
      transition(':enter', [
        animate('1s', style({ transform: 'translateX(0)' }))
      ])
    ]),
    trigger('scrollAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MainIndexComponent implements OnInit {
  fio = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern('^([8]|[+]?[7])[- ]?[(]?[0-9]{3}[)]?[- ]?[0-9]{3}[- ]?([0-9]{4}|[0-9]{2}[- ]?[0-9]{2})$')]);
  errorMessageFio = 'Введите фамилию';
  errorMessagePhoneNumber = 'Введите номер телефона'; 
  phone: string = '';
  fioClient: string = '';
  imgfiles: ImgReference[] = [];
  showHiddenElementInformation = false;
  showHiddenElementInformation2 = false;
  showHiddenElementReferences = false;
  showHiddenElementReferencesBron = true;
  showHiddenElementPhoto = false;
  showHiddenElementOrange = false;
  isTextLeft = true;
  snowflakes: { size: string, left: string, duration: string, top: string }[] = [];

  days_count: number = 0;
  date: Date = new Date();
  //topBron?: Reference; 

  references?: Reference[];
  birthdays?: Birthday[];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isTextLeft = window.innerWidth > 768; // Измените значение на необходимое
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Определите условие, при котором нужно показать скрытый элемент
    if (scrollPosition > 100) {
      this.showHiddenElementInformation = true;
    }
    if (scrollPosition > 800) {
      this.showHiddenElementInformation2 = true;
    }
    if (scrollPosition > 1700) {
      this.showHiddenElementPhoto = true;
    }
    if (scrollPosition > 2600) {
      this.showHiddenElementReferences = true;
    }
    if (scrollPosition > 3300) {
      this.showHiddenElementOrange = true;
    }
    

    //console.log(scrollPosition);
  }

  constructor(private elementRef: ElementRef, private dialog: MatDialog, private refServ: ReferenceService) {

  }
  
  ngOnInit(): void {
    this.generateSnowflakes();
    this.refServ.getAllReferencesForClient().subscribe((response: HttpResponse<any>) => { 
      this.references = response.body;
    });
    this.refServ.getAllImage().subscribe(data => {
      this.imgfiles = data;
    });
    this.refServ.getAllBirthdaysForClient().subscribe(data => {
      this.birthdays = data;
    });
  }

  openImg(urlimg: ImgReference) {
    this.dialog.open(ModalViewImgComponent, {
      panelClass: 'fullscreen-dialog',
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        urlimg: urlimg
      }
    });
  }

  updateErrorMessage() {
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

  clickBron(): void {
      const element = this.elementRef.nativeElement.querySelector('#myDiv');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          // Элемент полностью видим
          //console.log('Элемент полностью видим');
        } else {
          // Элемент не полностью видим, прокрутка к нему
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
  }

  clickBronEvent(): void {
    const element = this.elementRef.nativeElement.querySelector('#bron');
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // Элемент полностью видим
        //console.log('Элемент полностью видим');
      } else {
        // Элемент не полностью видим, прокрутка к нему
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
}

  clickTop(): void {
    const element = this.elementRef.nativeElement.querySelector('#top');
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // Элемент полностью видим
        //console.log('Элемент полностью видим');
      } else {
        // Элемент не полностью видим, прокрутка к нему
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  clickReserv(): void {
    const element = this.elementRef.nativeElement.querySelector('#divReserv');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openIcon(url: string) {
    window.open(url);
  }

  getDuration(duration: number): string {
    if (Math.floor(duration/60) == 0)
      return duration%60 + " мин"
    else if (duration%60 == 0)
      return Math.floor(duration/60) + " ч"
    else return Math.floor(duration/60) + " ч." + ' ' + duration%60 + " мин"
  }

  
  generateSnowflakes() {
    this.snowflakes = Array.from({ length: 70 }).map(() => ({
      size: this.getRandomSize(),
      left: this.getRandomLeft(),
      duration: this.getRandomDuration(),
      top: this.getRandomTop()
    }));
  }

  updateSnowflakes() {
    // Обновляем позиции снежинок при прокрутке
    this.snowflakes = this.snowflakes.map(snowflake => ({
      ...snowflake,
      top: (parseFloat(snowflake.top) + 5) + 'px' // Сдвиг вниз на 5 пикселей
    }));

    // Если снежинка выходит за пределы экрана, перемещаем её обратно в верхнюю часть
    this.snowflakes.forEach((snowflake, index) => {
      if (parseFloat(snowflake.top) > window.innerHeight) {
        this.snowflakes[index].top = (-(Math.random() * window.innerHeight)) + 'px';
        this.snowflakes[index].left = this.getRandomLeft(); // Случайное новое положение по горизонтали
      }
    });
  }

  getRandomSize() {
    return (Math.random() * 5 + 2) + 'px';
  }

  getRandomLeft() {
    return (Math.random() * window.innerWidth) + 'px';
  }

  getRandomDuration() {
    return (Math.random() * 3 + 2) + 's';
  }

  getRandomTop() {
    return (-(Math.random() * window.innerHeight)) + 'px';
  }
}
