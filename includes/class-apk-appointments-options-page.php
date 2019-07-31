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
class OptionsPage {
    
    private $appointmentListTable;

    /**
     * Start up
     */
    function __construct() {
    }

    public function display() {

        // add_action('admin_init', array($this, 'page_init'));
        add_filter('set-screen-option', [ __CLASS__, 'set_screen' ], 10, 3);
        // add_action('admin_menu', array($this, 'plugin_menu'));
        // add_action('admin_enqueue_scripts', array($this, 'enqueue_date_picker'));

    }

    public static function set_screen( $status, $option, $value ) {
		return $value;
	}

    // /**
    //  * Add options page
    //  */
    // public function plugin_menu() {
	// 	$hook = add_menu_page(
	// 		'APK Shop Appointments',
	// 		'Appointments',
	// 		'manage_options',
    //         'apk-appointments',
    //         [ $this, 'apk_appointments_options_page' ],
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

    
    
    /**
	 * Screen options
	 */
	public function screen_option() {

		$option = 'per_page';
		$args   = [
			'label'   => 'Appointments',
			'default' => 5,
			'option'  => 'appointments_per_page'
		];

        add_screen_option( $option, $args );
        
        $this->appointmentListTable = new ListTable();
	}

    /**
     * Options page callback
     */
    function apk_appointments_options_page() {

        $this->appointmentListTable->prepare_items();
        // echo 'XDebug = '.phpversion('xdebug');
        // echo phpinfo();
        ?>
        <div class="wrap">
            <h2>Appointments</h2>
            <form method="post">
                <?php $this->appointmentListTable->display(); ?>
            </form>
        </div>
       <?php
    }
}