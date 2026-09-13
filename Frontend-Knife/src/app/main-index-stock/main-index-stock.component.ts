import { Component, OnInit } from '@angular/core';
import { ModalBronComponent } from './modal-bron/modal-bron.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from '../services/reference.service';
import { Reference } from '../classes/reference';
import { ReservReference } from '../classes/reservreference';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ImgReference } from '../classes/imgreference';
import { ModalViewImgComponent } from './modal-view-img/modal-view-img.component';
import { animationDuration } from '../classes/globals';
import { ReferenceSlots } from '../classes/reference_slots';

@Component({
  selector: 'app-main-index-stock',
  templateUrl: './main-index-stock.component.html',
  styleUrls: ['./main-index-stock.component.css'],
  providers: [],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.5s', style({ opacity: '*' }))
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(-50%)' })),
      transition(':enter', [
        animate('0.5s', style({ transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scrollAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-80px)' }),
        animate('1000ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MainIndexStockComponent implements OnInit {
  descriptions!: string;
  urlImage: string = '';
  timeSlots?: string[];
  timeSlotsHoliday?: string[];
  id: number = 0;
  reference!: Reference;
  references?: Reference[] = [];
  reservreferences: ReservReference[] = [];
  reference_timeslots?: ReferenceSlots;

  date?: Date;
  days_count?: number; // Количество дней при запросе
  display_days_count: number = 7 // Количество изначально отображаемых дней

  dateTimeArray = [
    { date: new Date(), timeSlots: this.timeSlots }
  ];

  alldateTimeArray = [
    { date: new Date(), timeSlots: this.timeSlots }
  ];

  // datestart: Date = new Date();
  // datefinish: Date = new Date();

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private refServ: ReferenceService) {
    
  }

  openDialog(i: number, j: number): void {
    this.dialog.open(ModalBronComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        reference: this.reference,
        time: this.dateTimeArray[j].timeSlots![i],
        date: this.dateTimeArray[j].date
      }
    }).afterClosed().subscribe(() => {
      // this.refServ.getAllReservReferencesByStartDateAndEndDate(this.datePipe.transform(this.datestart, 'yyyy-MM-dd')!.toString(), this.datePipe.transform(this.datefinish, 'yyyy-MM-dd')!.toString(), this.id).subscribe(data => {
      //   this.reservreferences = data;
      // });
      this.refServ.getAllReservReferencesByStartDateAndEndDate(this.id).subscribe(data => {
        this.reservreferences = data;
      });
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.refServ.getByReferenceId(this.id).subscribe(data => {
        this.reference_timeslots = data;
        this.reference = this.reference_timeslots?.reference!;
        this.timeSlots = this.reference_timeslots?.timeslots;
        this.timeSlotsHoliday = this.reference_timeslots?.timeslotsHoliday;
        this.days_count = this.reference_timeslots?.days_count;
        this.date = new Date(this.reference_timeslots?.date!);
        if (this.references!.length > 0) this.references?.splice(0);
        this.references?.push(data);
        this.descriptions = this.reference!.description!;
        this.updateTimeSlotsAndDate();
      });
      // this.refServ.getAllReservReferencesByStartDateAndEndDate(this.datePipe.transform(this.datestart, 'yyyy-MM-dd')!.toString(), this.datePipe.transform(this.datefinish, 'yyyy-MM-dd')!.toString(), this.id).subscribe(data => {
      //   this.reservreferences = data;
      // });
      this.refServ.getAllReservReferencesByStartDateAndEndDate(this.id).subscribe(data => {
        this.reservreferences = data;
      });
    });
  }

  checkDataAndValueExist(date: Date, value: string): boolean {
    const foundItem = this.reservreferences.find(item => {
      const reservationDate = new Date(item.date!);
      return reservationDate.getFullYear() === date.getFullYear()
        && reservationDate.getMonth() === date.getMonth()
        && reservationDate.getDate() === date.getDate()
        && item.time === value;
    });
    if (foundItem) {
      return true;
    }
    else return false;
  }

  isPastTimeSlot(date: Date, timeSlot: string): boolean {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hours, minutes, 0, 0);
    return slotDateTime.getTime() <= Date.now();
  }

  checkDay(date: Date): boolean {
    if (date.getDay() == 6 || date.getDay() == 0) return true;
    else return false;
  }

  openImg(urlimg: ImgReference, id: number) {
    this.dialog.open(ModalViewImgComponent, {
      panelClass: 'fullscreen-dialog',
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        urlimg: urlimg,
        id: id
      }
    });
  }

  updateTimeSlotsAndDate(): void {
    const currentDate = this.date!;
    this.dateTimeArray = [];
    this.alldateTimeArray = [];
    for (let i = 0; i <= this.days_count!; i++) { // Здесь days_count - количество дней, на которые вы хотите получить даты
      const newDate = new Date();
      newDate.setDate(currentDate.getDate() + i);
      let newItem;
      if (newDate.getDay() == 6 || newDate.getDay() == 0) {
        newItem = {
          date: newDate,
          timeSlots: this.timeSlotsHoliday
        };
      } else {
        newItem = {
          date: newDate,
          timeSlots: this.timeSlots
        };
      }
      if (i<=this.display_days_count)
        this.dateTimeArray?.push(newItem);
      this.alldateTimeArray.push(newItem);
    }
  }

  loadMore() {
    const currentLength = this.dateTimeArray.length;
    const nextItems = this.alldateTimeArray.slice(currentLength);
    this.dateTimeArray = [...this.dateTimeArray, ...nextItems];
    //this.dateTimeArray = this.alldateTimeArray;
  }

  replaceText(description: string): string {
    if (description == "\n")
    {
      return description.replace(/\n/g, '<br><br>');
    }
    else {
      return description
    } 
  }
}
