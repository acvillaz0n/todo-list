import { Task } from "../../features/todo-list/shared/interfaces/task";

export class TaskDataBuilder{
    protected id = '1';
    protected title = 'Estaa es una tarea de prueba';
    protected completed = false;

    withId(id: string){
        this.id = id;
        return this;
    }

    withTitle(title: string){
        this.title = title;
        return this;
    }
   
    withCompleted(completed: boolean){
        this.completed = completed;
        return this;
    }

    build(): Task{
        return {
            id:this.id,
            title:this.title,
            completed:this.completed,
        }
    }
}