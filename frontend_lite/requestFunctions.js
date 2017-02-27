var resFuncs = require('./responseFunctions.js');

module.exports = {
  createUser: function(userData) {
    $.ajax({
      method: 'POST',
      data: userData,
      url: '/api/user',
      success: resFuncs.setCurrentUser
    })
  },
  fetchCurrentUser: function() {
    $.ajax({
      method: 'GET',
      url: '/api/user',
      success: resFuncs.setCurrentUser
    });
  },
  deleteUserAccount: function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/user',
      success: resFuncs.setCurrentUser
    });
  },
  login: function(userData) {
    $.ajax({
      method: 'POST',
      data: userData,
      url: '/api/session',
      success: resFuncs.setCurrentUser
    });
  },
  logout: function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/session',
      success: resFuncs.setCurrentUser
    });
  },
  fetchFilms: function() {
    $.ajax({
      method: 'GET',
      url: '/api/films',
      success: resFuncs.displayFilms
    })
  },
  fetchFilmByURL: function(url_slug) {
    $.ajax({
      method: 'GET',
      url: '/api/films/' + url_slug,
      success: resFuncs.displayFilmDetail
    })
  },
  createFilmRating: function(filmId, ratingValue) {
    $.ajax({
      method: 'POST',
      url: '/api/ratings',
      data: {rating: {film_id: filmId, value: ratingValue}},
      success: resFuncs.handleRating
    })
  },
  deleteFilmRating: function(ratingId) {
    $.ajax({
      method: 'DELETE',
      url: '/api/ratings/' + ratingId,
      success: resFuncs.handleRating
    })
  }
};
