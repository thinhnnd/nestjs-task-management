import { TaskStatus } from '../task-status.enum';

export interface IUpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}