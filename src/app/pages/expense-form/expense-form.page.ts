import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonInput, IonDatetime, IonToolbar, IonToast, IonButton, IonLabel, IonItem, IonSelect, IonSelectOption, IonMenu, IonMenuButton } from '@ionic/angular/standalone';
import { ExpenseService } from 'src/app/services/expense-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/model/expense';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.page.html',
  styleUrls: ['./expense-form.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonToast,
    ReactiveFormsModule, IonSelectOption, IonSelect, IonInput, IonDatetime, IonMenu, IonMenuButton]
})
export class ExpenseFormPage implements OnInit {

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  expenseId: string | null = null;
  isEditMode: boolean = false;

  toastVisible = false;
  toastMessage = '';  

  form = this.fb.nonNullable.group({
    concepto: ['', Validators.required],
    categoria: ['comida' as 'comida' | 'transporte' | 'salud' | 'ocio', Validators.required],
    monto: [0, Validators.required ],
    fecha: ['', Validators.required],
    pagado: [false]
  });

  constructor() { }

  ngOnInit() {
   this.expenseId = this.route.snapshot.queryParamMap.get('id');
    if (this.expenseId) {
      this.isEditMode = true;
      this.expenseService.getExpenseById(this.expenseId).subscribe((expense) => { 
        this.setValueIntoForm(this.expenseId!);
      });
    }   
  }


  setValueIntoForm(expenseId: string) {
    this.expenseService.getExpenseById(expenseId).subscribe((expense) => {
      this.form.patchValue({
        concepto: expense.concepto,
        categoria: expense.categoria,
        monto: expense.monto, 
        fecha: expense.fecha,
        pagado: expense.pagado
      });
    });
  }
    
  save(){
    const dataExpenseForm:  Expense = this.form.getRawValue();
    if (this.expenseId && this.isEditMode) {
      this.expenseService.updateExpense(this.expenseId, dataExpenseForm).subscribe(() => {
        this.toastMessage = 'Gasto actualizadook';
        this.toastVisible = true;
        setTimeout(() => {
          this.toastVisible = false;
          this.router.navigate(['/home']);

        }, 2000); 
      });
    } else {
      this.expenseService.createExpense(dataExpenseForm).subscribe(() => {
        this.toastMessage = 'Gasto creado';
        this.toastVisible = true;
        setTimeout(() => {
          this.toastVisible = false;
          this.router.navigate(['/home']);

        }, 2000); 
      }); 

    }


  }
}
