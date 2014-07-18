module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        js_src_path: "./",
        js_build_path: "./",

        // Grunt Tasks
        uglify: {
            options: {},
            js: {
                src: '<%= js_src_path %>GifLinks.js',
                dest: '<%= js_build_path %>GifLinks.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);
};
