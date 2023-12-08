/**
 * Project: github-issues-on-google-tasks
 * File: Controllers.js
 * Author: Thiago Barbosa 
 */

async function generateTasksController() {
    var ui = SpreadsheetApp.getUi();

    if(!isSetupCompleted()) {
        var response = ui.alert("You need to complete your setup before generating tasks. \n Do you want to setup now?", ui.ButtonSet.YES_NO)
        if(response == ui.Button.YES) {
            setup()
        }
        return
    }
    
    var response = ui.alert('A Google Task will be generated for each opened Github Issue assined to you. \n Click "OK" to start.', ui.ButtonSet.OK_CANCEL);
    if (response == ui.Button.OK) {
        var numberOfTasksCreated = await generateTasks()
        if (numberOfTasksCreated > 0) {
            ui.alert("All done! \n" +numberOfTasksCreated +" new tasks were created. \n Open your Google Tasks to see them.")
        } else {
            ui.alert("All done! \n There were no new tasks to be created.")
        }
    } else {
        // do nothing
    }
}

async function deleteAllTasksController() {
    var ui = SpreadsheetApp.getUi();

    if(!isSetupCompleted()) {
        var response = ui.alert("You need to complete your setup before deleting tasks. \n Do you want to setup now?", ui.ButtonSet.YES_NO)
        if(response == ui.Button.YES) {
            setup()
        }
        return
    }

    var response = ui.alert('Are you sure? \n This action cannot be undone. Only your Google Tasks will be deleted.', ui.ButtonSet.YES_NO);
    if (response == ui.Button.YES) {
        await deleteAllTasks()
        ui.alert("Tasks deleted successfully.")
    } else {
        ui.alert("Wise...")
    }
}