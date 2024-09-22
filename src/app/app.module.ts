import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet, provideRouter } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import routes from './app.routes';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { EditDeviceComponent } from './components/edit-device/edit-device.component';
import { GaugeStatusComponent } from './components/gauge-status/gauge-status.component';
import { StatusCellRendererComponent } from './components/status-legend-item/status-cell-renderer.component';
import { StatusLegendItemComponent } from './components/status-legend-item/status-legend-item.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GaugeStatusComponent,
    DataTableComponent,
    EditDeviceComponent,
    StatusLegendItemComponent,
    StatusCellRendererComponent,
    AuthComponent,
  ],
  imports: [
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TranslocoRootModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AgGridModule,
    MatSnackBarModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
