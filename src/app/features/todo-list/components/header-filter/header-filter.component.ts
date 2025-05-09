import { Component, computed, input, InputSignal, model, ModelSignal, output, WritableSignal } from '@angular/core';
import { Task } from '../../shared/interfaces/task';

@Component({
  selector: 'app-header-filter',
  imports: [],
  templateUrl: './header-filter.component.html',
  styleUrl: './header-filter.component.scss'
})
export class HeaderFilterComponent {
  public tasks: InputSignal<Task[]> = input.required<Task[]>();
  public filterChange = output<boolean[]>();
  
  public pendingTasks = computed( () => {
    return this.tasks().filter(task => !task.completed).length
  })
}
