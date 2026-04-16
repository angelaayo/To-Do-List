import {task} from "./task.js";

const projectArray = [];

export class projects{
    constructor(name){
        this.name = name;
        this.taskList = [];
        this.completedTaskList = [];
    }

    createTask(formData){
        const newTask = new task(formData.title, formData.description, formData.date, formData.priority, formData.projectName);
        this.taskList.push(newTask);
        return newTask;
    }
    
    addCompletedTask(taskObject){
        this.completedTaskList.push(taskObject);
    }
}

export function getProjectArray(){
    return [...projectArray];
}

export function addProjectToArray(name){
    projectArray.push(new projects(name))
}

export function findProject(name){
    return projectArray.find(p=> p.name == name);
}