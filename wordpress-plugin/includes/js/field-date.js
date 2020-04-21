jQuery(document).ready(function(){
	jQuery('.apk-appointment-date').datepicker({ 
		dateFormat: 'yy-mm-dd',
		numberOfMonths: 3,
      	showButtonPanel: true,
        changeMonth: true,
        changeYear: true 
	});	
});