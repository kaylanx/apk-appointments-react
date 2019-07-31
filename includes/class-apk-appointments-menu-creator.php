<?php
/**
 * Created by IntelliJ IDEA.
 * User: andy
 * Date: 19/4/15
 * Time: 14:57
 * To change this template use File | Settings | File Templates.
 */
namespace APK\Appointments;

/**
 * Admin Options
 */
class MenuCreator {

    private $options_page;
    private $appointment_creator;

    /**
     * Start up
     */
    function __construct($options_page, $appointment_creator) {
        $this->options_page = $options_page;
        $this->appointment_creator = $appointment_creator;
    }

    /**
     * Add options page
     */
    public function plugin_menu() {

       	$hook = add_menu_page(
			'APK Shop Appointments',
			'Appointments',
			'manage_options',
            'apk-appointments',
            [ $this->options_page, 'apk_appointments_options_page' ],
            'dashicons-calendar-alt'
        );
        add_action( "load-$hook", [ $this->options_page, 'screen_option' ] );

        $edit = add_submenu_page( 
            'apk-appointments',
		    'Appointments',
            'Appointments',
            'edit_pages',
            'apk-appointments'
        );
	    add_action( "load-$edit", [ $this->options_page, 'screen_option' ] );

	    $addnew = add_submenu_page( 
            'apk-appointments',
		    'Add New Appointment',
            'Add New',
            'edit_pages',
            'apk-appointments-new',
            [ $this->appointment_creator, 'apk_add_appointment_form' ]
        );
	    add_action( "load-$addnew", [ $this->appointment_creator, 'screen_option' ] );
    }
}