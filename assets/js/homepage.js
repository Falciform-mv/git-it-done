var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");





var formSubmitHandler = function(event) {
    event.preventDefault();
    // gets value from input element
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        repoContainerEl.textContent = "";
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }
    
};

// Happens when search by topic, language buttons, are clicked
var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language");
    if (language) {
        getFeaturedRepos(language);

        // clears old content
        repoContainerEl.textContent = "";
    }
};

var getUserRepos = function(user) {
    // formats the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make request to the url
    fetch(apiUrl)
        .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        }
   })
   .catch(function(error) {
    alert("Unable to connect to Github");
   });
   
};

var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language);
                console.log(response);
            });
            
        } else {
            alert("error: " + response.statusText);
        }
    });
};


var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos for active user
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    // clears out old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    for (var i = 0; i <repos.length; i++) {
        // formats repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // creates a link for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // creates span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // creates status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // checks if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            status.length.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // appends container to dom
        repoContainerEl.appendChild(repoEl);
    }
    
}





// event listeners
userFormEl.addEventListener("submit", formSubmitHandler);

languageButtonsEl.addEventListener("click", buttonClickHandler);



