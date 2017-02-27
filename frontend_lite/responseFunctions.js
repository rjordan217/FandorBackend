var genTags = require('./tagGeneratorFunctions.js'),
    runCBs = require('./domCBs.js').runCBs;

module.exports = {
  setCurrentUser: function(data) {
    var $user = $('.user-container'),
        $update = genTags.user(data);
    if(!$user.length) {
      $user = $('<div class="user-container"></div>');
      $('#root').prepend($user);
    }
    $user.html($update);
    runCBs();
  },
  displayFilms: function(films) {
    var $films = $('.films');
    if(!$films.length) {
      $films = $('<div class="films"></div>');
      $('#root').append($films);
    }
    $films.html(films['films'].map(function(filmData){
      return genTags.film(filmData, false);
    }))
    $films.append(genTags.errors(films['errors']));
    runCBs();
  },
  displayFilmDetail: function(film) {
    var $film = genTags.film(film, true),
        $errs = genTags.errors(film['errors']),
        $hook = $('.film-detail');

    if(!$hook.length) {
      $hook = $('<div class="film-detail"></div>');
      $hook.data('film_id', film['id']);
      $('#root').append($hook);
    }
    $hook.html($film);
    $hook.append($errs);
    runCBs();
  },
  handleRating: function(rating) {
    var $parent = $('.film-detail .film');
    $parent.find('.rating').remove();

    var $errs = genTags.errors(rating['errors']),
        $rating;

    $rating = ($errs.length ? genTags.rating(false) : genTags.rating(true,rating['value']));
    $parent.append($rating);
    $parent.append($errs);
    runCBs();
  }
};
