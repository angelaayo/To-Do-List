export class task {
  constructor(title, description, dueDate, priority, project,completed = false, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.projectName = project;
    this.id = id;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
