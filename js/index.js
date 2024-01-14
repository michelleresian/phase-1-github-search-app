document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const searchInput = document.getElementById('searchInput').value;
    searchGitHubUsers(searchInput);
  });
  
  function searchGitHubUsers(username) {
    fetch(`https://api.github.com/search/users?q=${username}`)
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => console.error('Error searching GitHub users:', error));
  }
  
  function displayUsers(users) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous results
  
    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.classList.add('userCard');
      userCard.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="100">
        <h3>${user.login}</h3>
        <a href="${user.html_url}" target="_blank">View Profile</a>
      `;
      userCard.addEventListener('click', function () {
        getUserRepos(user.login);
      });
      searchResults.appendChild(userCard);
    });
  }
  
  function getUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        displayUserRepos(data);
      })
      .catch(error => console.error('Error fetching user repositories:', error));
  }
  
  function displayUserRepos(repos) {
    const userRepos = document.getElementById('userRepos');
    userRepos.innerHTML = ''; // Clear previous repositories
  
    const reposList = document.createElement('ul');
    repos.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.textContent = repo.name;
      reposList.appendChild(repoItem);
    });
    userRepos.appendChild(reposList);
  }