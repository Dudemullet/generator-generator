'use strict';
var util = require('util');
var yeoman = require('yeoman-generator')
var path = require('path')
var jsonFile = require('json-file-plus')

var SubGeneratorGenerator = module.exports = yeoman.generators.NamedBase.extend({
  init: function () {
    // yeoman.generators.NamedBase.apply(this, arguments);

    // if (!this.name) {
    //   this.log.error('You have to provide a name for the subgenerator.');
    //   process.exit(1);
    // }

    var done = this.async();
    var pkgPath = path.join(process.cwd(), 'package.json');
    
    jsonFile(pkgPath, function(err, file){
      if(err) {
        throw new Error(err.message + '\n\nCan\'t find package.json file to add subgenerator to. Make sure you\'re in the correct directory');
      }

      var files = file.get('files');
      files.push(this.name);
      file.set({'files':files});

      file.save(function(err){
        if(err) {
          throw new Error(err.message + '\n\nCould not write to package.json. Make sure you have the appropriate permissions');
        }
        done();
      });

    }.bind(this));

    this.generatorName = this.name;
    this.dirname = this._.dasherize(this.name);
  },

  template: function () {
    this.mkdir(this.dirname);
    this.mkdir(this.dirname + '/templates');
    this.copy('index.js', this.dirname + '/index.js');
    this.copy('templates/somefile.js', this.dirname + '/templates/somefile.js');
  }
});
