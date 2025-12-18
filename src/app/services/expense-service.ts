import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  baseUrl = 'http://localhost:3000/expenses';
  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl);
  }
  getExpenseById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.baseUrl}/${id}`);
  }
  // createExpense(expenseId: Expense): Observable<Expense> {
  //   return this.http.post<Expense>(this.baseUrl, {expense});
  // }
  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl, expense);
  }

  updateExpense(id: string, expense: Partial<Expense>): Observable<Expense> {
    return this.http.put<Expense>(`${this.baseUrl}/${id}`, expense);
  } 

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}