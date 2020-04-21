
/*
<div id="appointment-data" style="display: none;">
			04/04/2019 CLOSED;
05/04/2019 CLOSED;
06/04/2019 CLOSED;
03/04/2019 CLOSED;
06/04/2019 CLOSED;
07/04/2019 15;
07/04/2019 16;
16/06/2019 CLOSED;
17/06/2019 CLOSED;
18/06/2019 CLOSED;
19/06/2019 CLOSED;
20/06/2019 CLOSED;
21/06/2019 CLOSED;
22/06/2019 CLOSED;
23/06/2019 CLOSED;
09/08/2019 CLOSED;
10/08/2019 CLOSED;
11/08/2019 CLOSED;
12/08/2019 CLOSED;
13/08/2019 CLOSED;
14/08/2019 CLOSED;
15/08/2019 CLOSED;
16/08/2019 CLOSED;
17/08/2019 CLOSED;
18/08/2019 CLOSED;
19/08/2019 CLOSED;
30/10/2019 CLOSED;
31/10/2019 CLOSED;
01/11/2019 CLOSED;
02/11/2019 CLOSED;
24/12/2019 CLOSED;
25/12/2019 CLOSED;
26/12/2019 CLOSED;
27/12/2019 CLOSED;</div>
*/
var appointmentsAndClosures = null;
jQuery(function () {
    function convertToDate(str1) {
        var parts = str1.split('/');
        var date1 = new Date(parts[2], parts[1]-1, parts[0]);
        return date1;
    }
		
	jQuery('.no-of-bridesmaids').hide();
	jQuery('#accessories-disclaimer').hide();
	jQuery('#appointment-type').change(function() {

		if (jQuery('#appointment-type').val() === 'Bridesmaids') {
			jQuery('.no-of-bridesmaids').show('slow');
		}
		else {
			jQuery('.no-of-bridesmaids').hide('slow');
		}
		
		if (jQuery('#appointment-type').val() === 'Accessories') {
			jQuery('#accessories-disclaimer').show('slow');
		}
		else {
			jQuery('#accessories-disclaimer').hide('slow');
		}
	});

    //var time = new Date().getTime();
    
    var appointmentsData = jQuery("#appointment-data").text();
    
    //alert(appointmentsData);
    
    appointmentsData = appointmentsData.replace(/[\n]/g,'')
    
    var appointmentsToLoop = appointmentsData.split(';');
    var appointments = {};
    for (var i = 0; i < appointmentsToLoop.length; i++) {
        
        //alert(i + ' = ' + appointmentsToLoop[i]);
        
        if ( appointmentsToLoop[i] === '' ) {
            continue;
        }
        
        var appointment = appointmentsToLoop[i].split(" ");
        if (appointments[appointment[0]] != null && appointments[appointment[0]] !== undefined) {
            var times = appointments[appointment[0]];
            times.push(jQuery.trim(appointment[1]));
            appointments[appointment[0]] = times;
        }
        else {
            var tmpApmt = appointment[1];
            var times = [ jQuery.trim(tmpApmt) ];
            appointments[appointment[0]] = times;
        }
    }
    appointmentsAndClosures = appointments;
    //var datePickerId  = "#avia_appointment_date_1";
    //var weddingDateId = "#avia_wedding_date_1";
    //var timePickerId  = "#avia_appointment_time_1";
    
    var datePickerId  = "#datepicker";
	var weddingDateId = "#weddingdate";
	var timePickerId  = "#timepicker";
		
    // The index is day of week where sunday = 0, and number appointments available on that day.
    var openingHours = {
        //         S,M,T,W,T,F,S
        "winter": [0,0,5,5,5,5,6],
        "summer": [0,0,5,5,8,5,6],
    };
  
    var openHoursKey = "summer";

    var disabledDates = [];  // [6]; Block out fridays initially.
    
    jQuery.each(appointmentsAndClosures, function (key, val) {
        var date = convertToDate(key) 
        
        if (val[0] == 'CLOSED') {
            // alert('key='+key+'; date='+date);
            disabledDates.push(date);
            // alert('disabledDates='+disabledDates);
        }
        else {
            var day = date.getDay();
            var count = 0;
            jQuery.each(val, function () {
                count++;
            });                
            
            if ( count == openingHours[openHoursKey][day] ) {
                disabledDates.push(date);    
            }
        }  
    });
    
    jQuery(datePickerId).pickadate({
        disable:disabledDates,
        min:1, // 1 will be tomorrow
        onSet: function(event) {
            
            // var $input = jQuery(datePickerId).pickadate()
            // 
            // // Use the picker object directly.
            // var picker = $input.pickadate('picker')
            // console.log('Just set stuff:', event)
            // console.log('Just set stuff:', picker.get('select','dd/mm/yyyy'))
            
            jQuery(timePickerId).attr("disabled", false);
            jQuery(timePickerId).val('');
			
			
			var $input = null;
			var picker = null;
			var selectedDate = null;
			var day = -1;
			
			 // Sunday    - By request
			 // Monday    - By request
			 // Tuesday   - 2, 3, 4, 5, 6
			 // Wednesday - 2, 3, 4, 5, 6
			 // Thursday  - 2, 3, 4, 5, 6
			 // Friday    - 12, 1, 2, 3, 4
			 // Saturday  - 11, 12, 1, 2, 3, 4 
		 
		 
			 var sunday    = 0;
			 var monday    = 1;
			 var tuesday   = 2;
			 var wednesday = 3;
			 var thursday  = 4;
			 var friday    = 5;
			 var saturday  = 6;
			
            jQuery(timePickerId).pickatime({
                interval:60,
                clear:false,
				formatLabel: function(time) {
					
                  	if ( day == sunday || day == monday ) {
						return "A";
					}
					
			        return "h:i A";
				},
				formatSubmit: function(time) {
				
					/// Only AM and PM are available on Sunday and Mondays
					/// No specific times available..
                  	if ( day == sunday || day == monday ) {
						
						var time = jQuery(timePickerId).val();
						if ( time === "11:00 AM" ) { 
							return 'AM';
						}
						else if ( time === "12:00 PM" ) {
							return 'PM';
						}
					}
					
					return "h:i A";
				},
				onSet: function(event) {
					/// Only AM and PM are available on Sunday and Mondays
					/// No specific times available..
                  	if ( day == sunday || day == monday ) {
						
						var time = jQuery(timePickerId).val();
						if ( time === "11:00 AM" ) { 
							jQuery(timePickerId).val('AM');
						}
						else if ( time === "12:00 PM" ) {
							jQuery(timePickerId).val('PM');
						}
					}
				},
                onOpen: function() {
                     
                    $input = jQuery(datePickerId).pickadate()
					
                    picker = $input.pickadate('picker')
                    // console.log('Just set stuff:', picker.get('select','dd/mm/yyyy'))
                    
                    selectedDate = convertToDate(picker.get('select','dd/mm/yyyy'));
                    
                    day = selectedDate.getDay();
					
                     var min = [14,00];
                     var max = [18,00];
					 
					 /// Only AM and PM are available on Sunday and Mondays
					 /// No specific times available..
					 if ( day == monday || day == sunday ) {
						 min = [11,00]; // AM
                         max = [12,00];	// PM
					 }
					 
                     if ( day == friday ) {
						 min = [12,00];
                         max = [16,00];
                     }
					 
					 if ( day == thursday && openHoursKey === 'summer') {
					 	 max = [20,00];
					 }
					 
					 if ( day == saturday ) {
						 min = [11,00];
                         max = [16,00];
					 }
                     
                     this.set("min",min);
                     this.set("max",max);
                     
                     var timePicker = this;
                     timePicker.set('enable', true); // re-enable all times, before we go disabling them all again later....

                     
                     jQuery.each(appointmentsAndClosures, function (key, val) {
                         var dateKey = convertToDate(key);
                     
                         if (selectedDate.getTime() == dateKey.getTime() && val[0] != 'CLOSED') {
                             
                             var times = [];
                             jQuery.each(val, function (key, time) {
                                 // console.log(time);
                                 times.push(parseInt(time, 10));
                             });
                             
                             timePicker.set('disable', times);
                         }
                    });
                }
            });

        }

    });
    
    jQuery(weddingDateId).pickadate( {
        selectYears: true,
        selectMonths: true
    });

    jQuery(timePickerId).attr("disabled", true);

});