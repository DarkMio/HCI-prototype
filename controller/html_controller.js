/**
 * Created by Mio on 12-Jul-16.
 */
define(["jquery"],
    (function($) {
        "use strict";

        var HtmlController = function() {
            this.elementNavigation = false;
            this.loggedIn = false;
            var _cont = this;

            console.log("HTML Controller initialized.");
            // subsribe to all link clicks.
            $("a").on('click', function(e) {
                e.preventDefault();
                var href = $(this).attr('href');

                if(href == "start") {
                    reset();
                }
                console.log("RESOURCE: " + $(this).attr('href'))
            });
            
            $("#buttonLogin").click(function(e) {
                e.preventDefault();
                console.log("LOGIN VALIDATION HERE");
                if(formValidateLogin($("#inputUser"), $("#inputPassword"))) {
                    _cont.loggedIn = true;
                    buildNavigation();
                    $("#passwordWarning").hide();
                    $("#login").hide();
                    $("#overview").show();
                } else {
                    $("#passwordWarning").show();
                }
            });

            $("#buttonForgot").click(function(e) {
                
                e.preventDefault();
                $("#login").hide();
                $("#forgot").show();
            });

            $("#buttonForgotPassword").click(function(e) {
                e.preventDefault();
                $("#passwordWarning").hide();
                if(formValidateLogin($("#inputForgotEmail"), $("#inputForgotUser"))) {
                    $("#userWarning").hide();
                    $("#forgot").hide();
                    $("#emailSent").show();
                } else {
                    $("#userWarning").show();
                }
            });

            var reset = function() {

                { // this is the block where we throw all dynamic structures in
                  // and disable everything in states we had before.
                    $("#userWarning").hide();
                    $("#passwordWarning").hide();
                }


                if(_cont.loggedIn) {
                    // if you're logged in, you see this page coming up.

                } else {
                    // and if you're not logged in, we present you this.
                    $("#overview").hide();
                    $("#forgot").hide();
                    $("#emailSent").hide();

                    $("#login").show();
                }
            };
            
            var formValidateLogin = function(a, b) {
                console.log(b.val());
                a = a.val();
                b = b.val();
                return a && b;
            };
            
            var buildNavigation = function() {
                if(_cont.elementNavigation) {
                    return;
                }

                console.log("BUILDING NAVIGATION");
                var elements = ["Mein Konto", "Belegung", "Hilfe", "Logout"];
                var menu = $("#menuItems");

                for(var i = 0; i < elements.length; i++) {
                    var text = elements[i];

                    menu.append(
                        $("<li>").append(
                            $("<a>").attr('href', text).text(text)
                        )
                    )
                }

                _cont.elementNavigation = true;
            };
        };

        return HtmlController;

    })
);