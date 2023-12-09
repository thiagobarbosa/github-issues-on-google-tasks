/**
 * Project: github-issues-on-google-tasks
 * File: Utils.js
 * Author: Thiago Barbosa 
 */

const GITHUB_TOKEN = getGithubKey();
const GITHUB_ORGANIZATION = getGithubOrganization();
const GITHUB_REPOSITORY = getGithubRepository();
const GITHUB_NAME = getGithubUsername();
const TASK_LIST_ID = getTaskListId();

function isSetupEmpty(){
  return getGithubKey() == null
    && getGithubOrganization() == null
    && getGithubRepository() == null
    && getGithubUsername() == null
    && getTaskListId() == null
}

function isSetupCompleted(){
  return getGithubKey() != null
    && getGithubOrganization() != null
    && getGithubRepository() != null
    && getGithubUsername() != null
    && getTaskListId() != null
}

function getAllTaskLists() {
    try {
        // Returns all the authenticated user's task lists.
        const taskLists = Tasks.Tasklists.list();
        // If taskLists are available then print all tasklists.
        if (!taskLists.items) {
            console.log('No task lists found.');
            return;
        }
        // Print the tasklist title and tasklist id.
        for (let i = 0; i < taskLists.items.length; i++) {
            const taskList = taskLists.items[i];
            console.log('Task list with title "%s" and ID "%s" was found.', taskList.title, taskList.id);
        }

        return listTasks;
    } catch (err) {
        console.log('Failed with an error %s ', err.message);
    }
}

function findTaskListId(taskListName){
    var taskLists = Tasks.Tasklists.list().getItems()
    for(var i = 0; i < taskLists.length; i++){
      if(taskLists[i].getTitle() == taskListName){
        return taskLists[i].getId()
      }
    }
    return null
  }

  function openUrl() {
    var html = HtmlService.createHtmlOutput("<script>window.open('https://github.com/thiagobarbosa/github-issues-on-google-tasks', '_blank');</script>")
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    SpreadsheetApp.getUi().showModalDialog(html, 'Opening Github...');
  }

