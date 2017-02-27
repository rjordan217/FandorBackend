var runCBs = require('./domCBs').runCBs;

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
