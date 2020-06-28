<?php
/**
 * User: Andy Kayley
 * Date: 19/4/15
 * Time: 14:57
 *
 * @package APK_Appointments
 */

/**
 * Class that is for drawing the add new appointment form.
 */
class APK_Appointments_Appointment_Creator {
	/**
	 * Start up
	 */
	public function __construct() {
	}

	/**
	 * Enqueue the actions so this screen can be displayed.
	 */
	public function display() {
		add_action( 'admin_init', array( $this, 'page_init' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_date_picker' ) );
	}

	/**
	 * Draw the form for capturing a new appointment.
	 */
	public function apk_add_appointment_form() {
		?>
		<div class="wrap">
			<form method="post" action="admin.php?page=apk-appointments">
				<?php
				// This prints out all hidden setting fields...
				settings_fields( 'apk_appointments_option_group' );
				do_settings_sections( basename( __FILE__ ) );
				submit_button( 'Add appointment' );
				?>
			</form>
		</div>
		<?php
	}

	/**
	 * Register and add settings
	 */
	public function page_init() {
		register_setting(
			'apk_appointments_option_group', // Option group.
			APK_APPOINTMENTS_OPTION // Option name.
		);

		add_settings_section(
			'appointments_section_id', // ID.
			'New Appointment', // Title.
			array( $this, 'print_section_info' ), // Callback.
			basename( __FILE__ ) // Page.
		);

		add_settings_field(
			'appointment_date', // ID.
			'Appointment Date', // Title.
			array( $this, 'appointment_date_callback' ), // callback.
			basename( __FILE__ ), // Page.
			'appointments_section_id' // Section.
		);

		add_settings_field(
			'appointment_time', // ID.
			'Appointment Time', // Title.
			array( $this, 'appointment_time_callback' ), // callback.
			basename( __FILE__ ), // Page.
			'appointments_section_id' // Section.
		);

		add_settings_field(
			'shop_closed', // ID.
			'Shop Closed?', // Title.
			array( $this, 'shop_closed_callback' ), // callback.
			basename( __FILE__ ), // Page.
			'appointments_section_id' // Section.
		);

	}

	/**
	 * Enqueue the date picker
	 */
	public function enqueue_date_picker() {
		wp_enqueue_script(
			'field-date-js',
			plugins_url() . '/apk-appointments/js/field-date.js',
			array( 'jquery', 'jquery-ui-core', 'jquery-ui-datepicker' ),
			time(),
			true
		);

		wp_enqueue_style( 'jquery-ui-datepicker' );
		wp_enqueue_style(
			'jquery-style',
			'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/themes/smoothness/jquery-ui.css',
			array(),
			'1.8.2'
		);
	}

	/**
	 * Print the Section text
	 */
	public function print_section_info() {
		print( 'Enter appointment details below:' );
	}

	/**
	 * Draw the html for the date picker.
	 */
	public function appointment_date_callback() {
		print( '<input type="date" id="datepicker" name="apk_appointments_options[appointment_date]" class="apk-appointment-date" />' );
	}

	/**
	 * Draws the HTML for the time dropdown.
	 */
	public function appointment_time_callback() {
		print( '<select id="appointment_time" name="apk_appointments_options[appointment_time]">
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
			   </select>' );
	}

	/**
	 * Draws the HTML for the shop closed checkbox.
	 */
	public function shop_closed_callback() {
		print( '<input type="checkbox" name="apk_appointments_options[shop_closed]" />' );
	}
}
