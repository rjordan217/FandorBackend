var reqFuncs = require('./requestFunctions.js');

function processData(type, $parent) {
  var $toExtract = $parent.find('input'),
      data = {};

  data[type] = {};
  $toPlay = $toExtract;
  $toExtract.each(function(idx,el) {
    data[type][el.name] = el.value;
  });

  return data;
}

function attachButtonCBs($button) {
  var $parent = $button.parent(),
      cb;
  switch ($button.attr('id')) {
    case 'login':
      cb = function() {
        var data = processData('user',$parent);
        if(data) reqFuncs.login(data);
      };
      break;
    case 'register':
      cb = function() {
        var data = processData('user',$parent);
        if(data) reqFuncs.createUser(data);
      };
      break;
    case 'rate':
      cb = function() {
        var ratingVal = $parent.find('input').val(),
            filmId = $parent.data('film_id');
        if(ratingVal && filmId) reqFuncs.createFilmRating(filmId,ratingVal);
      };
      break;
    case 'logout':
      cb = reqFuncs.logout;
      break;
    default:
      return;
  }
  $button.on('click',cb);
}

module.exports = function() {
  $('button').each(function(idx,el) {
    attachButtonCBs($(el));
  });
  $('.films .film').each(function(idx,el) {
    var $el = $(el);
    $el.on('click', function() {
      reqFuncs.fetchFilmByURL($el.data('url_slug'));
    });
  });
}
