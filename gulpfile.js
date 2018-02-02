'use strict';
var gulp = require('gulp');
var babel = require('gulp-babel');
var GulpSSH = require('gulp-ssh');
var fs = require('fs');
var remoteConn = require('secret');

var config = {
    host: remoteConn.ssh_host,
    port: remoteConn.ssh_port,
    username: remoteConn.ssh_user,
    privateKey: fs.readFileSync('key','utf8')
}

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});

gulp.task('deploy', function () {
    return gulp
        .src(['dist/**/*', 'package.json'])
        .pipe(gulpSSH.dest('app/dist'));
});

gulp.task('deploy2', function () {
    return gulpSSH
        .shell(['cd ~/  && chmod -R 700 app', 'cd ~/app && mv dist/package.json ./', 'npm install --production', 'pm2 restart server'], {filePath: 'shell.log'})
        .pipe(gulp.dest('logs'));
});

gulp.task('transpile', function () {
    return gulp.src('src/*')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});