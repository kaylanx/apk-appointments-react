<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://kayley.name/apk-appointments
 * @since      1.0.0
 *
 * @package    APK_Appointments
 * @subpackage APK_Appointments/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    APK_Appointments
 * @subpackage APK_Appointments/public
 * @author     Andy Kayley <apk-appointments@kayley.name>
 */
class APK_Appointments_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $apk_appointments    The ID of this plugin.
	 */
	private $apk_appointments;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $apk_appointments       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $apk_appointments, $version ) {

		$this->apk_appointments = $apk_appointments;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in APK_Appointments_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The APK_Appointments_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->apk_appointments, plugin_dir_url( __FILE__ ) . 'css/apk-appointments-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in APK_Appointments_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The APK_Appointments_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->apk_appointments, plugin_dir_url( __FILE__ ) . 'js/apk-appointments-public.js', array( 'jquery' ), $this->version, false );

	}

}
