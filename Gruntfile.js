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
        'src/anchor.js',
        'src/matrix.js',
        'src/renderer/svg.js',
        'src/renderer/canvas.js',
        'src/renderer/webgl.js',
        'src/shape.js',
        'src/polygon.js',
        'src/group.js'
      ]
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', "tests/*.js"],
        tasks: ['jshint', 'concat']
      }
    },

    jshint: {
      options: {
        laxbreak: true,
        undef: true,
        browser: true,
        '-W009': true,
        predef: [ "_", "Backbone", "Two", "requestAnimationFrame", "module", "define"]
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    concat: {
      options: {
        separator: '\n'
      },
      clean : {
        src: [
          "<%= meta.licenseFile %>",
          "<%= meta.srcFiles %>"
        ],
        dest: 'build/two.clean.js'
      },
      dist: {
        src: [
          '<%= meta.licenseFile %>',
          '<%= meta.depFiles %>',
          '<%= meta.srcFiles %>'
        ],
        dest: 'build/<%= pkg.name %>'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000
        }
      }
    },

    uglify: {
       release: {
         src: ['build/two.js'],
        dest: 'build/two.min.js'
       }
    },

    closureCompiler:  {

      options: {
        compilerFile: 'third-party/google_closure_compiler-r2388.jar',

        // set to true if you want to check if files were modified
        // before starting compilation (can save some time in large sourcebases)
        checkModified: true,

        // Set Closure Compiler Directives here
        compilerOpts: {
           language_in: 'ECMASCRIPT3'
        }
      },

      main: {
        src: 'build/two.js',
        dest: 'build/two.min.js'
      }
    },
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:3000/tests/noWebGL.html',
          ]
        }
      }
    },
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task
  grunt.registerTask('default', ['jshint' , 'concat', 'closureCompiler']);

  // Uglify fallback
  grunt.registerTask('build-uglify', ['jshint' , 'concat', 'uglify']);

  // Headless testing
  grunt.registerTask('test', ['connect', 'qunit']);
};
