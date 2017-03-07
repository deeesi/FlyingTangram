module.exports = function (grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		
		//löscht das dist Verzeichnis mit allen Ordnern
		clean: {
			dist: 'dist/*'
		},

		//Kopiert Ordner/Dateien aus dem src Verzeichnis in dist (der Ordner, der auf dem Webserver landet)
		copy: {
			html: {
				expand: true,
				cwd: 'src',
				src: ['*.html', '*.php'],
				dest: 'dist/'
			},
			fonts: {
				expand: true,
				cwd: 'src',
				src: 'fonts/**',
				dest: 'dist/'
			},
			css: {
				expand: true,
				cwd: 'src',
				src: 'css/**',
				dest: 'dist/'
			},
			images: {
				expand: true,
				cwd: 'src',
				src: ['images/**', '!images/sprite/**'],
				dest: 'dist/'
			},
			js: {
				expand: true,
				cwd: 'src',
				src: 'js/**',
				dest: 'dist/'
			}
		},

		// Kompiliert scss in css
		sass: {
			dev: {
				options: {
					sourceMap: true
				},
				files: {
					'src/css/main.css': 'src/scss/main.scss'
				}
			}
		},

		// Dateien ueberwachen
		watch: {
			sass: {
				files: [
					'src/scss/**/*.scss'
				],
				tasks: [
					'sass:dev',
					'copy:css',
					'notify:watch'
				],
				options: {
					atBegin: true
				}
			},

			js: {
				files: [
					'src/js/**/*.js'
				],
				tasks: [
					'copy:js'
				],
				options: {
					atBegin: true
				}
			},

			html: {
				files: [
					'src/**/*.html',
					'src/**/*.php'
				],
				tasks: [
					'copy:html'
				],
				options: {
					atBegin: true
				}	
			},

			images: {
				files: [
					'src/images/**/*.*'
				],
				tasks: [
					'copy:images'
				],
				options: {
					atBegin: true
				}	
			}
		},

		// Sprites erstellen
/*		sprite: {
			all: {
				src: 'src/images/sprite/*.png',
				retinaSrcFilter: ['src/images/sprite/*@2x.png'],
				dest: 'src/images/spritesheet.png',
				retinaDest: 'src/images/spritesheet.retina@2x.png',
				destCss: 'src/scss/_sprite.scss'
			}
		},*/

		// Melde dich mal
		notify: {
			build: {
				options: {
					message: 'Habe fertig gebaut!'
				}
			},
			watch: {
				options: {
					message: 'go!'
				}
			}
		}


	});

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.registerTask('default', ['clean', 'copy']);
	grunt.registerTask('build', ['sass', 'clean', 'copy', 'notify:build']);

}