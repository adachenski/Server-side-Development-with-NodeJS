/**
 * Created by Administrator on 10/29/2016.
 */

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha');

gulp.task('default',function(){
   nodemon({
       script:'app.js',
       ext:'js',
       env:{
           PORT:8000
       },
       ignore:['./node_modules/**']
   })
       .on('restart',function(){
        console.log('Server Restarted');
    });
});

gulp.task('test',function(){
    gulp.src('tests/*.js',{read:false})
        .pipe(gulpMocha({reporter:'nyan'}))
});