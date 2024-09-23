import { Routes } from '@angular/router';
import { AuthComponent } from './authentication/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

export default routes;
