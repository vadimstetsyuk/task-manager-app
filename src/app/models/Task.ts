export class Task {
    title: string;
    start: string;
    duration: number;
    priority: number;
    description: string;

    constructor() {
        this.title = '';
        this.start = '';
        this.duration = 0;
        this.priority = 1;
        this.description = '';
    }
}