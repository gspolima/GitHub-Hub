/*
    index.js
*/

$(document).ready( () => {
    'use strict';

    let resultList = jQuery('#resultList');

    $('#githubSearchForm').on('submit', () => {
        let githubSearch = 'https://api.github.com/search/repositories?q=';
        let searchPhrase = $('#searchPhrase').val();
        let language = $('#langChoice').val();

        resultList.text('Performing query...');

        if (searchPhrase) {
            githubSearch += encodeURIComponent(searchPhrase);

            if (language.toUpperCase() !== 'ALL')
                githubSearch += `+language:${encodeURIComponent(language)}`;

            // As of jQuery 3.0, the former '.success()' promisse 
            // was replaced by '.done()', and '.done()' was replaced by '.always()'
            $.get(githubSearch)
                .done(results => {
                    if (results.items.length === 0)
                        resultList.text('There are no results for your search :/');
                    else
                        displayResults(results.items);
                })
                .fail((error) => {
                    console.log('Failed to query GitHub', error);
                })
                .always(function () {
                    console.log('Query finished');
            });
        }
        else
            resultList.text('You must provide a term or phrase to search for');
        console.log(`URL --> ${githubSearch}`);

        return false;
    });

    $('#githubSearchByUserForm').on('submit', () => {
        let githubSearch = 'https://api.github.com/users/';
        let user = $('#user').val();

        resultList.text('Performing query...');

        if (user) {
            githubSearch += `${user}/repos?sort=stars`;

            $.get(githubSearch)
                .done(results => {
                    if (results.length === 0) {
                        resultList.text(`${user} has no public repositories or does not exist. Try another username.`);
                    }
                    else
                        displayResultsByUser(results);
            })
            .fail(error => {
                if (error.status === 404)
                    resultList.text('404 - User not found.');
                console.log('Failed to query GitHub', error);
            })
            .always(function () {
                console.log('Query finished');
            })
        }
        else
            resultList.text('You must provide a usermane');
        console.log(`URL --> ${githubSearch}`);

        return false;
    });

    function displayResultsByUser(results) {
        resultList.empty();
        $.each(results, (i, item) => {
            let newResult = 
                $(`<div class='result bordered-element'>` + 
                `<div class='title'><a href='${item.html_url}' target='_blank'>${item.name}</a></div>` +
                `<div>Language: ${(item.language ? item.language : 'No language specified')}</div>` +
                `<div>${(item.description ? item.description : 'No description provided')}</div>` +
                '<div/>');

            newResult.hover(
                function () {
                    $(this).css('background-color', 'lightgray');
                },
                function () {
                    $(this).css('background-color', 'white');
            });
    
            resultList.append(newResult);
        });
    }

    function displayResults(results) {
        resultList.empty();
        $.each(results, function (i, item) {
            let newResult = 
                $(`<div class='result bordered-element'>` + 
                `<div class='title'><a href='${item.html_url}' target='_blank'>${item.full_name}</a></div>` +
                `<div>Language: ${item.language ? item.language : 'No language specified'}</div>` +
                `<div>Stars: ${item.stargazers_count}</div>` +
                `<div>Forks: ${item.forks_count}</div>` +
                '<div/>');

            newResult.hover(
                function () {
                    $(this).css('background-color', 'lightgray');
                },
                function () {
                    $(this).css('background-color', 'white');
                }
            );

            resultList.append(newResult);
        })
    };

    let toggleButton = $('#toggleButton');
    toggleButton.on('click', () => {
        resultList.toggle(250);
        if (toggleButton.text() === 'Hide results')
            toggleButton.text('Show results');
        else
            toggleButton.text('Hide results');
    });

    let navbarItems = $('header nav li');
    $.each(navbarItems, function (i, item) {
        $(this).hover(
            () => {
                $(this).css('background-color', '#1eb500');
            },
            () => {
                $(this).css('background-color', 'green');
            }
        )
    })

    let formButton = $('.formButton');
    formButton.hover(
        () => {
            $(this).css('background-color', 'green');
        },
        () => {
            $(this).css('background-color', 'rgb(0, 73, 0)');
        }
    );




    // let results = [
    //     {
    //         name: 'jQuery',
    //         language: 'JavaScript',
    //         protocol: 'HTTP',
    //         score: 4.8,
    //         owner: {
    //             login: 'gustavo',
    //             password: '12345'
    //         },
    //         showLog: function () {
    //             console.log('showLog output');
    //         }
    //     },
    //     {
    //         name: 'jQuery UI',
    //         language: 'JavaScript',
    //         protocol: 'HTTP',
    //         score: 3.5,
    //         owner: {
    //             login: 'pedro',
    //             password: '54321'
    //         },
    //         showLog: function () {
    //             console.log('showLog output');
    //         }
    //     },
    // ];

    /* let message = 'Hello, JavaScript!';
    console.log(message);

    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'This is coming from JS!' */
    /*
    results[0].browser = 'Edge Dev';
    console.log(results.length)
    console.log(results[0].browser);

    // Looping and conditionals
    for (let i = 0; i < results.length; i++) {
        if (results[i].score > 4) continue;
        console.log(results[i].name + ' - ' + results[i].score)

        console.log(results[i].owner.login);
    }

    // Types
    let aNumber = 4;
    let trueFalse = true;
    let Name = 'Goose';
    let none;

    console.log('aNumber is ' + typeof(aNumber));
    console.log('trueFalse is ' + typeof(trueFalse));
    console.log('Name is ' + typeof(Name));

    if (!none)
    console.log('none is undefined');

    if (aNumber === '4')
    console.log('aNumber is of type number and is equal to 4');
    else
    console.log('We don't know what aNumber is equal to, but its type is not string for sure');

    let displayOperationName = function (operationName) {
        console.log(operationName);
    }

    //undeclaredletiable = 'This should not be legal';

    // Functions
    function Sum (operationName, callback) {
        displayOperationName(operationName);
        callback();
    }

    Sum('Sum called', function () {
        console.log('callback called --> ' + (2 + 2));
    });

    */

})
