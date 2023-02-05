class Github {
  constructor() {
    this.client_id = '47b4241a739be23224d1';
    this.client_secret = '3107da0a31af36c0530b972eb924e7e46ae373f9';
    this.repo_count = 5;
    this.repos_sort = 'created:asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repo_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}