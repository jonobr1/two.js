/**
 * Grunt task for Two.js JavaScript Library.
 */
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**'],
      filter: 'isFile',
      options: {
        globals: {
          console: true
        }
      }
    },

    concat: {

      options: {
        separator: '\n'
      },

      dist: {
        src: [
          'license.txt',
          'src/two.js',
          'src/vector.js',
          'src/anchor.js',
          'src/matrix.js',
          'src/renderer/*.js',
          'src/shape.js',
          'src/path.js',
          'src/shapes/*.js',
          'src/text.js',
          'src/effects/*.js',
          'src/group.js'
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
      files: ['tests/noWebGL.html']
    }

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

  // Closure Compiler fallback
  grunt.registerTask('build-uglify', ['jshint' , 'concat', 'uglify']);

  // Headless testing
  grunt.registerTask('test', ['connect', 'qunit']);

};
