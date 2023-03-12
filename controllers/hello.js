const { json } = require("express");

exports.getCurrentDate = () => {
    return ({result: "OK", data: new Date()});
};

exports.getPeople = (name) => {
    const people = [
        {name: "John"},
        {name: "Mary"}
    ]
    return ({result: "OK", data: people});
};

exports.getPeopleByName = (name) => {
    return ({result: "OK", data: {name: name}});
};