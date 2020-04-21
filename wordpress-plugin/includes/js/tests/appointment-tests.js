const appointmentsJson = [
    { "date": "2019-07-20", "times": 15, "closed": false },
    { "date": "2019-07-18", "closed": true },
    { "date": "2019-07-19", "closed": true }
];

const { test, module } = QUnit;

module("convertToDate");

test("When we get a string representing a date with single digit months and days then we get a Date object representing that date", function (assert) {
    let expected = new Date('September 01, 2018 00:00:00');
    let actual = convertStringToDate("2018-09-01");
    assert.deepEqual(actual, expected);
});

test("When we get a string representing a date with double digit months and days then we get a Date object representing that date", function (assert) {
    let expected = new Date('November 11, 1976 00:00:00');
    let actual = convertStringToDate("1976-11-11");
    assert.deepEqual(actual, expected);
});

module("getDisabledDates");

test("When there is only 1 date and it's disabled then we get that date", function (assert) {
    const expectedDisabledDate = new Date('December 05, 2015 00:00:00');
    const appointmentsJson = [{ "date": "2015-12-05", "times": [], "closed": true }];
    let disabledDates = getDisabledDates(appointmentsJson);
    assert.deepEqual(disabledDates[0], expectedDisabledDate);
});

test("When there is only 1 date and it's not disabled then we do not get that date", function (assert) {
    const appointmentsJson = [{ "date": "2015-12-05", "times": [15], "closed": false }];
    let disabledDates = getDisabledDates(appointmentsJson);
    assert.deepEqual(disabledDates, []);
});

test("When first 1 is disabled and second 1 isn't then we get the disabled one", function (assert) {
    const expectedDisabledDate = new Date('December 05, 2015 00:00:00');
    const appointmentsJson = [
        { "date": "2015-12-05", "times": [], "closed": true },
        { "date": "2003-06-12", "times": [15], "closed": false }];
    let disabledDates = getDisabledDates(appointmentsJson);
    assert.deepEqual(disabledDates[0], expectedDisabledDate);
});

test("When second 1 is disabled and first 1 isn't then we get the disabled one", function (assert) {
    const expectedDisabledDate = new Date('December 05, 2015 00:00:00');
    const appointmentsJson = [
        { "date": "2003-06-12", "times": [15], "closed": false },
        { "date": "2015-12-05", "times": [], "closed": true }];
    let disabledDates = getDisabledDates(appointmentsJson);
    assert.deepEqual(disabledDates[0], expectedDisabledDate);
});

module("getBookedTimesForDate");

test("When there are no times booked for a date then return empty array", function (assert) {
    const appointmentsJson = [{ "date": "2003-06-12", "times": [], "closed": true }];
    let bookedHours = getBookedHoursForDate(new Date('June 12, 2003 00:00:00'), appointmentsJson);
    assert.deepEqual(bookedHours, []);
});

test("When the requested date is not present in the json then return empty array", function (assert) {
    const appointmentsJson = [{ "date": "2003-06-12", "times": [12], "closed": false }];
    let bookedHours = getBookedHoursForDate(new Date('December 05, 2015 00:00:00'), appointmentsJson);
    assert.deepEqual(bookedHours, []);
});

test("When there is 1 time booked for a date then return that time", function (assert) {
    const expectedBookedHour = 15;
    const appointmentsJson = [{ "date": "2003-06-12", "times": [15], "closed": false }];
    let bookedHours = getBookedHoursForDate(new Date('June 12, 2003 00:00:00'), appointmentsJson);
    assert.deepEqual(bookedHours[0], expectedBookedHour);
});

test("When there are 3 times booked for a date then return those times", function (assert) {
    const expectedBookedHours = [15, 16, 17];
    const appointmentsJson = [
        { "date": "2003-06-12", "times": [15, 16, 17], "closed": false }
    ];
    let bookedHours = getBookedHoursForDate(new Date('June 12, 2003 00:00:00'), appointmentsJson);
    assert.deepEqual(bookedHours, expectedBookedHours);
});

test("When there are 3 times booked for a date, but other dates also have bookings and closures then return those 3 times", function (assert) {
    const expectedBookedHours = [15, 16, 17];
    const appointmentsJson = [
        { "date": "2003-06-13", "times": [11], "closed": false },
        { "date": "2003-06-12", "times": [15, 16, 17], "closed": false },
        { "date": "2015-12-05", "times": [], "closed": true }
    ];
    let bookedHours = getBookedHoursForDate(new Date('June 12, 2003 00:00:00'), appointmentsJson);
    assert.deepEqual(bookedHours, expectedBookedHours);
});