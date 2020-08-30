import { Injectable } from '@nestjs/common';
import { Task } from '../../dist/tasks/tasks.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
    }
}
