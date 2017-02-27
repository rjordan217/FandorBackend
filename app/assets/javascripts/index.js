/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var resFuncs = __webpack_require__(3);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var displayForm = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var runCBs = __webpack_require__(5).runCBs;

module.exports = function($parent,type) {
  var $content = [],
      $button;
  switch (type) {
    case 'login':
      $content.push($('<label>Username: <input name="username" type="text"/></label>'));
      $content.push($('<label>Password: <input name="password" type="password" /></label>'));
      $button = $('<button id="login">Log In</button>');
      break;
    case 'register':
      $content.push($('<label>Username: <input name="username" type="text"/></label>'));
      $content.push($('<label>Password: <input name="password" type="password" /></label>'));
      $button = $('<button id="register">Register</button>');
      break;
    case 'rating':
      $content.push($('<label class="rating">Rating: <input type="number"/></label>'));
      $button = $('<button id="rate" class="rating">Rate Film</button>');
      break;
  }
  $parent.append($content);
  $parent.append($button);
  runCBs();
  return $parent;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var genTags = __webpack_require__(1),
    runCBs = __webpack_require__(5).runCBs;

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var reqFuncs = __webpack_require__(0),
    tagGeneratorFunctions = __webpack_require__(1),
    addCB = __webpack_require__(5).addCB;

addCB(__webpack_require__(6));
reqFuncs.fetchCurrentUser();
reqFuncs.fetchFilms();


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var cbs = [];

module.exports = {
  addCB: function(cb) {
    cbs.push(cb);
  },
  runCBs: function() {
    cbs.forEach(function(cb){cb();})
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var reqFuncs = __webpack_require__(0);

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


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map