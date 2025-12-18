import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonMenuButton, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ExpenseService } from 'src/app/services/expense-service';
import { Expense } from 'src/app/model/expense';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton,
    CommonModule, FormsModule, RouterLink]
})
export class HomePage {

  private expenseService = inject(ExpenseService);

  expenses: Expense[] = [];
  expensesFiltrados: Expense[] = [];



  constructor() { }

  ionViewWillEnter() {
    this.loadAllExpenses();
    this.sortBydate();

  }

  loadAllExpenses() {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data;
      this.expensesFiltrados = data;
    });
  } 


  //oredenar por fecha  recientes
  sortBydate() {
    this.expensesFiltrados.sort((a, b) => {
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
  }
  // sortBydate() {
  //   console.log('ordengando');
  //   this.expensesFiltrados.sort((a, b) => {
  //     return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  //   });
  // }

}
