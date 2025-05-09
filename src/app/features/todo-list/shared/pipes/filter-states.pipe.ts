import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/task';

@Pipe({
  name: 'filterStates'
})
export class FilterStatesPipe implements PipeTransform {

  transform(tasks: Task[], states: boolean[] = [false,true]): Task[] {
    return tasks.filter(task => states.includes(task.completed || false))
  }

}
