/*
    index.js
*/

$(document).ready( () => {

    "use strict";

    var resultList = jQuery("#resultList");

    var toggleButton = $("#toggleButton");
    toggleButton.on("click", () => {
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

    var results = [
        {
            name: "jQuery",
            language: "JavaScript",
            protocol: "HTTP",
            score: 4.8,
            owner: {
                login: "gustavo",
                password: "12345"
            },
            showLog: function () {
                console.log("showLog output");
            }
        },
        {
            name: "jQuery UI",
            language: "JavaScript",
            protocol: "HTTP",
            score: 3.5,
            owner: {
                login: "pedro",
                password: "54321"
            },
            showLog: function () {
                console.log("showLog output");
            }
        },
    ];

    resultList.empty();
    $.each(results, (i, item) => {
        var newResult = 
            $("<div class='result bordered-element'>" + 
            "<div class='title'>" + item.name + "</div>" +
            "<div>Language: " + item.language + "</div>" +
            "<div>Owner: " + item.owner.login + "</div>" +
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