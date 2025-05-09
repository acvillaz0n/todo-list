import { TaskDataBuilder } from '../../../../shared/mocks/task-mock';
import { FilterStatesPipe } from './filter-states.pipe';

describe('FilterStatesPipe', () => {
  let pipe: FilterStatesPipe;

  const MOCK_TASKS= [
    new TaskDataBuilder().build(),
    new TaskDataBuilder().withId("2").withCompleted(true).build(),
    new TaskDataBuilder().withId("3").withCompleted(true).build(),
  ]

  beforeEach(() => {
    pipe = new FilterStatesPipe();
  });
  
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all tasks if default states are used ([false, true])', () => {
    const result = pipe.transform(MOCK_TASKS);
    expect(result.length).toBe(3);
  });

  it('should filter only completed tasks when states = [true]', () => {
    const result = pipe.transform(MOCK_TASKS, [true]);
    expect(result.length).toBe(2);
    expect(result.every(task => task.completed)).toBeTrue();
  });

  it('should filter only incomplete tasks when states = [false]', () => {
    const result = pipe.transform(MOCK_TASKS, [false]);
    expect(result.length).toBe(1);
    expect(result.every(task => !task.completed)).toBeTrue();
  });

  it('should return empty array if no task matches the state', () => {
    const result = pipe.transform(MOCK_TASKS, []);
    expect(result).toEqual([]);
  });

  it('should handle empty input array', () => {
    const result = pipe.transform([], [true]);
    expect(result).toEqual([]);
  });

  it('should treat undefined task.completed as false', () => {
    const tasksWithUndefined = [...MOCK_TASKS, { id: '5', title: 'Unknown', completed: undefined as any }];
    const result = pipe.transform(tasksWithUndefined, [false]);
    expect(result.some(task => task.id === '5')).toBeTrue();
  });
});
