'use strict'

var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var fs = require('fs');

var remoteConn = JSON.parse(fs.readFileSync('remote_conn.json', 'utf8'));

var config = {
    host: remoteConn.host,
    port: remoteConn.port,
    username: remoteConn.user,
    privateKey: fs.readFileSync('key','utf8')
};

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});


gulp.task('deploy', function () {
    return gulp
        .src(['dist/**/*'])
        .pipe(gulpSSH.dest(remoteConn.remoteDest))

;});


gulp.task('deploy2', function () {
    return gulpSSH
        .shell(['cd /var/www/  && chmod -R 755 ubpilots.fltprep.com'], {filePath: 'shell.log'})
        .pipe(gulp.dest('logs'))
});
