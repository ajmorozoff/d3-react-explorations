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
    let estimated = {
        date: lastCalculated.format('MM DD YYYY'),
        state: 'passed'
    };
    data.push(estimated);
    lastCalculated.add(LENGTH, 'days');
};

