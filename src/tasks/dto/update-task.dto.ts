import { TaskStatus } from '../tasks.model';

export interface IUpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}