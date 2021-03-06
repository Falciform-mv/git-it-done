
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var queryString = document.location.search;
var repoNameEl = document.querySelector("#repo-name");


var getRepoName = function() {
    // grabs repo name from url query string
    var queryString = document.location.search
    var repoName = queryString.split("=")[1];
    if(repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    }
    // if no repo was given, redirect to homepage
    else {
        document.location.replace("./index.html");
    };
   
    
    

};
    


var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // makes get request to url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);

            // check if api has paginated issues
            if (response.headers.get("link")) {
                displayWarning(repo);
            }
            });
        }
        // if not successful, redirect to homepage
        else {
            document.location.replace("./index.html");
        }
    });
    

};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues";
        return;
    }
    for (var i = 0; i <issues.length; i++) {
        // creates link elment to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // creates span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // creates type element
        var typeEl = document.createElement("span");

        // checks if issue is an actual issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }

};


var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on Github";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // appends warning to container
    limitWarningEl.appendChild(linkEl);
};




getRepoName();