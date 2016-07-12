/*
 *
 * Module app: CG2 Aufgabe 2
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 */


/* 
 *  RequireJS alias/path configuration (http://requirejs.org/)
 */

requirejs.config({
    paths: {

        // jquery library
        "jquery": [
            // try content delivery network location first
            'http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
            //If the load via CDN fails, load locally
            'static/js/jquery'],
        "bootstrap" : "static/js/bootstrap",
        "htmlController": "controller/html_controller"
    },
    shim: {
        bootstrap: {deps: ['jquery']},
        htmlController: {deps: ['jquery']}
    }

});


/*
 * The function defined below is the "main" function,
 * it will be called once all prerequisites listed in the
 * define() statement are loaded.
 *
 */

/* requireJS module definition */
define(["jquery", "htmlController"],

    (function($, HtmlController) {

        "use strict";


        /*
         * main program, to be called once the document has loaded
         * and the DOM has been constructed
         *
         */

        $(document).ready( (function() {
            var cont = new HtmlController();
            // $("#siteTitle").text("Hello world!");


        })); // $(document).ready()

    })); // define module
        

