import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, model, ModelSignal, output, OutputEmitterRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../shared/interfaces/task';

@Component({
  selector: 'app-card-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTaskComponent {
  public editing = signal(false);
  public task: ModelSignal<Task> = model.required<Task>();
  public remove: OutputEmitterRef<void> = output();

  @HostBinding('style.order')
  get borde() {
    return this.task().completed  ? '1' : '0';
  }

  toggleEditMode(): void{
    this.editing.update(mode => !mode)
  }

  removeTask(): void{
    this.remove.emit();
  }

  markAsCompleted(){
    this.task.update(task => ({...task, completed: !task.completed}))
  }

  saveTitle(): void{
    this.toggleEditMode();
    this.task.update(task => ({...task, title: task.title}))
  }
}
