import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ApplyValueComponent} from "../../modals/apply-value/apply-value.component";

@Component({
  selector: 'app-budget-table',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, FormsModule,
    ApplyValueComponent],
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.scss'
})
export class BudgetTableComponent implements OnInit, AfterViewInit {
  startPeriod = 'January 2024';
  endPeriod = 'December 2024';
  allMonths = [
    'January 2024',
    'February 2024',
    'March 2024',
    'April 2024',
    'May 2024',
    'June 2024',
    'July 2024',
    'August 2024',
    'September 2024',
    'October 2024',
    'November 2024',
    'December 2024',
  ];
  months = [...this.allMonths];
  incomeTotals: number[] = [];
  expenseTotals: number[] = [];
  profitLosses: number[] = [];
  openingBalances: number[] = [];
  closingBalances: number[] = [];
  overallIncomeTotals: number[] = [];
  overallExpenseTotals: number[] = [];

  profitLosses$ = new BehaviorSubject<number[]>([]);

  incomeCategories = [
    {
      name: 'General Income',
      subcategories: [
        { name: 'Sales', values: [100, 120] },
        { name: 'Commission', values: [200, 400] },
      ],
      subTotals: [] as number[],
    },
    {
      name: 'Other Income',
      subcategories: [
        { name: 'Training', values: [500, 550] },
        { name: 'Consulting', values: [500, 600] },
      ],
      subTotals: [] as number[],
    },
  ];

  expenseCategories = [
    {
      name: 'Operational Expenses',
      subcategories: [
        { name: 'Management Fees', values: [50, 100] },
        { name: 'Cloud Hosting', values: [200, 400] },
      ],
      subTotals: [] as number[],
    },
    {
      name: 'Salaries & Wages',
      subcategories: [
        { name: 'Full Time Dev Salaries', values: [100, 120] },
        { name: 'Part Time Dev Salaries', values: [80, 80] },
      ],
      subTotals:[] as number[]
    },
  ];
  constructor(private elementRef: ElementRef,
              private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.initializeIncomeCategories(); // Call the function here
  }
  ngAfterViewInit(): void {
    const firstCell = document.getElementById('cell-income-0-0-0');
    if (firstCell) {
      firstCell.focus();
    }    // Focus the first cell
  }

  initializeIncomeCategories(): void {
    const numMonths = this.months.length; // Total number of months

    this.incomeCategories = [
      {
        name: 'General Income',
        subcategories: [
          { name: 'General Income', values: Array(numMonths).fill(0) },
          { name: 'Sales', values: Array(numMonths).fill(0) }, // Initialize all month values to 0
          { name: 'Commission', values: Array(numMonths).fill(0) },
        ],
        subTotals: Array(numMonths).fill(0), // Initialize subtotals to 0
      },
      {
        name: 'Other Income',
        subcategories: [
          { name: 'Training', values: Array(numMonths).fill(0) },
          { name: 'Consulting', values: Array(numMonths).fill(0) },
        ],
        subTotals: Array(numMonths).fill(0), // Initialize subtotals to 0
      },
    ];
    this.expenseCategories = [
      {
        name: 'Operational Expenses',
        subcategories: [
          { name: 'Management Fees', values:  Array(numMonths).fill(0)  },
          { name: 'Cloud Hosting', values:  Array(numMonths).fill(0)  },
        ],
        subTotals: Array(numMonths).fill(0),
      },
      {
        name: 'Salaries & Wages',
        subcategories: [
          { name: 'Full Time Dev Salaries', values:  Array(numMonths).fill(0)  },
          { name: 'Part Time Dev Salaries', values:  Array(numMonths).fill(0)  },
        ],
        subTotals: Array(numMonths).fill(0)
      },
    ];

    // Initialize overall totals to 0
    this.overallIncomeTotals = Array(numMonths).fill(0);
    this.overallExpenseTotals = Array(numMonths).fill(0);
    this.profitLosses = Array(numMonths).fill(0);
    this.openingBalances= Array(numMonths).fill(0);
    this.closingBalances= Array(numMonths).fill(0);
  }

