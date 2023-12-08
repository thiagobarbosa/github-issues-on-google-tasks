/**
 * Project: github-issues-on-google-tasks
 * File: Schedulers.js
 * Author: Thiago Barbosa 
 */

// Creates a scheduler for fetching the Github Issues and creating/updating their Google Tasks
async function scheduleEveryHour() {
    var ui = SpreadsheetApp.getUi();

    if(!isSetupCompleted()) {
        var response = ui.alert("You need to complete your setup before creating a scheduler. \n Do you want to setup now?", ui.ButtonSet.YES_NO)
        if(response == ui.Button.YES) {
            setup()
        }
        return
    }

    var response = ui.alert('Are you sure you want to schedule the script to run every hour? \n The tasks for your current opened issues will be created immediately.', ui.ButtonSet.YES_NO);

    if (response == ui.Button.YES) {
        // checks if there's already a scheduler created; if there's a least one, asks if the user wants to delete it
        var triggers = ScriptApp.getProjectTriggers();
        if (triggers.length > 0) {
            var response = ui.alert('There is already a scheduler created. Do you want to replace it?', ui.ButtonSet.YES_NO);
            if (response == ui.Button.YES) {
                // Deletes all schedulers
                for (var i = 0; i < triggers.length; i++) {
                    ScriptApp.deleteTrigger(triggers[i]);
                }
                // creates a new scheduler
                await generateTasks()
                Logger.info("Creating scheduler")
                ScriptApp.newTrigger('run').timeBased().everyHours(1).create();
                Logger.info("Scheduler created")
                ui.alert('Scheduler created successfully')
            } else {
                // Do nothing.
            }
        } else {
            await generateTasks()
            Logger.info("Creating scheduler")
            ScriptApp.newTrigger('run').timeBased().everyHours(1).create();
            Logger.info("Scheduler created")
            ui.alert('Scheduler created successfully')
        }
    }
}

async function scheduleEveryFourHours() {
    var ui = SpreadsheetApp.getUi();

    if(!isSetupCompleted()) {
        var response = ui.alert("You need to complete your setup before creating a scheduler. \n Do you want to setup now?", ui.ButtonSet.YES_NO)
        if(response == ui.Button.YES) {
            setup()
        }
        return
    }

    var response = ui.alert('Are you sure you want to schedule the script to run every 4 hours? \n The tasks for your current opened issues will be created immediately.', ui.ButtonSet.YES_NO);

    if (response == ui.Button.YES) {
        // checks if there's already a scheduler created; if there's a least one, asks if the user wants to delete it
        var triggers = ScriptApp.getProjectTriggers();
        if (triggers.length > 0) {
            var response = ui.alert('There is already a scheduler created. Do you want to replace it?', ui.ButtonSet.YES_NO);
            if (response == ui.Button.YES) {
                // Deletes all schedulers
                for (var i = 0; i < triggers.length; i++) {
                    ScriptApp.deleteTrigger(triggers[i]);
                }
                // creates a new scheduler
                await generateTasks()
                Logger.info("Creating scheduler")
                ScriptApp.newTrigger('run').timeBased().everyHours(4).create();
                Logger.info("Scheduler created")
                ui.alert('Scheduler created successfully')
            } else {
                // Do nothing.
            }
        } else {
            await generateTasks()
            Logger.info("Creating scheduler")
            ScriptApp.newTrigger('run').timeBased().everyHours(4).create();
            Logger.info("Scheduler created")
            ui.alert('Scheduler created successfully')
        }
    }
}


async function scheduleOnceADay() {
    var ui = SpreadsheetApp.getUi();

    if(!isSetupCompleted()) {
        var response = ui.alert("You need to complete your setup before creating a scheduler. \n Do you want to setup now?", ui.ButtonSet.YES_NO)
        if(response == ui.Button.YES) {
            setup()
        }
        return
    }

    var response = ui.alert('Are you sure you want to schedule the script to run once a day? \n The tasks for your current opened issues will be created immediately.', ui.ButtonSet.YES_NO);

    if (response == ui.Button.YES) {
        // checks if there's already a scheduler created; if there's a least one, asks if the user wants to delete it
        var triggers = ScriptApp.getProjectTriggers();
        if (triggers.length > 0) {
            var response = ui.alert('There is already a scheduler created. Do you want to replace it?', ui.ButtonSet.YES_NO);
            if (response == ui.Button.YES) {
                // Deletes all schedulers
                for (var i = 0; i < triggers.length; i++) {
                    ScriptApp.deleteTrigger(triggers[i]);
                }
                // creates a new scheduler
                await generateTasks()
                Logger.info("Creating scheduler")
                ScriptApp.newTrigger('run').timeBased().everyDays(1).create()
                Logger.info("Scheduler created")
                ui.alert('Scheduler created successfully')
            } else {
                // Do nothing.
            }
        } else {
            await generateTasks()
            Logger.info("Creating scheduler")
            ScriptApp.newTrigger('run').timeBased().everyDays(1).create()
            Logger.info("Scheduler created")
            ui.alert('Scheduler created successfully')
        }
    }
}

function removeAllSchedulers() {
  var ui = SpreadsheetApp.getUi();
    var response = ui.alert('Are you sure you want to remove all existing schedulers?', ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES) {
        // Deletes all schedulers
        var triggers = ScriptApp.getProjectTriggers();
        for (var i = 0; i < triggers.length; i++) {
            ScriptApp.deleteTrigger(triggers[i]);
        }
        ui.alert('Schedulers deleted successfully')
    } else {
        // Do nothing.
    }
}

// Creates a scheduler for fetching the Github Issues and creating/updating their Google Tasks
async function scheduler() {
    // generates tasks for opened issues
    await generateTasks()

    // Creates schedulers for all tasks
    Logger.info("Creating scheduler")
    ScriptApp.newTrigger('run').timeBased().everyHours(2).create();
    Logger.info("Scheduler created")
}

// Binds 'issueStatus' and 'issueSortDirection' so when the scheduler runs, issues with all status are fetched sort as desc.
// This is needed in order to set Google Tasks as completed when the issue is closed.
// But when running get generateTasks() manually only the opened issues are fetched and sorted by asc, so old issues appear first on the spreadsheet
async function run() {
    generateTasks.bind(null, "all", "desc")()
}