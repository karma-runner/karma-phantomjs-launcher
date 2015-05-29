module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkgFile: 'package.json'

    'npm-contributors':
      options:
        commitMessage: 'chore: update contributors'

    bump:
      options:
        commitMessage: 'chore: release v%VERSION%'
        pushTo: 'upstream'

    'auto-release':
      options:
        checkTravisBuild: false

    karma:
      all:
        configFile: 'karma.conf.js'

  grunt.loadNpmTasks 'grunt-npm'
  grunt.loadNpmTasks 'grunt-bump'
  grunt.loadNpmTasks 'grunt-auto-release'
  grunt.loadNpmTasks 'grunt-conventional-changelog'
  grunt.loadNpmTasks 'grunt-karma'

  grunt.registerTask 'test', ['karma']
  grunt.registerTask 'default', ['test']


  grunt.registerTask 'release', 'Bump the version and publish to NPM.', (type) ->
    grunt.task.run [
      'npm-contributors',
      "bump-only:#{type||'patch'}",
      'changelog'
      'bump-commit',
      'npm-publish'
    ]
