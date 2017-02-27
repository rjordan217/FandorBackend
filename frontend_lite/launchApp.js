var reqFuncs = require('./requestFunctions.js'),
    tagGeneratorFunctions = require('./tagGeneratorFunctions.js'),
    addCB = require('./domCBs').addCB;

addCB(require('./attachListeners'));
reqFuncs.fetchCurrentUser();
reqFuncs.fetchFilms();
