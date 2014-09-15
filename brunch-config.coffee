exports.config =
  modules:
    definition: false
    wrapper: false
  paths:
    public: 'public'
  files:
    javascripts:
      joinTo:
        'js/app.js': /app[\\/]app.js$/
        'js/port_admin.js': /^app[\\/]port_admin.js$/
        'js/port_partner.js': /^app[\\/]port_partner.js$/
        'js/other.js': /^app[\\/](?!(app.js|port_admin.js|port_partner.js))/
        'js/vendor.js': /^vendor/
      order:
        before:[
          'app/TEST_MODE.js'
          'app/app.js'
          'app/app_config.js'
          'app/enum.js'
          'app/app_run.js'
          'vendor/js/angular.js'
        ]

    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^vendor/
      order:
        before:[
          'vendor/css/bootstrap.css'
          'vendor/css/bootstrap-theme.css'
          'app/css/override.css'
          'app/css/base.css'
        ]
#    templates: # 压缩angularjs的模板文件--html文件 生成的module name与js文件名一致
#      joinTo:
#        'js/templates.js': /^app\/views\//

  plugins:
    autoReload:
      enabled:
        js: on
        css: on
        assets: on

    imageoptimizer:
      path: 'images' # should test for it
      smushit: no
      options:
        indentation:
          value: 4
          level: "warn"

        max_line_length:
          level: "ignore"

#    jshint:
#      pattern: /^app\/.*\.js$/
#      options:
#        bitwise: true
#        curly: true
#      globals:
#        jQuery: true
#      warnOnly: true

#    gzip:
#      paths:
#        javascript: 'js'
#        stylesheet: 'css'
#      removeOriginalFiles: false
#      renameGzipFilesToOriginalFiles: true

    uglify:
      mangle: false
      compress:
        global_defs:
          DEBUG: false

    cleancss:
      keepSpecialComments: 0
      removeEmpty: true

#    html2js: # for future 用于压缩angularjs的模板html到一个js文件中 需要在files中进行配置压缩文件路径
#      options: # other attr like 'target'(js or coffee)
#        base:'app/views' # 模板路径前缀
#        useStrict: true
#        indentString: '    ' # 缩进为4个空格
#        quoteChar: '\'' # 使用单引号
#        htmlmin: # html 压缩方式
#          collapseBooleanAttributes: true
#          collapseWhitespace: true
#          removeAttributeQuotes: true
#          removeComments: true
#          removeEmptyAttributes: true
#          removeRedundantAttributes: true
#          removeScriptTypeAttributes: true
#          removeStyleLinkTypeAttributes: true

# Enable or disable minifying of result js / css files.
  optimize:false # there is a bug in uglify-js-brunch but it is fixed in later version that not published yet