import { Routes } from '@angular/router';

export const routes: Routes = [
 
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'expense-form',
    loadComponent: () => import('./pages/expense-form/expense-form.page').then( m => m.ExpenseFormPage)
  },
  {
    path: 'expense-detail',
    loadComponent: () => import('./pages/expense-detail/expense-detail.page').then( m => m.ExpenseDetailPage)
  },
  {
    path: 'expense-detail/:id',
    loadComponent: () => import('./pages/expense-detail/expense-detail.page').then( m => m.ExpenseDetailPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
