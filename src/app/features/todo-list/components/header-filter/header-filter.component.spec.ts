import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFilterComponent } from './header-filter.component';
import { TaskDataBuilder } from '../../../../shared/mocks/task-mock';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderFilterComponent', () => {
  let component: HeaderFilterComponent;
  let fixture: ComponentFixture<HeaderFilterComponent>;

  const MOCK_TASKS= [
    new TaskDataBuilder().build(),
    new TaskDataBuilder().withId("2").withCompleted(true).build(),
    new TaskDataBuilder().withId("3").withCompleted(true).build(),
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFilterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tasks', MOCK_TASKS)
    fixture.detectChanges();
  });

  it('should have tasks loaded', () => {
    expect(component.tasks().length).toBe(MOCK_TASKS.length);
  });
  
  it('should show 3 tasks / 1 pending', () => {
    const span: DebugElement = fixture.debugElement.query(By.css("#counter-tasks"));
    expect(span.nativeElement.innerText).toEqual("3 task (1 pending)")
  })
});
