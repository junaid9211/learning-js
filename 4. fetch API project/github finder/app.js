const searchUser = document.getElementById('searchUser');
const github = new Github();
const ui = new UI();

searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value;

  if (userText !== '') {
    // get data and then console.log it
    github.getUser(userText)
    .then(data => {
      if (data.profile.message == 'Not Found') {
        // show alert saying that the user is not found
        ui.showAlert('User not found', 'alert alert-danger');
      } else {
        // show user 
        ui.showProfile(data.profile);
        ui.showRepo(data.repos)
        console.log(data);
      }
    })
    .catch(err => None);
  } else {
    // clear the profile when emptying the input field
    ui.clearProfile();
  }
})