module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-symlink');

  // Default task.
  grunt.registerTask('default', ['jshint', 'build', 'karma:unit']);
  grunt.registerTask('build', ['clean', 'html2js', 'concat', 'copy:assets', 'copy:p5_translation', 'copy:p5_pages']);
  grunt.registerTask('release', ['clean', 'html2js', 'uglify', 'jshint', 'karma:unit', 'concat:index', 'copy:assets', 'copy:p5_translation', 'copy:p5_pages']);
  grunt.registerTask('test-watch', ['karma:watch']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function () {
    grunt.log.subhead(Date());
  });

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
        ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['src/app/**/*.js', 'src/common/**/*.js', ],
      jsTpl: ['<%= distdir %>/templates/**/*.js'],
      specs: ['test/**/*.spec.js'],
      scenarios: ['test/**/*.scenario.js'],
      html: ['src/index.html'],
      tpl: {
        app: ['src/app/**/*.tpl.html'],
        common: ['src/common/**/*.tpl.html']
      }
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [
          { dest: '<%= distdir %>', src: '**', expand: true, cwd: 'src/assets/' }

        ]
      },
      p5_translation: {
        files: [
          { dest: '<%= distdir %>/translation/locale', src: '**', expand: true, cwd: 'src/app/common/translation/locale/' }
        ]
      },
      p5_pages: {
        files: [
          { dest: '<%= distdir %>', src: '**', expand: true, cwd: 'src/app/pages/specials/' }
        ]
      }
    },
    symlink: {

      // The "build/target.txt" symlink will be created and linked to
      // "source/target.txt". It should appear like this in a file listing:
      // build/target.txt -> ../source/target.txt
      explicit: {
        src: '<%= distdir %>',
        dest: '../../../../../web/<%= pkg.name %>'
      },
    },
    karma: {
      options: { configFile: 'test/config/karma.config.js' },
      unit: { singleRun: true },
      coverage: {
        coverageReporter: {
          type: 'html',
          dir: 'coverage/'
        }
      }
    },
    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= distdir %>/templates/app.js',
        module: 'templates.app'
      },
      common: {
        options: {
          base: 'src/common'
        },
        src: ['<%= src.tpl.common %>'],
        dest: '<%= distdir %>/templates/common.js',
        module: 'templates.common'
      }
    },
    concat: {
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: ['<%= src.js %>', '<%= src.jsTpl %>'],
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      }, angular: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-translate/angular-translate.js',
          'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js'
        ],
        dest: '<%= distdir %>/angular.js'
      },
      alljs: {
        src: [
          'src/assets/js/jquery/jquery-2.1.1.min.js',
          'src/assets/js/plugins/jquery-ui/jquery-ui.js',
          'src/assets/js/bootstrap/bootstrap.min.js',
          'src/assets/js/plugins/metisMenu/jquery.metisMenu.js',
          'src/assets/js/plugins/slimscroll/jquery.slimscroll.min.js',
          'src/assets/js/plugins/flot/jquery.flot.js',
          'src/assets/js/plugins/flot/jquery.flot.tooltip.min.js',
          'src/assets/js/plugins/flot/jquery.flot.spline.js',
          'src/assets/js/plugins/flot/jquery.flot.resize.js',
          'src/assets/js/plugins/flot/jquery.flot.pie.js',
          'src/assets/js/plugins/flot/curvedLines.js',
          'src/assets/js/plugins/peity/jquery.peity.min.js',
          'src/assets/js/plugins/morris/raphael-2.1.0.min.js',
          'src/assets/js/plugins/morris/morris.js',
          'src/assets/js/plugins/iCheck/icheck.min.js',
          'src/assets/js/plugins/chosen/chosen.jquery.js',
          'src/assets/js/plugins/pace/pace.min.js',
          'src/assets/js/plugins/fancybox/jquery.fancybox.js',
          'src/assets/js/plugins/rickshaw/vendor/d3.v3.js',
          'src/assets/js/plugins/rickshaw/rickshaw.min.js',
          'src/assets/js/plugins/ionRangeSlider/ion.rangeSlider.min.js',
          'src/assets/js/plugins/nouslider/jquery.nouislider.min.js',
          'src/assets/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js',
          'src/assets/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
          'src/assets/js/plugins/jasny/jasny-bootstrap.min.js',
          'src/assets/js/plugins/switchery/switchery.js',
          'src/assets/js/plugins/dataTables/jquery.dataTables.js',
          'src/assets/js/plugins/dataTables/dataTables.bootstrap.js',
          'src/assets/js/plugins/easypieốnart/easypiechart.js',
          'src/assets/js/plugins/sparkline/jquery.sparkline.min.js',
          // 'src/assets/js/plugins/dropzone/dropzone.js',
          'bower_components/dropzone/downloads/dropzone.min.js',
          'src/assets/js/plugins/chartJs/Chart.min.js',
          'src/assets/js/plugins/jsKnob/jquery.knob.js',
          'src/assets/js/plugins/summernote/summernote.min.js"',
          'src/assets/js/plugins/fullcalendar/fullcalendar.min.js',
          'src/assets/js/inspinia.js',
          'src/assets/js/ui-router/angular-ui-router.min.js',
          'src/assets/js/bootstrap/ui-bootstrap-tpls-0.11.0.min.js',
          'src/assets/js/plugins/peity/angular-peity.js',
          'src/assets/js/plugins/easypiechart/angular.easypiechart.js',
          'src/assets/js/plugins/flot/angular-flot.js',
          'src/assets/js/plugins/rickshaw/angular-rickshaw.js',
          'src/assets/js/plugins/summernote/angular-summernote.min.js',
          'src/assets/js/bootstrap/angular-bootstrap-checkbox.js',
          'src/assets/js/plugins/jsKnob/angular-knob.js',
          'src/assets/js/plugins/switchery/ng-switchery.js',
          'src/assets/js/plugins/nouslider/angular-nouislider.js',
          'src/assets/js/plugins/datapicker/datePicker.js',
          'src/assets/js/plugins/chosen/chosen.js',
          'src/assets/js/plugins/dataTables/angular-datatables.min.js',
          'src/assets/js/plugins/fullcalendar/gcal.js',
          'src/assets/js/plugins/fullcalendar/calendar.js',
          'src/assets/js/plugins/chartJs/angles.js'
        ],
        dest: '<%= distdir %>/all.js'
      },
      allcss: {
        src: [
          'src/assets/css/bootstrap.min.css',
          'src/assets/font-awesome/css/font-awesome.css',
          'src/assets/css/plugins/fullcalendar/fullcalendar.css',
          'src/assets/css/plugins/morris/morris-0.4.3.min.css',
          'src/assets/css/plugins/summernote/summernote.css',
          'src/assets/css/plugins/summernote/summernote-bs3.css',
          'src/assets/css/plugins/steps/jquery.steps.css',
          'src/assets/js/plugins/fancybox/jquery.fancybox.css',
          'src/assets/css/plugins/dataTables/dataTables.bootstrap.css',
          'src/assets/css/plugins/iCheck/custom.css',
          'src/assets/css/plugins/chosen/chosen.css',
          'src/assets/css/plugins/dropzone/basic.css',
          'src/assets/css/plugins/dropzone/dropzone.css',
          'src/assets/css/plugins/switchery/switchery.css',
          'src/assets/css/plugins/nouslider/jquery.nouislider.css',
          'src/assets/css/plugins/datapicker/angular-datapicker.css',
          'src/assets/css/plugins/ionRangeSlider/ion.rangeSlider.css',
          'src/assets/css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css',
          'src/assets/css/animate.css',
          'src/assets/css/style.css',
          'src/assets/css/p5Style.css'
        ],
        dest: '<%= distdir %>/all.css'
      }
    },
    uglify: {
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: ['<%= src.js %>' , '<%= src.jsTpl %>'],
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      },
    },
    watch: {
      all: {
        files: ['<%= src.js %>', '<%= src.specs %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
        tasks: ['default', 'timestamp']
      },
      build: {
        files: ['<%= src.js %>', '<%= src.specs %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
        tasks: ['build', 'timestamp']
      }
    },
    jshint: {
      files: ['gruntFile.js', '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.specs %>', '<%= src.scenarios %>'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {}
      }
    }
  });

};
