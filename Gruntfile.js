/* globals module */

module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      
      licenseFile : 'license.txt',

      depFiles : [
        'third-party/underscore.js',
        'third-party/events.js',
        'third-party/requestAnimationFrame.js'
      ],

      srcFiles : [
        'src/two.js',
        'src/vector.js',
        'src/matrix.js',
        'src/renderer/svg.js',
        'src/renderer/canvas.js',
        'src/renderer/webgl.js',
        'src/shape.js',
        'src/group.js',
        'src/polygon.js'
      ]
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', "tests/*.js"],
        tasks: ['jshint', 'concat']
      },
      thirdParty: {
        files: ['src/third-party/*'],
        tasks: ['copy']
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    uglify: {
      release: {
        src: ['build/two.js'],
        dest: 'build/two.min.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      nodeps : {
        src: [
          "<%= meta.licenseFile %>",
          "<%= meta.srcFiles %>"
        ],
        dest: 'build/two.nodeps.js'
      },
      dist: {
        src: [
          "<%= meta.licenseFile %>",
          "<%= meta.depFiles %>",
          "<%= meta.srcFiles %>"
        ],
        dest: 'build/<%= pkg.name %>'
      }
    },

    connect: {
      server: {
        options: {
          keepalive: true,
          port: 3000
        }
      }
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task
  grunt.registerTask('default', ['jshint' , 'concat', 'uglify']);

};