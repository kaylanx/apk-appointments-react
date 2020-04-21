
const convertStringToDate = (dateString) => {
    const parts = dateString.split('-');
    const date = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
    return date;
}

const getDisabledDates = (appointmentsJson) => {
    let disabledDates = [];
    appointmentsJson.forEach(function (appointment) {
        const date = convertStringToDate(appointment['date'])
        if (appointment['closed'] === true) {
            disabledDates.push(date);
        }
        // TODO: if all the appointments are taken up for that day disable it.
    });
    return disabledDates;
}

const getBookedHoursForDate = (date, appointmentsJson) => {
    let bookedTimes = [];
    appointmentsJson.forEach(function (appointment) {
        const appointmentDate = convertStringToDate(appointment['date']);
        if (date.getTime() === appointmentDate.getTime()) {
            if (appointment.hasOwnProperty('times')) {
                appointment['times'].forEach(function (time) {
                    bookedTimes.push(time);
                });
            }
        }
    });
    return bookedTimes;
}

jQuery(function () {
    // alert(JSON.stringify(appointmentsJson));

    var datePickerId = "#datepicker";
    var timePickerId = "#timepicker";
    /*
      MON, TUES, WED, SATURDAY 10-4
      Evenings / Sundays - By request - £20 deductable against any orders made.
    
      Bridal & Bridesmaids Full Appointments - 90min
      Bridesmaids Full Appointments are Chargeable - £20 deductable against any orders made
      Accessory and Bridemaids browsing - 30min
     */

    /*
      [
        {"date":"2019-07-20","time":15,"closed":false},
        {"date":"2019-07-18","closed":true},
        {"date":"2019-07-19","closed":true}
      ]
    */
    const tomorrow = 1;
    jQuery(datePickerId).pickadate({
        disable: getDisabledDates(appointmentsJson),
        min: tomorrow,
        onSet: function (event) {
            jQuery(timePickerId).attr("disabled", false);
            jQuery(timePickerId).val('');

            jQuery(timePickerId).pickatime({
                interval: 60,
                clear: false,
                onOpen: function () {
                    const $input = jQuery(datePickerId).pickadate()
                    const picker = $input.pickadate('picker')
                    const selectedDate = convertStringToDate(picker.get('select', 'yyyy-mm-dd'));

                    const tenAM = [10, 00];
                    const fourPM = [16, 00];
                    const timePicker = this;
                    timePicker.set("min", tenAM);
                    timePicker.set("max", fourPM);
                    timePicker.set('enable', true); // re-enable all times, before we go disabling them all again later....
                    timePicker.set('disable', getBookedHoursForDate(selectedDate, appointmentsJson));
                }
            });
        }
    });

    jQuery(timePickerId).attr("disabled", true);

});