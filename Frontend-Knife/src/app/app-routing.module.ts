import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainIndexComponent } from './main-index/main-index.component';
import { MainIndexStockComponent } from './main-index-stock/main-index-stock.component';
import { MainIndexLcComponent } from './main-index-lc/main-index-lc.component';
import { MainIndexBronComponent } from './main-index-lc/main-index-bron/main-index-bron.component';
import { MainIndexAdminComponent } from './main-index-lc/main-index-admin/main-index-admin.component';

const routes: Routes = [
  {path: '', component: MainIndexComponent, children:
  [
    {path: 'reference', component: MainIndexStockComponent},
  ]
  },
  {path: "lc", component: MainIndexLcComponent, children:
  [
    {path: "reservation", component: MainIndexBronComponent},
    {path: "administration", component: MainIndexAdminComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
