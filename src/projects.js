export class projects{
    constructor(name, taskList, completedTaskList){
        this.name = name;
        taskList = [];
        completedTaskList = [];
    }

    addTask(taskObject){
        this.taskList.push(taskObject);
    }
    addCompletedTask(taskObject){
        this.completedTaskList.push(taskObject);
    }
}