# sPromise
Switchable promises. This module is an simple implementation of switch and case style statement on a promise chain.

The library will return the sPromise class.

To install simply ``` npm i @its2uraps/swpromise ```

Using it is simple, just use as follows: 

```
let sPromise = require('@its2uraps/swpromise');

(new sPromise((resolve, reject) => {
    let time = setTimeout(() => {
        resolve(3);
    }, 1000);
})).
case(1, () => {
    console.log("WRONG result is ==1");
}).
case(2, () => {
    console.log("WRONG result is ==2");
}).
strictCase('3', () => {
    console.log("WRONG result is ==='3'");
}).
case('3', () => {
    console.log("CORRECT result is =='3'");
}).
switch(res => {
    console.log(res); //Should be null
    console.log("Finished");
}).
catch(err => {
    console.log(err);
});

```

The sPromise class has two functions for loading optional statements, case takes in the expected result (does not take objects) as the first argument, and the second argument is the function that will be executed should the condition be met. The case function compares the result of the executable function with a '==' operator. For strict comparisons, '===' use strictCase. 

The switch function will receive the result of the executed case statement in the callback function.

# Things to note

- case functions need to be called first to be executed by the switch function
- If the executible result fulfills more than one case statement the first fulfilled case gets executed.

