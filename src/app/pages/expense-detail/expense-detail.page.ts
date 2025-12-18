import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonRouterLink, IonToolbar, IonToast, IonItem, IonLabel, IonInput, IonButton, IonMenuButton} from '@ionic/angular/standalone';
import { ExpenseService } from 'src/app/services/expense-service';
import { Expense } from 'src/app/model/expense';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.page.html',
  styleUrls: ['./expense-detail.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonToast, IonContent,
    IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonButton, RouterLink, IonMenuButton]
})
export class ExpenseDetailPage implements OnInit {

  private expenseService = inject(ExpenseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertCtl = inject(AlertController);

  expenseId: string | null = null;
  expense: Expense | null = null;

  toastVisible = false;
  toastMessage = '';
  
  constructor() { }

  ngOnInit() {
    
    this.expenseId = this.route.snapshot.paramMap.get('id');
  
    console.log('Expense ID from route:', this.expenseId);
    if (this.expenseId) {
      this.expenseService.getExpenseById(this.expenseId).subscribe((expense) => {
        this.expense = expense;
      });
    }

  }

  async deleteExpense() {
    console.log('Eliminando gasto y id', this.expenseId);
    if (this.expenseId) {
      const alert = await this.alertCtl.create({
        header: 'Confirmá eliminación',
        message: '¿Estás seguro de que querés eliminar este gasto?',
        buttons: [
          { 
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Eliminar',
            role: 'confirm',
            handler: () => {
              this.expenseService.deleteExpense(this.expenseId!).subscribe(() => {
                this.toastMessage = 'Gasto eliminado';
                this.toastVisible = true;
                setTimeout(() => {
                  this.toastVisible = false;
                  this.router.navigate(['/home']);
                }, 2000);

                
              });
            }
          }
        ]
      }); 
      alert.present();
    } 
  }

}
