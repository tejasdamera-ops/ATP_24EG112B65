import { validateTitle, validatePriority, validateDueDate } from "./validator.js";

const tasks = [];

// 1. Add new task
function addTask(title, priority, dueDate) {

  if (
    validateTitle(title) &&  validatePriority(priority) && validateDueDate(dueDate)) {
    const task = {title,priority,dueDate};

    tasks.push(task);
    
  } else {
    return "Invalid task data!";
  }
}

// 2. Get all tasks
function getAllTasks() {
   console.log(tasks);
}

export default { addTask, getAllTasks };
