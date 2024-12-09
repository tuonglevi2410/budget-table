import { Injectable, signal } from '@angular/core';
import { BudgetCategory, BudgetTableRow } from '../models/bubget.model';
const MOCK_CATEGORIES: BudgetCategory[] = [
  {
    id: 'income',
    name: 'Income',
    type: 'income',
    subcategories: [
      { id: 'salary', name: 'Salary', values: [] },
      { id: 'freelance', name: 'Freelance', values: [] },
    ],
  },
  {
    id: 'expenses',
    name: 'Expenses',
    type: 'expense',
    subcategories: [
      { id: 'rent', name: 'Rent', values: [] },
      { id: 'utilities', name: 'Utilities', values: [] },
      { id: 'groceries', name: 'Groceries', values: [] },
    ],
  },
];

const MOCK_ROWS: BudgetTableRow[] = [
  // {
  //   categoryId: 'income',
  //   subCategoryId: 'salary',
  //   values: [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
  // },
  // {
  //   categoryId: 'income',
  //   subCategoryId: 'freelance',
  //   values: [500, 400, 600, 550, 450, 600, 650, 700, 550, 500, 600, 700],
  // },
  // {
  //   categoryId: 'expenses',
  //   subCategoryId: 'rent',
  //   values: [1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200],
  // },
  // {
  //   categoryId: 'expenses',
  //   subCategoryId: 'utilities',
  //   values: [200, 180, 190, 210, 220, 200, 190, 200, 220, 230, 210, 190],
  // },
  // {
  //   categoryId: 'expenses',
  //   subCategoryId: 'groceries',
  //   values: [400, 420, 430, 410, 400, 420, 410, 400, 430, 440, 450, 460],
  // },
];
@Injectable({
  providedIn: 'root',
})


export class BudgetService {
  months = signal<string[]>(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  rows = signal<BudgetTableRow[]>(MOCK_ROWS);
  // categories = signal<BudgetCategory[]>(MOCK_CATEGORIES); // New signal for categories

}

