import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoListService } from './shared/services/todo-list.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskDataBuilder } from '../../shared/mocks/task-mock';
import { Task } from './shared/interfaces/task';
import { of } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let todoListService: TodoListService;
  let fixture: ComponentFixture<TodoListComponent>;

  const MOCK_TASKS = [
    new TaskDataBuilder().build(),
    new TaskDataBuilder().withId("abbc").build(),
    new TaskDataBuilder().withId("acbc").build(),
    new TaskDataBuilder().withId("abcc").build(),
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [TodoListService, provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoListService = TestBed.inject(TodoListService);
    todoListService.tasks.set(MOCK_TASKS);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should add task and clear inputTask', async () => {
    const mockNewTask: Task = {id:'nbg', title: 'new Task', completed: false};
    component.inputTask.set(mockNewTask.title);
    
    const spyTodoListService = spyOn(todoListService,'createTask').and.callFake(() => {
      todoListService.tasks.update(task => [...task,mockNewTask]);
      return of(mockNewTask);
    });

    await component.addTask();
    expect(spyTodoListService).toHaveBeenCalledWith(mockNewTask.title);
    expect(component.inputTask()).toBe('');
    expect(component.tasks().length).toBe(MOCK_TASKS.length+1);
  });

  it('should not call createTask if inputTask is empty', async () => {
    component.inputTask.set('');
    const spyTodoListService = spyOn(todoListService,'createTask').and.returnValue(of(MOCK_TASKS[0]));
    await component.addTask();

    expect(spyTodoListService).not.toHaveBeenCalledWith('');
    expect(component.tasks().length).toBe(MOCK_TASKS.length)
  });

  it('should call updateTask with updated task', () => {
    const updatedTask: Task = { id: '1', title: 'Updated', completed: false };
    const spyTodoListService = spyOn(todoListService,'updateTask').and.callFake(() => {
      todoListService.tasks.update(tasks =>
        tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      )
      return of(updatedTask);
    });
    component.updateTask(updatedTask);

    expect(spyTodoListService).toHaveBeenCalledWith(updatedTask);
  });

  it('should call deleteTask with task id', async () => {
    const removeById = 'abbc';
    const spyTodoListService = spyOn(todoListService,'deleteTask').and.callFake(() => {
      todoListService.tasks.set(MOCK_TASKS.filter(task => task.id != removeById))
      return of(MOCK_TASKS[0]);
    });
    await component.removeTask(removeById);
    expect(spyTodoListService).toHaveBeenCalledWith(removeById);
    expect(component.tasks().length).toBe(MOCK_TASKS.length-1);
  });
});
