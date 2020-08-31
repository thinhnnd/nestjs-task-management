import { TaskStatus } from '../task.model';

export interface IUpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}