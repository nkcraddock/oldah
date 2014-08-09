'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-open');

	grunt.initConfig({
		'node-inspector': {
			dev: {
				options: {
					'web-port': 1338,
					'web-host': 'localhost',
					'save-live-edit': true,
					'hidden': ['node_modules']
				}
			}
		},
		open: {
			debug: {
				path: 'http://localhost:1338/debug?port=5858'
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					nodeArgs: ['--debug']
				}
			}
		},
		concurrent: {
			dev: [
				'nodemon',
				'jshint',
				'watch'
			],
			debug: [
				'nodemon',
				'jshint',
				'watch',
				'node-inspector',
				'open:debug'
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

	grunt.registerTask('default', ['concurrent:dev']);
	grunt.registerTask('debug', ['concurrent:debug']);

};