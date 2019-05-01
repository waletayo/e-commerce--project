const mocha = require('mocha');
const assert = require('assert');

describe('register unit test file ', () => {
    context('/api/register', (err, response) => {
        const a=1;
        const b=2;
        const sum=a+b;
        err="error";
        response=sum;
        if (a===b){
            console.log("this is the ",response);
        }else{
            console.log(response);
        }

    });
});

