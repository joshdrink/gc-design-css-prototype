"use strict";

// Requirements ================================================================
const gulp = require('gulp');
const { series, parallel, src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const twig = require('gulp-twig');

// Tasks =======================================================================

    // Browser Sync
    function initBS(done) {
        browserSync.init({
            server: {
                baseDir: "docs"
            }
        });
        done();
    };

    // BrowserSync Reload
    function BSReload() {
        return src('docs/*.html')
        .pipe(browserSync.reload({
            stream: true
        }));
    };

    // Compile Twig & Migrate HTML to Docs
    function compileTwig() {
        return src('app/index.twig')
        .pipe(twig())
        .pipe(dest('docs'));
    }
    // Build Site Assets
        // Migrate Sitewide CSS
        function migrateCSS() {
            return src('app/css/**/*.css')
            .pipe(dest('docs/css'));
        }
        // Migrate Sitewide JS
        function migrateJS() {
            return src('app/js/**/*.js')
            .pipe(dest('docs/js'));
        }
        // Migrate Sitewide Images
        function migrateImages() {
            return src('app/img/**/*')
            .pipe(dest('docs/img'));
        }
        // Migrate Components
        function migrateComponents() {
            return src('app/markup/**')
            .pipe(dest('docs/markup/'));
        }

    // Refresh Docs
    function cleanDocs() {
        return del(['docs/**/*', '!docs/CNAME']);
    }

    // Build Site
    const build = series(cleanDocs, compileTwig, migrateCSS, migrateJS, migrateImages, migrateComponents);

    // Watch
    function watchFiles() {
        watch('app/**/*', series(build, BSReload));
    }

    // Export
    exports.build = build;
    exports.watch = series(build, parallel(initBS, watchFiles));
    exports.default = series(build, parallel(initBS, watchFiles));