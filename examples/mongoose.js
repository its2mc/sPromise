let sPromise = require("../index");
const assert = require("assert");

const uriFormat = require('mongodb-uri');

let mongoose = require('mongoose');
mongoose.Promise = sPromise;

function encodeMongoURI(urlString) {
    if (urlString) {
        let parsed = uriFormat.parse(urlString)
        urlString = uriFormat.format(parsed);
    }
    return urlString;
}




mongoose.connect(encodeMongoURI("mongodb://localhost:27017/test")); //start connection to db

mongoose.connection.on('error', function(err) { //if there is an error callback then quit
    console.log(err);
});

let sample;

mongoose.connection.once('open', function() {

    let Schema = mongoose.Schema;

    var testSchema = new Schema({
        a: String,
        b: String,
        date_created: {
            type: Date,
            default: Date.now
        },
        d: String
    }, { usePushEach: true });

    sample = mongoose.connection.model('test', testSchema);


    let silence = new sample({ a: "danda", b: "danka", d: "danka" });

    sample.count({ "a": "danda" }).exec().
    case(1, () => console.log("pass")).
    case(2, () => console.log("fail")).
    switch(() => { console.log(1) }).
    catch(err => console.log(err));

});