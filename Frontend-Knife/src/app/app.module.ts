import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialExampleModule } from '../material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainIndexComponent } from './main-index/main-index.component';

import { MatCardModule } from '@angular/material/card';
import { MainIndexStockComponent } from './main-index-stock/main-index-stock.component';
import { MainIndexRulesComponent } from './main-index-rules/main-index-rules.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ModalBronComponent } from './main-index-stock/modal-bron/modal-bron.component';
import { MainIndexLcComponent } from './main-index-lc/main-index-lc.component';
import { MainIndexBronComponent } from './main-index-lc/main-index-bron/main-index-bron.component';
import { MainIndexAdminComponent } from './main-index-lc/main-index-admin/main-index-admin.component';
import { PizzaPartyComponent } from './main-index-stock/modal-bron/modal-bron.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalBirthdayComponent } from './main-index-lc/main-index-admin/modal-typereference/modal-typereference.component';
import { ModalReferenceComponent } from './main-index-lc/main-index-admin/modal-reference/modal-reference.component';
import { ModalRestroomComponent } from './main-index-lc/main-index-admin/modal-restroom/modal-restroom.component';
import { PersonComponent } from './main-index-lc/main-index-admin/person/person.component';
import { ModalReservrestroomComponent } from './main-index-lc/main-index-bron/modal-reservrestroom/modal-reservrestroom.component';
import { ModalReservreferenceComponent } from './main-index-lc/main-index-bron/modal-reservreference/modal-reservreference.component';
import { ModalAuthorizationComponent } from './modal-authorization/modal-authorization.component';
import { ModalEditReservreferenceComponent } from './main-index-lc/main-index-bron/modal-edit-reservreference/modal-edit-reservreference.component';
import { MyGuardGuard } from './classes/my-guard.guard';
import { ModalViewImgComponent } from './main-index-stock/modal-view-img/modal-view-img.component';
import { ModalImgreferenceComponent } from './main-index-lc/main-index-admin/modal-imgreference/modal-imgreference.component';
import { DateAdapter } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ModalCloseclubComponent } from './main-index-lc/main-index-bron/modal-closeclub/modal-closeclub.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    PizzaPartyComponent,
    AppComponent,
    MainIndexComponent,
    MainIndexStockComponent,
    MainIndexRulesComponent,
    ModalBronComponent,
    MainIndexLcComponent,
    MainIndexBronComponent,
    MainIndexAdminComponent,
    ModalBirthdayComponent,
    ModalReferenceComponent,
    ModalRestroomComponent,
    PersonComponent,
    ModalReservrestroomComponent,
    ModalReservreferenceComponent,
    ModalAuthorizationComponent,
    ModalEditReservreferenceComponent,
    ModalViewImgComponent,
    ModalImgreferenceComponent,
    ModalCloseclubComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    MaterialExampleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }, MyGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    ) {
      this.dateAdapter.getFirstDayOfWeek = () => 1;
    }
 }
