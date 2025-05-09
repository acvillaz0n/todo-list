import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Task } from '../interfaces/task';
import { firstValueFrom, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  public tasks: WritableSignal<Task[]> = signal([]);

  constructor(private http:  HttpClient) { }

  async getAllTasks(): Promise<Task[]>{
    const tasks = await firstValueFrom(this.http.get<Task[]>(`${environment.api}tasks`));
    this.tasks.set(tasks);
    return tasks;
  }

  createTask(taskTitle: string): Observable<Task>{
    type TaskWithoutId = Omit<Task, 'id'>;
    const task: TaskWithoutId = {
      title: taskTitle,
      completed: false
    }
    return this.http.post<Task>(`${environment.api}tasks`, task).pipe(
      tap(
        (newTask) =>  {
          this.tasks.update(task => [...task,newTask])
        }
      )
    );

  }

  deleteTask(taskId: string): Observable<Task>{
    return this.http.delete<Task>(`${environment.api}tasks/${taskId}`).pipe(
      tap((taskDeleted) => 
        this.tasks.update(tasks =>
          tasks.filter(t => t.id !== taskDeleted.id)
        )
      )
    );

  }

  updateTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${environment.api}tasks/${task.id}`,task).pipe(
      tap((taskUpdated) => 
        this.tasks.update(tasks =>
          tasks.map(t => t.id === taskUpdated.id ? taskUpdated : t)
        )
      )
    );
  }
}
