/*
    index.js
*/

$(document).ready( () => {

    "use strict";

    
    $("#githubSearchForm").on("submit", function () {
        
        var githubSearch = "https://api.github.com/search/repositories?q=";
        var searchPhrase = $("#searchPhrase").val();
        var language = $("#langChoice").val();
        var useStars = $("#useStars").val();

        resultList.text("Performing query...");

        if (searchPhrase) {

            githubSearch += encodeURIComponent(searchPhrase);

            if (language != "All") {
                githubSearch += "+language:" + encodeURIComponent(language);
            }
            if (useStars) {
                githubSearch += "&sort=stars";
            }

            // As of jQuery 3.0, the former ".success()" promisse 
            // was replaced by ".done()", and ".done()" was replaced by ".always()"
            $.get(githubSearch)
                .done(function (results) {
                    if (results.items.length == 0) {
                        resultList.text("There are no results for your search :/");
                    }
                    else {
                        displayResults(results.items);
                        console.log("Response received");
                    }
                })
                .fail(function (err) {
                    console.log("Failed to query GitHub");
                })
                .always(function () {
                    console.log("Query executed");
            });
    
        }
        else {
            resultList.text("You must provide a term or phrase to search for");
        }
        return false;
    });

    $("#githubSearchByUserForm").on("submit", function () {
       
        var githubSearch = "https://api.github.com/users/";
        var user = $("#user").val();

        resultList.text("Performing query...");

        if (user) {
            githubSearch += user + "/repos?sort=stars";

            $.get(githubSearch)
            .done(function (results) {
                    displayResultsByUser(results);
            })
            .fail(function (err) {
                console.log("Failed to query GitHub");
            })
            .always(function () {
                console.log("Query executed");
            })
        }
        else {
            resultList.text("You must provide a usermane");
        }
        return false;
    });

    var resultList = jQuery("#resultList");

    function displayResultsByUser(results) {
        resultList.empty();
        $.each(results, function (i, item) {
            var newResult = 
                $("<div class='result bordered-element'>" + 
                "<div class='title'><a href='"+ item.html_url +"' target='_blank'>" + item.name + "</a></div>" +
                "<div><em>" + item.description + "<em/></div>" +
                "<div>Language: " + item.language + "</div>" +
                "<div/>");

            newResult.hover(
                function () {
                    $(this).css("background-color", "lightgray");
            }, function (params) {
                    $(this).css("background-color", "white");
            });
    
            resultList.append(newResult);
        });
    }

    function displayResults(results) {
        resultList.empty();
        $.each(results, function (i, item) {
            var newResult = 
                $("<div class='result bordered-element'>" + 
                "<div class='title'><a href='"+ item.html_url +"' target='_blank'>" + item.full_name + "</a></div>" +
                "<div>Language: " + item.language + "</div>" +
                "<div>Stars: " + item.stargazers_count + "</div>" +
                "<div>Forks: " + item.forks_count + "</div>" +
                "<div/>");

            newResult.hover(
                function () {
                    $(this).css("background-color", "lightgray");
                },
                function () {
                    $(this).css("background-color", "white");
                }
            );

            resultList.append(newResult);
        })
    };

    var toggleButton = $("#toggleButton");
    toggleButton.on("click", function () {
        resultList.toggle(250);
        if (toggleButton.text() === "Hide") {
            toggleButton.text("Show");
        }
        else {
            toggleButton.text("Hide");
        }
    });

    var navbarItems = $("header nav li");
    $.each(navbarItems, function (i, item) {
        $(this).hover(
            function () {
                $(this).css("background-color", "#1eb500");
            },
            function () {
                $(this).css("background-color", "green");
            }
        )
    })

    var formButton = $(".formButton");
    formButton.hover(
        function () {
            $(this).css("background-color", "green");
        },
        function () {
            $(this).css("background-color", "rgb(0, 73, 0)");
        }
    );

    // var results = [
    //     {
    //         name: "jQuery",
    //         language: "JavaScript",
    //         protocol: "HTTP",
    //         score: 4.8,
    //         owner: {
    //             login: "gustavo",
    //             password: "12345"
    //         },
    //         showLog: function () {
    //             console.log("showLog output");
    //         }
    //     },
    //     {
    //         name: "jQuery UI",
    //         language: "JavaScript",
    //         protocol: "HTTP",
    //         score: 3.5,
    //         owner: {
    //             login: "pedro",
    //             password: "54321"
    //         },
    //         showLog: function () {
    //             console.log("showLog output");
    //         }
    //     },
    // ];

    /* var message = "Hello, JavaScript!";
    console.log(message);

    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "This is coming from JS!" */
    /*
    results[0].browser = "Edge Dev";
    console.log(results.length)
    console.log(results[0].browser);

    // Looping and conditionals
    for (var i = 0; i < results.length; i++) {
        if (results[i].score > 4) continue;
        console.log(results[i].name + " - " + results[i].score)

        console.log(results[i].owner.login);
    }

    // Types
    var aNumber = 4;
    var trueFalse = true;
    var Name = "Goose";
    var none;

    console.log("aNumber is " + typeof(aNumber));
    console.log("trueFalse is " + typeof(trueFalse));
    console.log("Name is " + typeof(Name));

    if (!none)
    console.log("none is undefined");

    if (aNumber === "4")
    console.log("aNumber is of type number and is equal to 4");
    else
    console.log("We don't know what aNumber is equal to, but its type is not string for sure");

    var displayOperationName = function (operationName) {
        console.log(operationName);
    }

    //undeclaredVariable = "This should not be legal";

    // Functions
    function Sum (operationName, callback) {
        displayOperationName(operationName);
        callback();
    }

    Sum("Sum called", function () {
        console.log("callback called --> " + (2 + 2));
    });

    */

})