  updateMonths() {
    // Dynamically update months between startPeriod and endPeriod
    const startIndex = this.allMonths.indexOf(this.startPeriod);
    const endIndex = this.allMonths.indexOf(this.endPeriod);
    this.months = this.allMonths.slice(startIndex, endIndex + 1);
    this.initializeIncomeCategories();
  }


  onValueChange(event: Event, categoryIndex: number, subcategoryIndex: number, valueIndex: number, type: string): void {
    setTimeout(()=>{
      const target = event.target as HTMLElement;
      const newValue = parseFloat(target.textContent || '0'); // Convert the text content to a number
      if (!isNaN(newValue) && type === 'income') {
        this.incomeCategories[categoryIndex].subcategories[subcategoryIndex].values[valueIndex] = newValue;
        this.incomeCategories = JSON.parse(JSON.stringify(this.incomeCategories));
        this.calculateTotalsIncome(); // Recalculate subtotals and totals

        setTimeout(()=>{
          this.focusCell(categoryIndex, subcategoryIndex, valueIndex, type);
        },50)
      }else{
        this.expenseCategories[categoryIndex].subcategories[subcategoryIndex].values[valueIndex] = newValue;
        this.expenseCategories = JSON.parse(JSON.stringify(this.expenseCategories));
        this.calculateTotalsExpense(); // Recalculate subtotals and totals
        setTimeout(()=>{
          this.focusCell(categoryIndex, subcategoryIndex, valueIndex, type);
        },50)
      }
    },100);
  }

