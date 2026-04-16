import {task} from "./task.js";
export class projects{
    constructor(name){
        this.name = name;
        this.taskList = [];
        this.completedTaskList = [];
    }

    createTask(formData){
        const newTask = new task(formData.title, formData.description, formData.date, formData.priority, formData.project);
        this.taskList.push(newTask);
        return newTask;
    }
    
    addCompletedTask(taskObject){
        this.completedTaskList.push(taskObject);
    }
}