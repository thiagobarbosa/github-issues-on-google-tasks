/**
 * Project: github-issues-on-google-tasks
 * File: Properties.js
 * Author: Thiago Barbosa 
 */

function getGithubKey(){
    return PropertiesService.getScriptProperties().getProperty('githubKey')
}

function getGithubOrganization(){
    return PropertiesService.getScriptProperties().getProperty('githubOrganization')
}

function getGithubRepository(){
    return PropertiesService.getScriptProperties().getProperty('githubRepository')
}

function getGithubUsername(){
    return PropertiesService.getScriptProperties().getProperty('githubUsername')
}

function getTaskListId(){
    return PropertiesService.getScriptProperties().getProperty('taskListId') ?? null
}

function updateGithubUsername() {
    var properties = PropertiesService.getScriptProperties();  
    var ui = SpreadsheetApp.getUi();
    var currentGithubUsername = getGithubUsername()
    var githubUsername = ui.prompt("Current Github username: " +currentGithubUsername +"\n Input your new Github username:", ui.ButtonSet.OK_CANCEL)
    if (githubUsername.getSelectedButton() == ui.Button.CANCEL) return
    properties.setProperties({'githubUsername':githubUsername.getResponseText()})
  }

function updateGithubKey() {
    var properties = PropertiesService.getScriptProperties();  
    var ui = SpreadsheetApp.getUi();
    var currentGithubKey = getGithubKey()
    var githubKey = ui.prompt("Current Github key: " +currentGithubKey.slice(0,7) +"***\n Input your new Github key:", ui.ButtonSet.OK_CANCEL)
    if (githubKey.getSelectedButton() == ui.Button.CANCEL) return
    properties.setProperties({'githubKey':githubKey.getResponseText()})
}

function updateGithubOrganization() {
    var properties = PropertiesService.getScriptProperties();  
    var ui = SpreadsheetApp.getUi();
    var currentGithubOrganization = getGithubOrganization()
    var githubOrganization = ui.prompt("Current Github organization: " +currentGithubOrganization +"\n Input your new Github organization:", ui.ButtonSet.OK_CANCEL)
    if (githubOrganization.getSelectedButton() == ui.Button.CANCEL) return
    properties.setProperties({'githubOrganization':githubOrganization.getResponseText()})
}

function updateGithubRepository() {
    var properties = PropertiesService.getScriptProperties();  
    var ui = SpreadsheetApp.getUi();
    var currentGithubRepository = getGithubRepository()
    var githubRepository = ui.prompt("Current Github repository: " +currentGithubRepository +"\n Input your new Github repository:", ui.ButtonSet.OK_CANCEL)
    if (githubRepository.getSelectedButton() == ui.Button.CANCEL) return
    properties.setProperties({'githubRepository':githubRepository.getResponseText()})
}

function updateTaskList() {
    var properties = PropertiesService.getScriptProperties();  
    var ui = SpreadsheetApp.getUi();
    var currentTaskListId = getTaskListId()
    var taskListName = ui.prompt("Current task list: " +currentTaskListId +"\n Input the name of your new task list", ui.ButtonSet.OK_CANCEL)

    if (taskListName.getSelectedButton() == ui.Button.CANCEL) return

    var taskListId = findTaskListId(taskListName.getResponseText())

    if(taskListId == null) {
        ui.alert("List " +taskListName.getResponseText() +" not found")
        return;
    }
    properties.setProperties({'taskListId':taskListId})
}
