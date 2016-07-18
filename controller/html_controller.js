/**
 * Created by Mio on 12-Jul-16.
 */
define(["jquery", "switch"],
    (function($, bSwitch) {
        "use strict";

        var HtmlController = function() {
            this.elementNavigation = false;
            this.loggedIn = false;
            this.academic = false;
            var _cont = this;

            // subsribe to all link clicks and disable them (so we don't move somewhere else
            $(document).on('click', 'a', function(e) {
                e.preventDefault();
            });

            $("#start").click(function(e) {
                reset();
            });

            $("#switch").bootstrapSwitch();

            $("#logo").click(function(e) {
                reset();
            });
            
            $("#buttonLogin").click(function(e) {
                e.preventDefault();
                if(formValidateLogin($("#inputUser"), $("#inputPassword"))) {
                    _cont.loggedIn = true;
                    buildNavigation();
                    setTitle("");
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

            $("#buttonWiSe2016").click(function(e) {
                e.preventDefault();
                $("#mainMenu").hide();
                $("#plannerWiSe").show();
            });

            // This is an entire event listener batch for the plannerWiSe
            {
                // Lets build a fine set of listeners to each other

                var table = {
                    "#courseEff01": {enable: ["#courseEff02"]},
                    "#courseEff02": {enable: ["#courseEff01"]},
                    "#courseMME01": {enable: ["#courseMME02", "#courseMME03"]},
                    "#courseMME02": {enable: ["#courseMME01"], disable: ["#courseMME03"]},
                    "#courseMME03": {enable: ["#courseMME01"], disable: ["#courseMME02"]},
                    "#courseAngular01": {enable: ["#courseAngular02"]},
                    "#courseAngular02": {enable: ["#courseAngular01"]},
                    "#courseMP01": {enable: ["#courseMP02", "#courseMP03", "#courseMP04", "#courseMP05", "#courseMP06"]},
                    "#courseMP02": {enable: ["#courseMP01", "#courseMP02", "#courseMP03", "#courseMP04", "#courseMP05", "#courseMP06"]},
                    "#courseMP03": {enable: ["#courseMP01", "#courseMP02", "#courseMP03"], disable: ["#courseMP04", "#courseMP05", "#courseMP06"]},
                    "#courseMP04": {enable: ["#courseMP01", "#courseMP02", "#courseMP03"], disable: ["#courseMP03", "#courseMP05", "#courseMP06"]},
                    "#courseMP05": {enable: ["#courseMP01", "#courseMP02", "#courseMP03"], disable: ["#courseMP04", "#courseMP03", "#courseMP06"]},
                    "#courseMP06": {enable: ["#courseMP01", "#courseMP02", "#courseMP03"], disable: ["#courseMP04", "#courseMP05", "#courseMP03"]},
                    "#courseBWL01": {enable: ["#courseBWL02"]},
                    "#courseBWL02": {enable: ["#courseBWL01"]},
                    "#courseQPM01": {enable: ["#courseQPM02", "#courseQPM03"]},
                    "#courseQPM02": {enable: ["#courseQPM01"], disable: ["#courseQPM03"]},
                    "#courseQPM03": {enable: ["#courseQPM01"], disable: ["#courseQPM02"]},
                    "#courseIOS01": {enable: ["#courseIOS02"]},
                    "#courseIOS02": {enable: ["#courseIOS01"]},
                    "#courseMaya01": {enable: ["#courseMaya02"]},
                    "#courseMaya02": {enable: ["#courseMaya01"]},
                };

                $.each(table, function(index, value) {
                    $(index)
                        .click(function(e) {
                            $(this).addClass("panel-warning");
                        })
                        .hover(function(e) {
                            $(this).addClass("panel-success");
                            $.each(value.enable, function(key, val) {
                                $(val).addClass("panel-success");
                            });
                            $.each(value.disable, function(key, val) {
                                $(val).addClass("panel-danger");
                            })
                        }, function(e) {
                            $(this).removeClass("panel-success");
                            $.each(value.enable, function(key, val) {
                                $(val).removeClass("panel-success");
                            });
                            $.each(value.disable, function(key, val) {
                                $(val).removeClass("panel-danger")
                            })
                        })
                });

                $("#plannerReset").click(function(e) {
                    $('.panel-warning').removeClass('panel-warning');
                });

                $("#plannerBooking").click(function(e) {
                    $('.panel-warning').removeClass('panel-warning').addClass('panel-success');
                    setTimeout(function() {$("#plannerSearch").fadeOut(); $("#plannerButtons").fadeOut(); $("#plannerSuccess").fadeIn();}, 4500);
                })
            }


            var reset = function() {
                var overview = $("#overview").hide().show();
                var login = $("#login").show().hide();
                var academic = $("#academic").show().hide();

                { // this is the block where we throw all dynamic structures in
                    // and disable everything in states we had before.
                    $("#mainMenu").show();
                    $("#plannerSoSe").hide();
                    $("#documentation").hide();

                    $("#userWarning").hide();
                    $("#passwordWarning").hide();

                    $("#forgot").hide();
                    $("#emailSent").hide();
                    // eat the navigation
                    // $("#menuItems").empty();
                }

                if (_cont.loggedIn && !_cont.academic) {
                    // if you're logged in, you see this page coming up.
                    buildNavigation();

                    login.hide();
                    academic.hide();
                    overview.show();

                } else if (_cont.loggedIn && _cont.academic){
                    buildNavigation();
                    login.hide();
                    overview.hide();
                    academic.show();
                } else {
                    // and if you're not logged in, we present you this.
                    overview.hide();
                    login.show();
                }
            };
            
            var formValidateLogin = function(a, b) {
                console.log(b.val());
                a = a.val();
                b = b.val();
                return a && b;
            };

            var setTitle = function(text) {
                $("#siteTitle").text("Online Belegung" + text);
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

                menu.append(
                    $("<li>").append(
                        $("<div>")
                            .attr('class', 'pull-right')
                            .attr('style', 'margin-top: 2px')
                            .append(
                                $("<input>")
                                    .attr('id', 'switch')
                                    .attr('type', 'checkbox')
                                    .attr('data-on-text', 'Dozent')
                                    .attr('data-off-text', 'Student')
                                    .attr('data-on-color', 'success')
                                    .attr('data-off-color', 'danger')
                                    // .attr(_cont.academic ? 'checked' : '')
                            )
                    )
                );

                var a = '<div class="pull-right" style="margin-top: 2px">' +
                '<input id="switch" type="checkbox" name="my-checkbox" checked data-on-text="Student" data-on-color="success" data-off-text="Dozent" data-off-color="danger">'
                   + '</div>';

                // And now build all event listeners to the newly generated DOM objects.
                $("#account").click(function(e) {
                    e.preventDefault();
                    reset();
                });

                $("#logout").click(function(e) {
                    e.preventDefault();
                    _cont.loggedIn = false;
                    _cont.elementNavigation = false;
                    $("#menuItems").empty();
                    reset();
                });

                $("#assignment").click(function(e) {
                    e.preventDefault();
                    $("#mainMenu").hide();
                    $("#plannerSoSe").show();
                });

                $("#switch")
                    .on('switchChange.bootstrapSwitch', function(event, state) {
                        _cont.academic = state;
                        reset();
                    })
                    .bootstrapSwitch();

                _cont.elementNavigation = true;
            };
        };

        return HtmlController;

    })
);