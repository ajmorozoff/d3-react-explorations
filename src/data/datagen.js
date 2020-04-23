const moment = require('moment');

// these will eventually be user inputs
const START_DATE = new Date(2005, 6, 1);
const LENGTH = 27;
const DOB = moment("01-05-1990", "MM-DD-YYYY");;
const END_AGE = 51; //average

const CURRENT_DATE = moment();
const CURRENT_AGE = CURRENT_DATE.diff(DOB, 'years');
const EST_END_DATE = moment().add( (END_AGE - CURRENT_AGE), 'years');

let lastCalculated = moment(START_DATE);
let data = [];

while (lastCalculated.isBefore(CURRENT_DATE)) {
    let estimatedPast = {
        date: lastCalculated.format('MM DD YYYY'),
        status: 'done'
    };
    data.push(estimatedPast);
    lastCalculated.add(LENGTH, 'days');
};

while (lastCalculated.isBefore(EST_END_DATE)) {
    let estimatedFuture = {
        date: lastCalculated.format('MM DD YYYY'),
        status: 'staged'
    };
    data.push(estimatedFuture);
    lastCalculated.add(LENGTH, 'days');
}

console.log(data.length);