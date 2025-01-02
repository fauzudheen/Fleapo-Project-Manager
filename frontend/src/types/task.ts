export enum TaskStatus {
    Pending = "pending",
    InProgress = "in_progress",
    Completed = "completed"
}

export type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    created_at: string;
    updated_at: string;
    due_date: string;
    image_url: string;
}

export type TaskDto = Omit<Task, "id" | "created_at" | "updated_at">;

export interface TaskAnalytics {
    total_tasks: number;
    pending_tasks: number;
    in_progress_tasks: number;
    completed_tasks: number;
}
