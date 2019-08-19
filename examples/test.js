let sPromise = require("../index");
const assert = require("assert");



(new sPromise((resolve, reject) => {
    let time = setTimeout(() => {
        resolve(3);
    }, 1000);
})).
case(1, () => {
    return "WRONG result is ==1";
}).
case(2, () => {
    return "WRONG result is ==2";
}).
strictCase('3', () => {
    return "WRONG result is ==='3'";
}).
case('3', () => {
    return "CORRECT result is =='3'";
}).
switch(res => {
    assert.strictEqual(res, "CORRECT result is =='3'");
}).
catch(err => {
    assert.fail(err);
});