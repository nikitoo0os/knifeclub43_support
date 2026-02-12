import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Reference } from 'src/app/classes/reference';
import { ReservReference } from 'src/app/classes/reservreference';
import { ReferenceService } from 'src/app/services/reference.service';
import { ModalReservrestroomComponent } from './modal-reservrestroom/modal-reservrestroom.component';
import { ReservRestroom } from 'src/app/classes/reservrestroom';
import { RestroomService } from 'src/app/services/restroom.service';
import { Restroom } from 'src/app/classes/restroom';
import { ModalReservreferenceComponent } from './modal-reservreference/modal-reservreference.component';
import { MatSort } from '@angular/material/sort';
import { ModalEditReservreferenceComponent } from './modal-edit-reservreference/modal-edit-reservreference.component';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animationDuration } from 'src/app/classes/globals';
import { ReferenceSlots } from 'src/app/classes/reference_slots';
import { ModalCloseclubComponent } from './modal-closeclub/modal-closeclub.component';
import { ReservBlock } from 'src/app/classes/reservblock';

@Component({
  selector: 'app-main-index-bron',
  templateUrl: './main-index-bron.component.html',
  styleUrls: ['./main-index-bron.component.css'],
  providers: [DatePipe]
})
export class MainIndexBronComponent implements OnInit {
  selectedDate: Date = new Date();
  dataSourceReservReferences = new MatTableDataSource();
  dataSourceReservReferencesFilter = new MatTableDataSource();
  displayedColumnsReservReferences: string[] = ['action', 'time', 'fioClient', 'phone', 'email', 'reference', 'status'];
  displayedColumnsReservReferencesFilter: string[] = ['action', 'date', 'time', 'fioClient', 'phone', 'email', 'reference', 'status'];
  
  references_timeslots?: ReferenceSlots[];
  // references?: Reference[];
  reservreferences: ReservReference[] = [];
  reservreferencesFilter: ReservReference[] = [];
  reservreferences_down: ReservReference[] = [];
  reservRestrooms: ReservRestroom[] = [];
  reservBlocks: ReservBlock[] = [];
  restrooms: Restroom[] = [];
  authService! : AuthorizationService;
  chckHelp: boolean = false;

  constructor(private _snackBar: MatSnackBar, private route: Router, private datePipe: DatePipe, private restService: RestroomService, private refService: ReferenceService, public dialog: MatDialog, private authServ: AuthorizationService) { this.authService = authServ }
  @ViewChild('table1', {read: MatSort, static: true}) sort!: MatSort;
  @ViewChild('table_reservreferencesall', {read: MatSort, static: true}) sortFilter!: MatSort;

  ngOnInit(): void {
    this.dataSourceReservReferencesFilter.filterPredicate = (data: any, filter: string) => {
      return data.date?.toString().includes(filter) || data.reference?.name?.toLowerCase().includes(filter) || data.fioClient?.toLowerCase().includes(filter) || data.phone?.includes(filter) || data.email?.toLowerCase().includes(filter) || data.time?.includes(filter);
    };
    this.refService.getAllReferencesReservation(this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!.toString()).subscribe((data) => {
      this.references_timeslots = data;
    })
    this.reloadReservReferences();
    this.restService.getAllRestrooms().subscribe((data) => {
      this.restrooms = data;
    })
    this.reloadReservRestroom();
    this.reloadReservBlocks()
  }

  onSelect(event: any) {
    this.selectedDate = event.value;
    this.refService.getAllReferencesReservation(this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!.toString()).subscribe((data) => {
      this.references_timeslots = data;
    })
    this.reloadReservReferences();
    this.reloadReservRestroom();
    this.reloadReservBlocks()
  }

