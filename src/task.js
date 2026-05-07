export class task {
  constructor(title, description, dueDate, priority, project, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    this.projectName = project;
    this.id = id;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
