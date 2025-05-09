import { Component, computed, inject, model, ModelSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { FormsModule } from '@angular/forms';
import { Task } from './shared/interfaces/task';
import { FilterStatesPipe } from './shared/pipes/filter-states.pipe';
import { TodoListService } from './shared/services/todo-list.service';
import { firstValueFrom } from 'rxjs';
import { HeaderFilterComponent } from './components/header-filter/header-filter.component';

@Component({
  selector: 'app-todo-list',
  imports: [CardTaskComponent, FormsModule, FilterStatesPipe, HeaderFilterComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{
  public inputTask: ModelSignal<string> = model('');
  public state = model([true,false]);

  public todoListService: TodoListService = inject(TodoListService);
  public tasks = this.todoListService.tasks;

  ngOnInit(): void {
    this.todoListService.getAllTasks();
  }

  async addTask(): Promise<void>{
    if(this.inputTask()){
      await firstValueFrom(this.todoListService.createTask(this.inputTask()))
      this.inputTask.set("");
    };
  }

  async updateTask(updatedTask: Task): Promise<void>{
    await firstValueFrom(this.todoListService.updateTask(updatedTask));
  }

  async removeTask(id: string): Promise<void>{
    await firstValueFrom(this.todoListService.deleteTask(id));
  }
}
