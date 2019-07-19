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
class OptionsPage
{

    /**
     * Holds the values to be used in the field callbacks...
     */
    private $options;

    /**
     * Start up
     */
    function __construct()
    {
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_date_picker'));
        add_action('admin_init', array($this, 'page_init'));
    }

    /**
     * Add options page
     */
    function admin_menu()
    {
        add_options_page('APK Appointments',
            'APK Appointments',
            'manage_options',
            basename(__FILE__),
            array($this, 'apk_appointments_options_page'));
    }

    /**
     * Options page callback
     */
    function apk_appointments_options_page()
    {

        // Set class property
        $this->options = get_option(APK_APPOINTMENTS_OPTION);

//        var_dump($_GET);
//        var_dump($_REQUEST);
//        var_dump($_POST);

        /*
        _wpnonce=86e44ca8e3&
        _wp_http_referer=/wp-admin/options-general.php?
        page=class-apk-options-page.php&
        action=delete&
        date&time=-&
        settings-updated=true
        &action=delete
        &appointment[]=2015-04-22|16|NO&
        appointment[]=2015-04-23||YES
        &action2=-1&option_page=apk_appointments_option_group&action=update&_wpnonce=30951f69fe&_wp_http_referer=/wp-admin/options-general.php?page=class-apk-options-page.php&action=delete&date&time=-&settings-updated=true&
        APK_APPOINTMENTS_OPTION[appointment_date]=&APK_APPOINTMENTS_OPTION[appointment_time]=-
         */

        if (isset($_GET['action']) && $_GET['action'] == 'delete') {

            $appointments = $this->options;

            foreach ($appointments as $index => $appointment) {

                if ($appointment['date'] == $_GET['date']) {
                    $times = $appointment['times'];

                    if ($appointment['closed'] || count($times) == 1) {
                        unset($appointments[$index]);
                    }
                    else {
                        foreach ($times as $time_index => $time) {
                            if ($time == $_GET['time']) {
                                unset($times[$time_index]);
                                $appointment['times'] = $times;
                                $appointments[$index] = $appointment;
                                break;
                            }
                        }
                    }
                }
            }

            $appointments = array_filter($appointments);

            update_option(APK_APPOINTMENTS_OPTION, $appointments);
            $this->options = get_option(APK_APPOINTMENTS_OPTION);
        }


        ?>
        <div class="wrap">
            <h2>Appointments</h2>
            <?php
            $appointmentListTable = new ListTable();
            $appointmentListTable->prepare_items();
            ?>
            <div id="icon-users" class="icon32"></div>
            <form method="post">
                <?php $appointmentListTable->display(); ?>
            </form>

            <form method="post" action="options.php">
                <?php
                // This prints out all hidden setting fields...
                settings_fields('apk_appointments_option_group');
                do_settings_sections(basename(__FILE__));
                submit_button();
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
            APK_APPOINTMENTS_OPTION, // Option name
            array($this, 'sanitize') // Sanitize
        );

        add_settings_section(
            'appointments_section_id', // ID
            'New Appointment', // Title
            array($this, 'print_section_info'), // Callback
            basename(__FILE__) // Page
        );

        add_settings_field(
            'appointments', // ID
            '', // Title
            array($this, 'appointments_callback'), // callback
            basename(__FILE__), // Page
            'appointments_section_id' // Section
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
    public function enqueue_date_picker()
    {

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
    public function sanitize($input)
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
    public function print_section_info()
    {


    }

    public function appointment_date_callback($args)
    {
        extract($args);

        print('<input type="date" id="datepicker" name="apk_appointments_options[appointment_date]" class="apk-appointment-date" />');
    }

    public function appointment_time_callback()
    {

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

    public function shop_closed_callback()
    {
        print('<input type="checkbox" name="apk_appointments_options[shop_closed]" />');
    }

    public function appointments_callback()
    {
        // Do nothing.
    }
}