/**
 * Project: github-issues-on-google-tasks
 * File: Menus.js
 * Author: Thiago Barbosa 
 */

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    
    // add a custom menu to the spreadsheet
    var mainMenu = ui.createMenu('🤖 Github Issues');

    // menu for setting up environment variables
    var setupMenu = ui.createMenu('Setup')

    if(isSetupEmpty()) {
        setupMenu.addItem('Create setup', 'setup')
    }
    else {
        var addSeparator = false
        // Create 'Add' options first for the null properties
        if (getGithubKey() == null) {
            setupMenu.addItem('Add Github key', 'updateGithubKey');
            addSeparator = true
        }

        if (getGithubUsername() == null) {
            setupMenu.addItem('Add Github username', 'updateGithubUsername');
            addSeparator = true
        }

        if (getGithubOrganization() == null) {
            setupMenu.addItem('Add Github repository organization', 'updateGithubOrganization');
            addSeparator = true
        }

        if (getGithubRepository() == null) {
            setupMenu.addItem('Add Github repository', 'updateGithubRepository');
            addSeparator = true
        }

        if (getTaskListId() == null) {
            setupMenu.addItem('Add task list', 'updateTaskList');
            addSeparator = true
        }

        if (addSeparator) {
            setupMenu.addSeparator()
        }

        // Create 'Change' options for the already existing properties
        if (getGithubKey() != null) {
            setupMenu.addItem('Change Github key', 'updateGithubKey');
        }

        if (getGithubUsername() != null) {
            setupMenu.addItem('Change Github username', 'updateGithubUsername');
        }

        if (getGithubOrganization() != null) {
            setupMenu.addItem('Change Github repository organization', 'updateGithubOrganization');
        }

        if (getGithubRepository() != null) {
            setupMenu.addItem('Change Github repository', 'updateGithubRepository');
        }

        if (getTaskListId() != null) {
            setupMenu.addItem('Change task list', 'updateTaskList');
        }
    }

    mainMenu
        .addSubMenu(setupMenu)
        .addSeparator()
        .addItem('➕ Generate tasks', 'generateTasksController')
        .addSeparator()
        
        .addSubMenu(ui.createMenu('🗓 Schedule tasks')
            .addItem('Every hour', 'scheduleEveryHour')
            .addItem('Every 4 hours', 'scheduleEveryFourHours')
            .addItem('Once a day', 'scheduleOnceADay')
            .addSeparator()
            .addItem('Remove all schedulers', 'removeAllSchedulers')
        )
        
        .addSeparator()
        
        .addItem('❗ Delete all tasks', 'deleteAllTasksController')
        .addToUi();
}

function onEdit(e){
    onOpen();
  }

function setup(){
  var properties = PropertiesService.getScriptProperties();
  var ui = SpreadsheetApp.getUi();
  
  var githubKey = ui.prompt("1/5: Input your Github key", ui.ButtonSet.OK_CANCEL)
  if (githubKey.getSelectedButton() == ui.Button.CANCEL) return
  properties.setProperties({'githubKey':githubKey.getResponseText()})

  var githubUsername = ui.prompt("2/5: Input your Github user name", ui.ButtonSet.OK_CANCEL)
  if (githubUsername.getSelectedButton() == ui.Button.CANCEL) return
  properties.setProperties({'githubUsername':githubUsername.getResponseText()})

  var githubOrganization = ui.prompt("3/5: Input the organization name for your Github repository", ui.ButtonSet.OK_CANCEL)
  if (githubOrganization.getSelectedButton() == ui.Button.CANCEL) return
  properties.setProperties({'githubOrganization':githubOrganization.getResponseText()})

  var githubRepository = ui.prompt("4/5: Input your Github repository", ui.ButtonSet.OK_CANCEL)
  if (githubRepository.getSelectedButton() == ui.Button.CANCEL) return
  properties.setProperties({'githubRepository':githubRepository.getResponseText()})

  var taskListName = ui.prompt("5/5: Input the name of your task list", ui.ButtonSet.OK_CANCEL)
  if (taskListName.getSelectedButton() == ui.Button.CANCEL) return
  var taskListId = findTaskListId(taskListName.getResponseText())
  if(taskListId == null) {
      ui.alert("List '" +taskListName.getResponseText() +"' not found")
      return
  }
  properties.setProperties({'taskListId':taskListId})

  ui.alert("Setup completed successfully")
  onOpen();
}
