export class task{
    constructor(title, description, dueDate, priority, project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.project = project;
    }

    toggleComplete(){
        this.completed = !this.completed;
    }

}