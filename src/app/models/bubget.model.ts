export interface BudgetCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  subcategories: BudgetSubCategory[];
}

export interface BudgetSubCategory {
  id: string;
  name: string;
  values: number[];
}

export interface BudgetTableRow {
  categoryId: string;
  subCategoryId: string;
  values: number[];
}
