/**
 * Project: github-issues-on-google-tasks
 * File: Github.js
 * Author: Thiago Barbosa 
 */

function fetchGitHubIssues(issueStatus = "open", issueSortDirection = "asc") {
  Logger.log("Fetching Github Issues with status '" +issueStatus +"'")
  let issuesList = [];
  
  var githubApiEndpoint = `https://api.github.com/repos/${GITHUB_ORGANIZATION}/${GITHUB_REPOSITORY}/issues?assignee=${GITHUB_NAME}&state=${issueStatus}&&sort=updated&direction=${issueSortDirection}&per_page=100`;

  var options = {
    'method' : 'get',
    'headers': {
      'Authorization': 'token ' + GITHUB_TOKEN,
      'Accept': 'application/vnd.github.v3+json'
    },
    'muteHttpExceptions': true
  };

  var response = UrlFetchApp.fetch(githubApiEndpoint, options);
  var issues = JSON.parse(response.getContentText());

  for (let i = 0; i < issues.length; i++){
    let issue = {};
    issue.number = issues[i]["number"];
    issue.title = issues[i]["title"];
    issue.html_url = issues[i]["html_url"];
    issue.updated_at = issues[i]["updated_at"];
    issue.state = issues[i]["state"];
    issuesList.push(issue);
  }

   return issuesList;
  
}
