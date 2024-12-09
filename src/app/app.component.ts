import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarToggleComponent } from './components/sidebar-toggle/sidebar-toggle.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThemeTogglerComponent } from './components/sidebar/theme-toggler/theme-toggler.component';
import { Board } from './models/board.model';
import { Task } from './models/task.model';
import { BoardDataService } from './services/board-data/board-data.service';
import {BudgetTableComponent} from "./components/budget/budget-table/budget-table.component";
import {FormsModule} from "@angular/forms";
import {ApplyValueComponent} from "./components/modals/apply-value/apply-value.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    ThemeTogglerComponent,
    NavbarComponent,
    SidebarToggleComponent,
    ApplyValueComponent,
    BudgetTableComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  darkMode = false;

  isSidebarOpen = false;

  boards = this.boardDataService.boards;

  activeBoard = this.boardDataService.activeBoard;

  currentIdx = this.boardDataService.currentIdx;

  constructor(
    private dialog: MatDialog,
    private boardDataService: BoardDataService,
  ) {}

  ngOnInit(): void {
    this.boardDataService.getBoards();
  }

  selectBoard(boardIdx: number) {
    this.boardDataService.selectBoard(boardIdx);
  }

  toggleDarkMode(enableDarkMode: boolean) {
    this.darkMode = enableDarkMode;
  }

  openSideBar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  addBoard(): void {
  }

  editBoard(): void {
  }

  updateBoardAfterTaskReorder(updateBoard: Board) {
    this.boardDataService.editBoard(updateBoard);
  }

  deleteBoard(): void {
  }

  addTask(): void {
  }

  editTask(editTask: Task): void {
  }

  updateTask(updateTask: { task: Task; columnName: string }) {
    this.boardDataService.updateTask(updateTask);
  }

  deleteTask(deleteTask: Task): void {

  }
}
