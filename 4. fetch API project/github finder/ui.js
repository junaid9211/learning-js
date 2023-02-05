class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  // show profile in the ui
  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>

        <div class="col-md-9">
          <span class="badge badge-primary m-1"> Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary m-1"> Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success m-1"> Followers: ${user.followers}</span>
          <span class="badge badge-info m-1"> Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: ${user.company}</li>
            <li class="list-group-item">Website: ${user.blog}</li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Member Since: ${user.created_at.split('T')[0]}</li>
          </ul>
        </div>

      </div>
    </div>

    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"> </div>
    `
  }

  // show repos of a user in ui
  showRepo(repos) {
    let output = '';

    repos.forEach(function(repo) {
      output += `
      <div class="card card-body mb-2">
      <div class="row">
        <div class="col-md-6">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </div>
        <div class="col-md-6">
          <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
          <span class="badge badge-secondary">Watchers: ${repo.watchers}</span>
          <span class="badge badge-success">Followers: ${repo.followers}</span>
        </div>
      </div>
    </div>
      `
    })

    document.getElementById('repos').innerHTML = output;

  }

  // remove profile from ui
  clearProfile() {
    this.profile.innerHTML = '';
  }

  // show alert 
  showAlert(message, className) {

    // if there if already an alert then get rid of it
    this.clearAlert();

    // create a new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = className;
    alertDiv.textContent = message;

    // add alert in the ui
    const parent = document.querySelector('.searchContainer');
    const child = document.querySelector('.search');
    parent.insertBefore(alertDiv, child);

    // remove the alert after 3 seconds
    setTimeout(this.clearAlert, 3000)
  }

  clearAlert() {
    const alertDiv = document.querySelector('.alert');

    if (alertDiv) {
      alertDiv.remove();
    }
  }
}