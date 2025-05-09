import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTaskComponent } from './card-task.component';
import { TaskDataBuilder } from '../../../../shared/mocks/task-mock';
import { Task } from '../../shared/interfaces/task';

describe('CardTaskComponent', () => {
  let component: CardTaskComponent;
  let fixture: ComponentFixture<CardTaskComponent>;
  const MOCK_TASK: Task = new TaskDataBuilder().build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTaskComponent);
    component = fixture.componentInstance;
    component.task.set(MOCK_TASK);
    fixture.detectChanges();
  });

  it('should toogle editing mode', () => {
    const editingExpect = true;
    component.toggleEditMode();
    expect(component.editing()).toBe(editingExpect);

    component.toggleEditMode();
    expect(component.editing()).toBe(!editingExpect);
  });
  
  it('should emit a message to the parent when remove button is clicked', () => {
    const spyEmit = spyOn(component.remove,'emit').and.callFake(() => {})
    component.removeTask();
    expect(spyEmit).toHaveBeenCalled()
  });
  
  it('should toggle completed status on markAsCompleted', () => {
    expect(component.task().completed).toBeFalse();
    component.markAsCompleted();
    expect(component.task().completed).toBeTrue();
    component.markAsCompleted();
    expect(component.task().completed).toBeFalse();
  });

  it('should save title and toggle edit mode', () => {
    spyOn(component, 'toggleEditMode').and.callThrough();
    spyOn(component.task, 'update').and.callFake(() => {});
    component.saveTitle();
    expect(component.toggleEditMode).toHaveBeenCalled();
    expect(component.task.update).toHaveBeenCalled();
  });

  it('should return correct order for HostBinding based on completed status', () => {
    component.task.set({ ...MOCK_TASK, completed: false });
    expect(component.borde).toBe('0');
    component.task.set({ ...MOCK_TASK, completed: true });
    expect(component.borde).toBe('1');
  });


});
