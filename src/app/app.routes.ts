import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

export default routes;