  focusCell(categoryIndex: number, subcategoryIndex: number, monthIndex: number, type: string): void {
    const cellId = `cell-${type}-${categoryIndex}-${subcategoryIndex}-${monthIndex}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      cell.focus();
    } else {
      console.warn(`Cell with ID ${cellId} not found.`);
    }
  }
  calculateTotalsIncome() {
    // Reset arrays for totals
    this.overallIncomeTotals = Array(this.months.length).fill(0);
    // Calculate Income Subtotals and Totals
    this.incomeCategories.forEach((category) => {
      // Reset subTotals for this category
      category.subTotals = Array(this.months.length).fill(0);

      category.subcategories.forEach((subcategory) => {
        subcategory.values.forEach((value, monthIndex) => {
          category.subTotals[monthIndex] += value; // Add value to the category's subTotal for the month
        });
      });
      // Add category subtotals to the overall income totals
      category.subTotals.forEach((subtotal, monthIndex) => {
        this.overallIncomeTotals[monthIndex] += subtotal; // Aggregate the overall totals for each month
      });
    });

  }

  calculateTotalsExpense(){
    // Calculate Income Subtotals and Totals
    this.overallExpenseTotals = Array(this.months.length).fill(0);

    this.expenseCategories.forEach((category) => {
      // Reset subTotals for this category
      category.subTotals = Array(this.months.length).fill(0);

      category.subcategories.forEach((subcategory) => {
        subcategory.values.forEach((value, monthIndex) => {
          category.subTotals[monthIndex] += value; // Add value to the category's subTotal for the month
        });
      });

      // Add category subtotals to the overall income totals
      category.subTotals.forEach((subtotal, monthIndex) => {
        this.overallExpenseTotals[monthIndex] += subtotal; // Aggregate the overall totals for each month
      });
    });
  }

  handleKeydown(event: KeyboardEvent, categoryIndex: number, subcategoryIndex: number, monthIndex: number, type: string): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCategoryRow(categoryIndex);
    } else if (event.key === 'Tab' && this.isLastCell(categoryIndex, subcategoryIndex, monthIndex)) {
      event.preventDefault();
      this.moveToNextRow(categoryIndex + 1);
    } else{
      const rows = this.incomeCategories[categoryIndex]?.subcategories?.length || 0;
      const columns = this.months.length;

      let newCategoryIndex = categoryIndex;
      let newSubcategoryIndex = subcategoryIndex;
      let newMonthIndex = monthIndex;

      switch (event.key) {
        case 'ArrowUp':
          // Move to the same column in the previous row
          if (newSubcategoryIndex > 0) {
            newSubcategoryIndex--;
          } else if (newCategoryIndex > 0) {
            // Move to the last row of the previous category
            newCategoryIndex--;
            newSubcategoryIndex = this.incomeCategories[newCategoryIndex].subcategories.length - 1;
          }
          break;

        case 'ArrowDown':
          // Move to the same column in the next row
          if (newSubcategoryIndex < rows - 1) {
            newSubcategoryIndex++;
          } else if (newCategoryIndex < this.incomeCategories.length - 1) {
            // Move to the first row of the next category
            newCategoryIndex++;
            newSubcategoryIndex = 0;
          }
          break;

        case 'ArrowLeft':
          // Move to the previous column
          if (newMonthIndex > 0) {
            newMonthIndex--;
          } else if (newSubcategoryIndex > 0) {
            // Move to the last column of the previous row
            newSubcategoryIndex--;
            newMonthIndex = columns - 1;
          } else if (newCategoryIndex > 0) {
            // Move to the last column of the last row in the previous category
            newCategoryIndex--;
            newSubcategoryIndex = this.incomeCategories[newCategoryIndex].subcategories.length - 1;
            newMonthIndex = columns - 1;
          }
          break;

        case 'ArrowRight':
          // Move to the next column
          if (newMonthIndex < columns - 1) {
            newMonthIndex++;
          } else if (newSubcategoryIndex < rows - 1) {
            // Move to the first column of the next row
            newSubcategoryIndex++;
            newMonthIndex = 0;
          } else if (newCategoryIndex < this.incomeCategories.length - 1) {
            // Move to the first column of the first row in the next category
            newCategoryIndex++;
            newSubcategoryIndex = 0;
            newMonthIndex = 0;
          }
          break;

        default:
          return; // Do nothing for other keys
      }
      event.preventDefault();
      // Focus the new cell
      this.focusCell(newCategoryIndex, newSubcategoryIndex, newMonthIndex, type);
    }
  }
  addCategoryRow(categoryIndex: number): void {
    const newRow = {
      name: 'New Category',
      values: Array(this.months.length).fill(0),
    };
    this.incomeCategories[categoryIndex].subcategories.push(newRow);

    setTimeout(() => {
      const newCell = this.elementRef.nativeElement.querySelector(
        `#category-${categoryIndex}-subcategory-${this.incomeCategories[categoryIndex].subcategories.length - 1}-month-0`
      );
      if (newCell) newCell.focus();
    });
  }

  isLastCell(categoryIndex: number, subcategoryIndex: number, monthIndex: number): boolean {
    return (
      categoryIndex === this.incomeCategories.length - 1 &&
      subcategoryIndex === this.incomeCategories[categoryIndex].subcategories.length - 1 &&
      monthIndex === this.months.length - 1
    );
  }

  moveToNextRow(nextCategoryIndex: number): void {
    if (nextCategoryIndex < this.incomeCategories.length) {
      const nextRowFirstCell = this.elementRef.nativeElement.querySelector(
        `#category-${nextCategoryIndex}-subcategory-0-month-0`
      );
      if (nextRowFirstCell) {
        nextRowFirstCell.focus();
      }
    }
  }

  onProfitLossChange(event: Event, monthIndex: number): void {
    setTimeout(()=>{
      const target = event.target as HTMLElement;
      const newValue = parseFloat(target.textContent || '0'); // Convert the text content to a number
      if (!isNaN(newValue)) {
        this.openingBalances[monthIndex+1] =  newValue;
        this.closingBalances[monthIndex] = this.openingBalances[monthIndex] + newValue;
      }
    },100);
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ApplyValueComponent, {
      data: {
        name: '',
        isBoard: true,
        darkMode: false,
      },
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (!success) {
        return;
      }
      // Apply the value to all months in the same subcategory
    });
  }

}
