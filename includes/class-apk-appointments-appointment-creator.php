<?php
/**
 * Created by IntelliJ IDEA.
 * User: andy
 * Date: 19/4/15
 * Time: 14:57
 * To change this template use File | Settings | File Templates.
 */

class APK_Appointments_Appointment_Creator {
	private $appointmentListTable;

    /**
     * Start up
     */
    function __construct() {

    }

    public function display() {
        add_action('admin_init', array($this, 'page_init'));
        // add_action('admin_menu', array($this, 'plugin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_date_picker'));   
    }

    /**
     * TODO, FIND OUT WHY WE NEED THIS SHIT?
     */
    public function screen_option() {
    }
    /**
     * Add options page
     */
    // public function plugin_menu() {
	// 	$hook = add_menu_page(
	// 		'APK Shop Appointments',
	// 		'Appointments',
	// 		'manage_options',
    //         'apk-appointments',
    //         '',
    //         'dashicons-calendar-alt'
    //     );
    //     add_action( "load-$hook", [ $this, 'screen_option' ] );

    //     $edit = add_submenu_page( 
    //         'apk-appointments',
	// 	    'Appointments',
    //         'Appointments',
    //         'edit_pages',
    //         'apk-appointments'
    //     );
	//     add_action( "load-$edit", [ $this, 'screen_option' ] );

	//     $addnew = add_submenu_page( 
    //         'apk-appointments',
	// 	    'Add New Appointment',
    //         'Add New',
    //         'edit_pages',
    //         'apk-appointments-new',
    //         [ $this, 'apk_add_appointment_form' ]
    //     );
	//     add_action( "load-$addnew", [ $this, 'screen_option' ] );
    // }

    function apk_add_appointment_form() {
        ?>
        <div class="wrap">
            <form method="post" action="options.php">
                <?php
                // This prints out all hidden setting fields...
                settings_fields('apk_appointments_option_group');
                do_settings_sections(basename(__FILE__));
                submit_button('Add appointment');
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register and add settings
     */
    public function page_init()
    {
        register_setting(
            'apk_appointments_option_group', // Option group
            APK_APPOINTMENTS_OPTION // Option name
        );

        add_settings_section(
            'appointments_section_id', // ID
            'New Appointment', // Title
            array($this, 'print_section_info'), // Callback
            basename(__FILE__) // Page
        );

        add_settings_field(
            'appointment_date', // ID
            'Appointment Date', // Title
            array($this, 'appointment_date_callback'), // callback
            basename(__FILE__), // Page
            'appointments_section_id' // Section
        );

        add_settings_field(
            'appointment_time', // ID
            'Appointment Time', // Title
            array($this, 'appointment_time_callback'), // callback
            basename(__FILE__), // Page
            'appointments_section_id' // Section
        );

        add_settings_field(
            'shop_closed', // ID
            'Shop Closed?', // Title
            array($this, 'shop_closed_callback'), // callback
            basename(__FILE__), // Page
            'appointments_section_id' // Section
        );

    }

    /**
     * Enqueue the date picker
     */
    public function enqueue_date_picker() {
        wp_enqueue_script(
            'field-date-js',
            plugins_url() . '/apk-appointments/js/field-date.js',
            array('jquery', 'jquery-ui-core', 'jquery-ui-datepicker'),
            time(),
            true
        );

        wp_enqueue_style('jquery-ui-datepicker');
        wp_enqueue_style('jquery-style', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/themes/smoothness/jquery-ui.css');

    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     * @return array sanitized $input
     */
    public function __sanitize($input)
    {
        if (isset($_GET['action']) && $_GET['action'] == 'delete') {
            $new_input = $input;
        } else {
            $new_input = array();

            if (isset($input['appointment_date']) && isset($input['appointment_time'])) {

                $appointments = get_option(APK_APPOINTMENTS_OPTION);

                $appointment_date = sanitize_text_field($input['appointment_date']);
                $appointment_time = (int)sanitize_text_field($input['appointment_time']);
                $shop_closed = sanitize_text_field($input['shop_closed']) == 'on' ? true : false;


                foreach ($appointments as $index => $appointment) {
                    if ($appointment['date'] == $appointment_date) {
                        $existing_appointment = $appointment;
                        $existing_index = $index;
                        break;
                    }
                }

                // adding a new time to an existing date...
                if (isset($existing_appointment) && isset($existing_index)) {
                    $existing_appointment['closed'] = $shop_closed;

                    if ($shop_closed) {
                        $existing_appointment['times'] = array();
                    }
                    else {
                        $existing_appointment['times'][] = $appointment_time;
                    }
                    $appointments[$existing_index] = $existing_appointment;
                }
                else {
                    // Adding a new date and time.
                    $new_appointment['date'] = $appointment_date;
                    $new_appointment['times'] = array($appointment_time);
                    $new_appointment['closed'] = $shop_closed;

                    if ($shop_closed) {
                        $new_appointment['times'] = array();
                    }

                    $appointments[] = $new_appointment;
                }

                $new_input = $appointments;
            }
        }

        return $new_input;
    }

    /**
     * Print the Section text
     */
    public function print_section_info() {
        print('Enter appointment details below:');
    }

    public function appointment_date_callback($args) {
        extract($args);
        print('<input type="date" id="datepicker" name="apk_appointments_options[appointment_date]" class="apk-appointment-date" />');
    }

    public function appointment_time_callback() {
        print('<select id="appointment_time" name="apk_appointments_options[appointment_time]">
			   	  <option value="9">9:00 AM</option>
   	  			  <option value="10">10:00 AM</option>
   	  			  <option value="11">11:00 AM</option>
   	  			  <option value="12">12:00 PM</option>
   	  			  <option value="13">1:00 PM</option>
   	  			  <option value="14">2:00 PM</option>
				  <option value="-" selected>Please select...</option>
   	  			  <option value="15">3:00 PM</option>
   	  			  <option value="16">4:00 PM</option>
   	  			  <option value="17">5:00 PM</option>
   	  			  <option value="18">6:00 PM</option>
   	  			  <option value="19">7:00 PM</option>
   	  			  <option value="20">8:00 PM</option>
			   </select>');
    }

    public function shop_closed_callback() {
        print('<input type="checkbox" name="apk_appointments_options[shop_closed]" />');
    }
}