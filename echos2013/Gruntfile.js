module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  // paths
  var paths = {
    static_root:  'static/echos2013',
    css:          'static/echos2013/scss',
    css_out :     'static/echos2013/css'
  };

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir:  paths.css,
          cssDir:   paths.css_out,
          environment: 'production',
          outputStyle: 'compressed',
          assetCacheBuster: false,
          raw: "sass_options = {:cache => false}\n"
        }
      },
      dev: {
        options: {
          sassDir:  paths.css,
          cssDir:   paths.css_out,
          environment: 'development',
          outputStyle: 'nested',
          assetCacheBuster: false,
          raw: "sass_options = {:cache => false}\n"
        }
      }
    },

    copy: {
      css_libs: {
        expand: true,
        cwd: path.join(paths.css, 'lib'),
        src: '*',
        dest: path.join(paths.css_out, '/')
      }
    },

    watch: {
      css: {
        files: [path.join(paths.css, '**/*.scss')],
        tasks: ['compass:dev']
      }
    },

    clean: [
      paths.css_out
    ]
  });

  grunt.registerTask('dist',    [
    'compass:dist',
    'copy'
  ]);

  grunt.registerTask('dev',     [
    'compass:dev',
    'copy'
  ]);

  grunt.registerTask('all',     ['dev', 'dist']);
  grunt.registerTask('default', 'all');
};

