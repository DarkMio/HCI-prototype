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

            // subsribe to all link clicks and disable them (so we don't move somewhere else
            $(document).on('click', 'a', function(e) {
                e.preventDefault();
            });

            $("#start").click(function(e) {
                reset();
            });

            $("#logo").click(function(e) {
                reset();
            });
            
            $("#buttonLogin").click(function(e) {
                e.preventDefault();
                if(formValidateLogin($("#inputUser"), $("#inputPassword"))) {
                    _cont.loggedIn = true;
                    buildNavigation();
                    $("#siteTitle").text("Online Belegung");
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
            
            $("#buttonSoSe2016").click(function(e) {
                e.preventDefault();
                $("#mainMenu").hide();
                $("#plannerSoSe").show();
            });

            $("#buttonPlanner").click(function(e) {
                e.preventDefault();
                $("#mainMenu").hide();
                $("#plannerSoSe").show();
            });

            $("#buttonStudienDoku").click(function(e) {
                e.preventDefault();
                $("#overview").hide();
                $("#documentation").show();
            });


            var reset = function() {

                { // this is the block where we throw all dynamic structures in
                  // and disable everything in states we had before.
                    $("#mainMenu").show();
                    $("#plannerSoSe").hide();
                    $("#documentation").hide();

                    $("#userWarning").hide();
                    $("#passwordWarning").hide();

                    // eat the navigation
                }


                if(_cont.loggedIn) {
                    // if you're logged in, you see this page coming up.

                } else {
                    // and if you're not logged in, we present you this.
                    $("#menuItems").empty();

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

                var elements = [["Mein Konto", "account"], ["Belegung", "assignment"], ["Hilfe", "help"], ["Logout", "logout"]];
                var menu = $("#menuItems");

                for(var i = 0; i < elements.length; i++) {
                    var text = elements[i];

                    menu.append(
                        $("<li>").append(
                            $("<a>").attr('id', text[1]).attr('href', '').text(text[0])
                        )
                    )
                }

                // And now build all event listeners to the newly generated DOM objects.
                $("#logout").click(function(e) {
                    e.preventDefault();
                    _cont.loggedIn = false;
                    reset();
                });

                $("#assignment").click(function(e) {
                    e.preventDefault();
                    $("#mainMenu").hide();
                    $("#plannerSoSe").show();
                });

                _cont.elementNavigation = true;
            };
        };

        return HtmlController;

    })
);