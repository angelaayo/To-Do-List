import { task } from "./task.js";

const projectArray = [];

export class projects {
  constructor(name) {
    this.name = name;
    this.taskList = [];
  }

  createTask(formData) {
    const newTask = new task(
      formData.title,
      formData.description,
      formData.date,
      formData.priority,
      formData.projectName,
      formData.completed,
      crypto.randomUUID(),
    );
    this.taskList.push(newTask);
    return newTask;
  }

  getTaskByID(taskID) {
    return this.taskList.find((task) => task.id == taskID);
  }
}

export function getProjectArray() {
  return [...projectArray];
}

export function addProjectToArray(project) {
  projectArray.push(project);
}

export function findProject(name) {
  return projectArray.find((p) => p.name == name);
}

export function retrieveTasks(projectName) {
  const project = projectArray.find((p) => p.name == projectName);
  if (project) {
    return project.taskList.filter((task) => !task.completed);
  }
  return [];
}

export function retrieveAll() {
  const allTasks = projectArray
    .flatMap((project) => project.taskList)
    .filter((task) => !task.completed);
  return allTasks;
}

export function retrieveCompleted(projectName) {
  const project = projectArray.find((p) => p.name == projectName);
  if (project) {
    return project.taskList.filter((task) => task.completed);
  }
  return [];
}

export function retrieveAllCompleted() {
  return projectArray
    .flatMap((project) => project.taskList)
    .filter((task) => task.completed);
}
