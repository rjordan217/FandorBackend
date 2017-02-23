resFuncs = require('responseFunctions');


module.exports = {
  fetchCurrentUser: function() {
    $.ajax({
      method: 'GET',
      url: '/api/user',
      success: function(user) {
        resFuncs.setCurrentUser(user);
      }
    });
  },
  fetchFilms: function() {
    $.ajax({
      method: 'GET',
      url: '/api/films',
      success: function(filmsData) {
        resFuncs.displayFilms(filmsData);
      }
    })
  },
  fetchFilmByURL: function(url_slug) {
    $.ajax({
      method: 'GET',
      url: '/api/films/' + url_slug,
      success: function(filmData) {
        resFuncs.displayFilmDetail(filmData);
      }
    })
  }
}
