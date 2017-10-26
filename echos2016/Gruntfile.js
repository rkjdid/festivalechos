module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  // project global config
  var config = {
    project:      'echos',

    css_version: 11,
    js_version: 15
  };

  // paths
  var paths = {
    static_root:  'static/echos2016',
    font:         'static/echos2016/font',
    js:           'static/echos2016/js',
    css:          'static/echos2016/css',
    img:          'static/echos2016/img',

    css_out :     'static/echos2016/out/css',
    img_out:      'static/echos2016/out/img',
    out:          'static/echos2016/out'
  };

  var js_libs_dist = [
    path.join(paths.js, 'lib/jquery.min.js'),
    path.join(paths.js, 'lib/imagesloaded.pkgd.min.js'),
  ];

  var js_libs_dev = [
    path.join(paths.js, 'lib/jquery.js'),
    path.join(paths.js, 'lib/imagesloaded.pkgd.js'),
  ];

  var js_files = [
    path.join(paths.js, 'echos.js'),
  ];

  var css_files = [
    path.join(paths.css_out, 'echos.css')
  ];

  var js_dist_before_libs = path.join(paths.out, "src.js");
  var js_dist_path = path.join(paths.static_root, config.project + '.' + config.js_version + '.min.js');
  var js_dev_path = path.join(paths.static_root, config.project + '.' + config.js_version + '.dev.js');

  // externalize uglify parameters to allow dynamic dictionnary keys
  var uglify_parameters = {
    dist: {
      files: {}
    },
    lastpass: {
      compress: true,
      mangle: false,
      preserveComments: false,
      files : {}
    },
    distmobile: {
      files: {}
    }
  };

  uglify_parameters.dist.files[js_dist_before_libs] = js_files;
  uglify_parameters.lastpass.files[js_dist_path] = [js_dist_path];

  grunt.initConfig({
    jshint: {
      default: [
        path.join('!' + paths.js, 'lib'),
        path.join(paths.js, '*.js')
      ]
    },

    uglify: uglify_parameters,

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

    concat: {
      css: {
        src: css_files,
        dest: path.join(paths.static_root, config.project + "." + config.css_version + ".min.css")
      },
      jsdev: {
        options: {
          separator: '\n\n/*------------\n  GRUNT-CONCAT\n  ------------*/\n\n'
        },
        src: js_libs_dev.concat(js_files),
        dest: js_dev_path
      },
      jsdist: {
        options: {
          separator: '\n'
        },
        src: js_libs_dist.concat(js_dist_before_libs),
        dest: js_dist_path
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: paths.static_root,
        src: 'font/**',
        dest: path.join(paths.out, '/')
      },
      css_libs: {
        expand: true,
        cwd: paths.static_root,
        src: 'css/lib/**',
        dest: path.join(paths.out, '/')
      }
    },

    watch: {
      css: {
        files: [path.join(paths.css, '**/*.scss')],
        tasks: ['compass:dev', 'concat:css']
      },
      js: {
        files: [path.join(paths.js, '**/*.js')],
        tasks: ['jshint:default', 'concat:jsdev']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:default']
      }
    },

    tinypng: {
      options: {
        apiKey: "TIxzumNdITBFlR4fP_zjstqrmmDX2PWZ",
        summarize: true,
        showProgress: true,
        stopOnImageError: true,
        checkSigs: true,
        sigFile: path.join(paths.img, "md5.json")
      },
      png: {
        src: "*.png",
        expand: true,
        cwd: paths.img,
        dest: path.join(paths.img, "min"),
        ext: '.png'
      },
      jpg: {
        src: "*.jpg",
        expand: true,
        cwd: paths.img,
        dest: path.join(paths.img, "min"),
        ext: '.jpg'
      }
    },

    clean: [
      path.join(paths.out, "*.js"),
      path.join(paths.out, "*.css"),
      path.join(paths.out, "img"),
      path.join(paths.out, "css")
    ]
  });

  grunt.registerTask('dist',    [
    'jshint:default',
    'uglify:dist',
    'compass:dist',
    'concat:css', 'concat:jsdist',
    'uglify:lastpass',
    'copy'
  ]);

  grunt.registerTask('dev',     [
    'jshint:default',
    'compass:dev',
    'copy:css_libs',
    'concat:css', 'concat:jsdev',
    'copy'
  ]);

  grunt.registerTask('all',     ['dev', 'dist']);
  grunt.registerTask('default', 'all');
};

