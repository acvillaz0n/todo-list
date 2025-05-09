import { TestBed } from '@angular/core/testing';
import  {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing'
import { TodoListService } from './todo-list.service';
import { environment } from '../../../../../environments/environment';
import { Task } from '../interfaces/task';
import { TaskDataBuilder } from '../../../../shared/mocks/task-mock';
import { provideHttpClient } from '@angular/common/http';

describe('TodoListService', () => {
  let service: TodoListService;
  let httpMock: HttpTestingController

  const baseURL = `${environment.api}tasks`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[],
      providers:[TodoListService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TodoListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks', () => {
    const mockTasks: Task[] = [
      new TaskDataBuilder().build(),
      new TaskDataBuilder().withTitle("Go to the super").withCompleted(true).build()
    ]

    service.getAllTasks().then((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(baseURL);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
  
  it('should create a new task', () => {
    const mockTask: Task = 
      new TaskDataBuilder().withTitle("Go to the super").withCompleted(false).build();
    
    service.createTask(mockTask.title).subscribe(task => {
      expect(task).toBe(mockTask);
      expect(service.tasks().length).toEqual(1);
    });

    const req = httpMock.expectOne(baseURL);
    expect(req.request.method).toBe('POST');
    req.flush(mockTask);
  });
  
  it('should update a task by id', () => {
    const mockTask: Task = 
      new TaskDataBuilder().withTitle("Go to the mall").withCompleted(true).build();

    const mockUpdated: Task = {...mockTask, title: "Go to the GYM"};

    service.tasks.set([mockTask])
    
    service.updateTask(mockUpdated).subscribe(task => {
      expect(task).toBe(mockUpdated);
      expect(service.tasks().find(t => t.id === mockUpdated.id)?.title).toBe('Go to the GYM');
    });

    const req = httpMock.expectOne(`${baseURL}/${mockUpdated.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUpdated);
  });
  
  it('should delete a task by id', () => {
    const mockDelete = new TaskDataBuilder().withId("2").withTitle("Go to the gym").withCompleted(false).build();
    service.tasks.set([
      new TaskDataBuilder().withId("1").withTitle("Go to the mall").withCompleted(true).build(),
      mockDelete,
      new TaskDataBuilder().withId("3").withTitle("Go to the school").withCompleted(true).build(),
    ])


    
    service.deleteTask(mockDelete.id).subscribe(task => {
      expect(task).toEqual(mockDelete)
      expect(service.tasks()).not.toContain(mockDelete);
    });

    const req = httpMock.expectOne(`${baseURL}/${mockDelete.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockDelete);
  });
});
