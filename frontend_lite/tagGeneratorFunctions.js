var displayForm = require('./displayForm.js');

function errors(errMsgArray) {
  if(errMsgArray) {
    return errMsgArray.map(function(errMsg) {
      return $('<p class="error-msg">Error: ' + errMsg + '</p>')
    });
  } else {
    return [];
  }
}

var tagGeneratorFunctions = {
  film: function(data,isDetail) {
    var $film = $('<div class="film"></div>'),
        $content = [$('<h3>' + data["title"] + ' (' + data["year"] + ')' + '</h3>')];

    if(isDetail) {
      $content.push($('<p>' + data["description"] + '</p><p>Average Rating: ' +
                data["average_rating"] + '</p>'));
    }
    $film.data('url_slug', data['url_slug']);
    $film.data('film_id',data['id']);
    $film.append($content);
    if(isDetail) displayForm($film, 'rating');
    return $film;
  },
  user: function(data) {
    var $user = $('<div class="user"></div>'),
        $content,
        $login,
        $register,
        $logout;
    if(data['username']) {
      $logout = $('<button id="logout">Logout</button>');
      $content = [$('<p>' + data['username'] + '</p>'), $logout];
    } else {
      $login = $('<button>Login</button>');
      $login.on('click', function() {
        $user.empty();
        displayForm($user,'login');
      });
      $register = $('<button>Register</button>');
      $register.on('click', function() {
        $user.empty();
        displayForm($user,'register');
      });
      $content = [$login, $register];
    }
    $user.append($content);
    $user.append(errors(data["errors"]));
    return $user;
  },
  rating: function(hasBeenRated, ratingVal) {
    var $rating = $('<p class="rating"></p>');
    if(hasBeenRated) {
      $rating.html(ratingVal)
    } else {
      displayForm($rating,'rating');
    }
    return $rating;
  },
  errors: errors
}

module.exports = tagGeneratorFunctions;
