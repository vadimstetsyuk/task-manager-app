import { CustomDate } from './CustomDate';

export class Task {
    title: string;
    start: CustomDate;
    duration: number;
    priority: number;
    description: string;

    constructor(title, start: CustomDate, duration, priority, description) {
        this.title = title;
        this.start = start;
        this.duration = duration;
        this.priority = priority;
        this.description = description;
    }
}