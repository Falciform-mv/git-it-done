var getUserRepos = function(user) {
    // formats the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
   
 
});

    

};




getUserRepos("falciform-mv");

