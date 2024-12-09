import { Task } from "./task";

export interface UserForAuth {
    username: string;
    email: string;
    password: string;
    tasks: Task[];
    _id: string;
}