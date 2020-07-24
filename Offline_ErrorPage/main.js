document.getElementById("fetch_user").addEventListener("click", fetchGitData);

function fetchGitData(){
    let uid = document.getElementById('uname').value;
    fetch('https://api.github.com/users/' + uid)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById('profilecard').style.visibility = "visible";
            document.getElementById('gitName').innerHTML = data.name;
            document.getElementById('gitBio').innerHTML = data.bio;
            document.getElementById('gitLoc').innerHTML = data.location;
            document.getElementById('gitImg').src = data.avatar_url;
        })
        .catch((err) => {
            console.log('error ', err);
    });
    fetch('https://api.github.com/users/' + uid +'/repos')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementById('gitRepo').innerHTML = data.length + " Repos";
        })
        .catch((err) => {
            console.log('error ', err);
    });
}