  openDialogReservRestroom(restroom: Restroom): void {
    this.dialog.open(ModalReservrestroomComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        date: this.selectedDate,
        restroom: restroom
      }
    }).afterClosed().subscribe((result) => {
      if (result == 'ok') {
        this.reloadReservRestroom();
      }
    });
  }

  openDialogReservRestroomEdit(reservrestroom: ReservRestroom): void {
    this.dialog.open(ModalReservrestroomComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        date: this.selectedDate,
        reservrestroom: reservrestroom
      }
    }).afterClosed().subscribe((result) => {
      if (result == 'ok') {
        this.reloadReservRestroom();
      }
    });
  }

  openDialogEditReservReference(reservReference: ReservReference): void {
    this.dialog.open(ModalEditReservreferenceComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        reservReference: reservReference
      }
    }).afterClosed().subscribe((result) => {
      if (result == 'ok') {
        this.reloadReservReferences();
      }
    });
  }

  openDialogEditReservReferenceFilter(reservReference: ReservReference): void {
    this.dialog.open(ModalEditReservreferenceComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        reservReference: reservReference
      }
    }).afterClosed().subscribe((result) => {
      if (result == 'ok') {
        //this.reloadReservReferences();
      }
    });
  }

  delReservRestroom(reservrestroom: ReservRestroom) {
    if(confirm("Вы действительно хотите удалить данный элемент?")) {
      this.restService.delReservRestroom(reservrestroom).subscribe((data) => {
        if (data) { this._snackBar.open("Удаление данных прошло успешно", "Закрыть", { duration: 2000 }); this.reloadReservRestroom(); }
        else this._snackBar.open("В удалении данных произошла ошибка", "Закрыть", { duration: 2000 });
      })
    }
  }

  openDialogCloseClub(): void {
    this.dialog.open(ModalCloseclubComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        date: this.selectedDate
      }
    }).afterClosed().subscribe((result) => {
      if (result == 'ok') {
        this.reloadReservBlocks();
        this.reloadReservReferences();
      }
    });
  }

  openDialogCloseClubEdit(reservblock: ReservBlock): void {
    this.dialog.open(ModalCloseclubComponent, {
      enterAnimationDuration: animationDuration,
      exitAnimationDuration: animationDuration,
      data: {
        date: this.selectedDate,
        reservblock: reservblock
      }
    }).afterClosed().subscribe((result) => {
      if (result == 'ok') {
        this.reloadReservBlocks();
        this.reloadReservReferences();
      }
    });
  }

  delReservBlock(reservblock: ReservBlock) {
    if(confirm("Вы действительно хотите удалить данный элемент?")) {
      this.refService.delReservBlock(reservblock).subscribe((data) => {
        if (data) { this._snackBar.open("Удаление данных прошло успешно", "Закрыть", { duration: 2000 }); this.reloadReservBlocks(); this.reloadReservReferences(); }
        else this._snackBar.open("В удалении данных произошла ошибка", "Закрыть", { duration: 2000 });
      })
    }
  }

  //ПРОВЕРКИ КНОПОК
  checkValueForTrener(value: string, reference: Reference): boolean {
    const foundItem = this.reservreferences.find(item => item.time === value && item.reference?.id == reference.id);
    if (foundItem) {
      return false;
    }
    else {
      return true;
    }
  }

  checkValueExistGreen(value: string, reference: Reference): boolean {
    const foundItem = this.reservreferences.find(item => item.time === value && item.reference?.id == reference.id && (item.status == true && item.closedbron == false));
    if (foundItem) {
      return true;
    }
    else {
      return false;
    }
  }

  checkValueExistBlue(value: string, reference: Reference): boolean {
    const foundItem = this.reservreferences.find(item => item.time === value && item.reference?.id == reference.id && (item.status == false && item.closedbron == true));
    if (foundItem) {
      return true;
    }
    else {
      return false;
    }
  }

  checkValueExistOrange(value: string, reference: Reference): boolean {
    const foundItem = this.reservreferences.find(item => item.time === value && item.reference?.id == reference.id && (item.status == null && item.closedbron == false));
    if (foundItem) {
      return true;
    }
    else {
      return false;
    }
  }

  checkValueExistCyan(value: string, reference: Reference): boolean {
    const foundItem = this.reservreferences.find(item => item.time === value && item.reference?.id == reference.id && (item.status == null && item.closedbron == true));
    if (foundItem) {
      return true;
    }
    else {
      return false;
    }
  }

  checkValueExistRed(value: string, reference: Reference): boolean {
    const foundItem = this.reservreferences.find(item => item.time === value && item.reference?.id == reference.id && (item.status == true && item.closedbron == true));
    if (foundItem) {
      return true;
    }
    else {
      return false;
    }
  }

  getReservReference(value: string, reference: Reference): ReservReference {
    return this.reservreferences.find(item => item.time === value && item.reference?.id == reference.id)!;
  }

  openDialogReservReference(i: number, references_timeslot: ReferenceSlots): void {
    let color: string;
    let reservReference: ReservReference | null;

    if (this.selectedDate.getDay() == 6 || this.selectedDate.getDay() == 0) {
      if(this.checkValueExistGreen(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!)) { color = 'green'; } 
      else if (this.checkValueExistOrange(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!)) { color = 'orange'; }
      else if (this.checkValueExistCyan(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!)) { color = 'cyan'; }
      else if (this.checkValueExistRed(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!)) { color = 'red'; }
      else if (this.checkValueExistBlue(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!)) { color = 'blue'; }
      else color = 'gray';
  
      if(this.checkValueExistGreen(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!) || 
      this.checkValueExistOrange(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!) || 
      this.checkValueExistCyan(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!) ||
      this.checkValueExistRed(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!)) { reservReference = this.getReservReference(references_timeslot.timeslotsHoliday![i], references_timeslot.reference!) }
      else reservReference = null;
  
      this.dialog.open(ModalReservreferenceComponent, {
        enterAnimationDuration: animationDuration,
        exitAnimationDuration: animationDuration,
        data: {
          reference: references_timeslot.reference,
          time: references_timeslot.timeslotsHoliday![i],
          date: this.selectedDate,
          color: color,
          reservReference: reservReference
        }
      }).afterClosed().subscribe((result) => {
        if (result == 'ok') {
          this.reloadReservReferences();
        }
      })
    }
    else {
      if(this.checkValueExistGreen(references_timeslot.timeslots![i], references_timeslot.reference!)) { color = 'green'; } 
      else if (this.checkValueExistOrange(references_timeslot.timeslots![i], references_timeslot.reference!)) { color = 'orange'; }
      else if (this.checkValueExistCyan(references_timeslot.timeslots![i], references_timeslot.reference!)) { color = 'cyan'; }
      else if (this.checkValueExistRed(references_timeslot.timeslots![i], references_timeslot.reference!)) { color = 'red'; }
      else if (this.checkValueExistBlue(references_timeslot.timeslots![i], references_timeslot.reference!)) { color = 'blue'; }
      else color = 'gray';
  
      if(this.checkValueExistGreen(references_timeslot.timeslots![i], references_timeslot.reference!) || 
      this.checkValueExistOrange(references_timeslot.timeslots![i], references_timeslot.reference!) || 
      this.checkValueExistCyan(references_timeslot.timeslots![i], references_timeslot.reference!) ||
      this.checkValueExistRed(references_timeslot.timeslots![i], references_timeslot.reference!)) { reservReference = this.getReservReference(references_timeslot.timeslots![i], references_timeslot.reference!) }
      else reservReference = null;
  
      this.dialog.open(ModalReservreferenceComponent, {
        enterAnimationDuration: animationDuration,
        exitAnimationDuration: animationDuration,
        data: {
          reference: references_timeslot.reference,
          time: references_timeslot.timeslots![i],
          date: this.selectedDate,
          color: color,
          reservReference: reservReference
        }
      }).afterClosed().subscribe((result) => {
        if (result == 'ok') {
          this.reloadReservReferences();
        }
      })
    }
  }

  exit(): void {
    localStorage.removeItem('access_token');
    this.route.navigate(['']);
  }

  reloadReservReferences(): void {
    this.refService.getAllReservReferencesByDate(this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!.toString()).subscribe((data) => {
      this.reservreferences = data.filter(item => item.status == true || item.status == null || (item.status == false && item.closedbron == true));
      // this.dataSourceReservReferences.data = this.reservreferences_down;
      // this.dataSourceReservReferences.sort = this.sort;
    })
    this.refService.getAllReservReferencesByDateActive(this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!.toString()).subscribe((data) => {
      this.reservreferences_down = data.filter(item => (item.fioClient != "" && item.fioClient != null) && ((item.status == true && item.closedbron != null) || (item.status == false && item.closedbron == false) || (item.status == null && item.closedbron == false)));
      this.dataSourceReservReferences.data = this.reservreferences_down;
      this.dataSourceReservReferences.sort = this.sort;
    })
  }

  reloadReservRestroom(): void {
    this.restService.getAllReservRestroomsByDate(this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!.toString()).subscribe((data) => {
      this.reservRestrooms = data;
    })
  }

  reloadReservBlocks(): void {
    this.refService.getAllReservBlocks(this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')!.toString()).subscribe((data) => {
      this.reservBlocks = data;
    })
  }

  getAllReservReferences(): void {
    this.refService.getAllReservReferencesAll().subscribe((data) => {
      this.reservreferencesFilter = data;
      this.dataSourceReservReferencesFilter.data = this.reservreferencesFilter;
      this.dataSourceReservReferencesFilter.sort = this.sortFilter;
    })
  }

  applyFilter(event: Event) {
    this.dataSourceReservReferencesFilter.filter = (event?.target as HTMLInputElement).value.trim().toLowerCase();
  }

  checkHelp() {
    this.chckHelp = !this.chckHelp;
  }
}
