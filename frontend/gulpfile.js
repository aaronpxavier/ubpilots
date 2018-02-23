'use strict'

var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var fs = require('fs');

var remoteConn = require('./remote-conn.json');

var config = {
    host: remoteConn.ssh_host,
    port: remoteConn.ssh_port,
    username: remoteConn.ssh_user,
    privateKey: fs.readFileSync('key','utf8')
};

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});


gulp.task('deploy', function () {
    return gulp
        .src(['dist/**/*'])
        .pipe(gulpSSH.dest(remoteConn.ssh_remote_dest))

        ;});


gulp.task('deploy2', function () {
    return gulpSSH
        .shell(['cd /var/www/  && chmod -R 755 ubpilots.fltprep.com'], {filePath: 'shell.log'})
        .pipe(gulp.dest('logs'))
});
