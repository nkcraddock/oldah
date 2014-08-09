'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');


	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'app.js'
			}
		},
		concurrent: {
			dev: [
				'nodemon',
				'jshint',
				'watch'
			],
			options: {
				logConcurrentOutput: true
			}
		},
		jshint: {
			server: [
				'**/*.js',
				'!node_modules/**/*.js'
			],
			options: {
				node: true,
				jshintrc: true
			}
		},
		watch: {
			files: '<%= jshint.server %>',
			tasks: [ 'jshint']
		}
	});

	grunt.registerTask('default', ['concurrent']);

};