import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { GaugeStatusComponent } from './components/gauge-status/gauge-status.component';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GaugeStatusComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    MatCardModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
