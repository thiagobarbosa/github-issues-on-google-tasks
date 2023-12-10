/**
 * Project: github-issues-on-google-tasks
 * File: Spreadsheet.js
 * Author: Thiago Barbosa 
 */

function getSheet() {
    return SpreadsheetApp.getActiveSheet()
  }
  
  function writeIssueOnSpreadsheet(issue, taskId){
    var sheet = getSheet();
    sheet.getRange(sheet.getLastRow()+1,1).setValue(issue.title);
    sheet.getRange(sheet.getLastRow(),2).setValue(issue.number);
    sheet.getRange(sheet.getLastRow(),3).setValue(issue.html_url);
    sheet.getRange(sheet.getLastRow(),4).setValue(issue.updated_at);
    sheet.getRange(sheet.getLastRow(),5).setValue(issue.state);
    sheet.getRange(sheet.getLastRow(),6).setValue(taskId);
  }
  
  function updateIssueOnSpreadsheet(issue){
    const issueRow = getIssueRowOnSpreadsheet(issue);
    if (issueRow != null){
      var sheet = getSheet();
      sheet.getRange(issueRow,1).setValue(issue.title);
      sheet.getRange(issueRow,3).setValue(issue.html_url);
      sheet.getRange(issueRow,4).setValue(issue.updated_at);
      sheet.getRange(issueRow,5).setValue(issue.state);
      return sheet.getRange(issueRow,6).getValue();
    }
  }
  
  function getIssueRowOnSpreadsheet(issue){
    var sheet = getSheet();
    var data = sheet.getDataRange().getValues();
    for(var i = 0; i < data.length; i++){
      if(data[i][1] == issue.number) {
        return i+1
      }
    }
    return null
  }
  
  function getIssueLastUpdateFromSpreadsheet(issue){
    var sheet = getSheet();
    var data = sheet.getDataRange().getValues();
    
    for(var i = 0; i<data.length; i++){
      if(data[i][1] == issue.number) {
        return data[i][3]
        }
    }
  return null
  }
  
  function getTaskRowOnSpreadsheet(task){
    var sheet = getSheet();
    var data = sheet.getDataRange().getValues();
    for(var i = 0; i < data.length; i++){
      if(data[i][5] == task.id) {
        var row = i+1
        Logger.log('Deleting Github Issue #' + data[i][1] +' from row ' + row)
        return i+1
      }
    }
    return null
  }
  
  function deleteTaskFromSpreadsheet(task){
    const taskRow = getTaskRowOnSpreadsheet(task);
    if (taskRow != null){
      var sheet = getSheet();
      sheet.deleteRow(taskRow)
    }
  }