export class projects{
    constructor(name, taskArray){
        this.name = name;
        taskArray = [];
    }

    addTask(taskObject){
        this.taskArray.push(taskObject);
    }
}