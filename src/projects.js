export class projects{
    constructor(name, taskArray){
        this.name = name;
        taskArray = [];
    }

    addTask(taskname){
        this.taskArray.push(taskname);
    }
}