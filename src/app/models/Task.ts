import { CustomDate } from './CustomDate';

export class Task {
    id: number;
    title: string;
    start: Date;
    duration: number;
    priority: number;
    description: string;

    constructor(title: string, start: Date, duration: number, priority: number, description: string) {
        this.title = title;
        this.start = start;
        this.duration = duration;
        this.priority = priority;
        this.description = description;
    }
}