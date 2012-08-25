/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {},
    lint: {
       files: ['grunt.js', '../js/lib/*.js', '../js/Ruoka/*.js']
    },
    concat: {
      dist: {
        src: ['../js/lib/jquery-1.8.0.min.js', '../js/lib/date.format.js', '../js/lib/transparency.min.js', '../js/Ruoka/*.js'],
        dest: '../js/main.js'
      }
    },
    min: {
      dist: {
        src: '<config:concat.dist.dest>',
        dest: '../js/main.min.js'
      }
    },
    cssmin: {
      dist: {
        src: '../css/styles.css',
        dest: '../css/styles.css'
      }
    },
    watch: {
      files: ['<config:lint.files>', '../sass/*.scss'],
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        jquery: true,
        devel: true,
        browser: true
      },
      globals: {}
    },
    uglify: {},
    compass: {
      dist: {
        forcecompile: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat min compass cssmin');

  // Compass tasks
  grunt.loadNpmTasks('grunt-compass');

  // CSS tasks
  grunt.loadNpmTasks('grunt-css');
};
