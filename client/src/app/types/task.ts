import { UserForAuth } from "./user";

export interface Task {
createdAt: string|number|Date;
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    priority: string;
    userId: UserForAuth;

}