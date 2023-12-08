/**
 * Project: github-issues-on-google-tasks
 * File: Main.js
 * Author: Thiago Barbosa 
 */

async function generateTasks(issueStatus = "open", issueSortDirection = "asc") {
  Logger.log("Starting task generation for Github Issues")
  
  let githubIssues = fetchGitHubIssues(issueStatus, issueSortDirection)
  let tasks = []

  for (let i in githubIssues) {
    let task = {
      title: githubIssues[i].title,
      notes: githubIssues[i].html_url,
      status: githubIssues[i].state == "closed" ? "completed" : "open"
    };

    let taskLastUpdate = getIssueLastUpdateFromSpreadsheet(githubIssues[i]);

    // create new task for opened issue
    if(taskLastUpdate == null && githubIssues[i].state == "open") {
      let taskId = await addTask(task)
      writeIssueOnSpreadsheet(githubIssues[i], taskId)
      tasks.push(task)
    }

    // updates existing task for modified issue
    if(taskLastUpdate != null && taskLastUpdate != githubIssues[i].updated_at){
      let taskId = updateIssueOnSpreadsheet(githubIssues[i])
      updateTask(task, taskId)
      tasks.push(task)
    }
  }
  Logger.log("Finished task generation for Github Issues");
  return tasks.length;
}

/**
 * Adds a task to a tasklist.
 * @param {string} taskListId The tasklist to add to.
 * @see https://developers.google.com/tasks/reference/rest/v1/tasks/insert
 */
async function addTask(task) {
  try {
      const newTask = Tasks.Tasks.insert(task, TASK_LIST_ID);
      // Print the Task ID of created task.
      Logger.log('Task "%s": "%s" was created.', newTask.id, newTask.title);
      return newTask.id
    } catch (err) {
    // TODO (developer) - Handle exception from Tasks.insert() of Task API
    Logger.log('Failed with an error %s', err.message);
  }
}

function updateTask(task, taskId){
  // for some reason the taskId needs to be in the payload when updating a task, even if the function asks for the id as a parameter
  const newTask = {
    id: taskId,
    title: task.title,
    notes: task.notes,
    status: task.status
  }
  Tasks.Tasks.update(newTask, TASK_LIST_ID, taskId);
  Logger.log('Task "%s": "%s" was updated.', newTask.id, newTask.title);
}  

async function deleteAllTasks() {
  try {
    // List the task items of specified tasklist using taskList id.
    const tasks = Tasks.Tasks.list(TASK_LIST_ID);
    // If tasks are available then print all task of given tasklists.
    if (!tasks.items) {
      Logger.log('No tasks found.');
      return;
    }
    // Print the task title and task id of specified tasklist.
    for (let i = 0; i < tasks.items.length; i++) {
      const task = tasks.items[i];
      Logger.log('Deleting task ID "%s": "%s".', task.id, task.title);
      deleteTaskFromSpreadsheet(task)
       Tasks.Tasks.remove(TASK_LIST_ID, task["id"])
    }
    
    return tasks.items;
  } catch (err) {
    // TODO (developer) - Handle exception from Task API
    Logger.log('Failed with an error %s', err.message);
  }
}
