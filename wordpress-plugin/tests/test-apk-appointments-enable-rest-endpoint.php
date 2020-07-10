<?php

$GLOBALS['hook_suffix'] = 'x';
class APK_Appointments_Enable_Rest_Endpoint_Test extends WP_UnitTestCase {

	function setUp() {
		parent::setUp();
		update_option( APK_APPOINTMENTS_OPTION, json_decode( $this->appointments_fixture ) );
		update_option( APK_APPOINTMENTS_TIME_DISPLAY_FORMAT, $this->display_format_fixture );
		update_option( APK_APPOINTMENTS_MONDAY_APPOINTMENT_AVAILABILITY, $this->monday_appointment_availability_fixture );
		update_option( APK_APPOINTMENTS_TUESDAY_APPOINTMENT_AVAILABILITY, $this->tuesday_appointment_availability_fixture );
		update_option( APK_APPOINTMENTS_WEDNESDAY_APPOINTMENT_AVAILABILITY, $this->wednesday_appointment_availability_fixture );
		update_option( APK_APPOINTMENTS_THURSDAY_APPOINTMENT_AVAILABILITY, $this->thursday_appointment_availability_fixture );
		update_option( APK_APPOINTMENTS_FRIDAY_APPOINTMENT_AVAILABILITY, $this->friday_appointment_availability_fixture );
		update_option( APK_APPOINTMENTS_SATURDAY_APPOINTMENT_AVAILABILITY, $this->saturday_appointment_availability_fixture );
		update_option( APK_APPOINTMENTS_SUNDAY_APPOINTMENT_AVAILABILITY, $this->sunday_appointment_availability_fixture );
	}

	function tearDown() {
		parent::tearDown();
		delete_option( APK_APPOINTMENTS_OPTION );
		delete_option( APK_APPOINTMENTS_TIME_DISPLAY_FORMAT );
		delete_option( APK_APPOINTMENTS_MONDAY_APPOINTMENT_AVAILABILITY );
		delete_option( APK_APPOINTMENTS_TUESDAY_APPOINTMENT_AVAILABILITY );
		delete_option( APK_APPOINTMENTS_WEDNESDAY_APPOINTMENT_AVAILABILITY );
		delete_option( APK_APPOINTMENTS_THURSDAY_APPOINTMENT_AVAILABILITY );
		delete_option( APK_APPOINTMENTS_FRIDAY_APPOINTMENT_AVAILABILITY );
		delete_option( APK_APPOINTMENTS_SATURDAY_APPOINTMENT_AVAILABILITY );
		delete_option( APK_APPOINTMENTS_SUNDAY_APPOINTMENT_AVAILABILITY );
	}

	function test_get_appointments() {
		$data = array();

		$expected_appointments = $this->expected_data();
		$actual_appointments   = get_appointments( $data );

		$this->assertEquals( $expected_appointments, $actual_appointments );
	}

	function expected_data() {

		$expected_json = '{
        "schedule": {
          "display": {
            "format": 12
          },
          "monday": {
            "closed": false,
            "availability": [
              {
                "time": 10
              },
              {
                "time": 11
              },
              {
                "time": 12
              },
              {
                "time": 13
              },
              {
                "time": 14
              },
              {
                "time": 15
              },
              {
                "time": 16
              }
            ]
          },
          "tuesday": {
            "closed": false,
            "availability": [
              {
                "time": 10
              },
              {
                "time": 11
              },
              {
                "time": 12
              },
              {
                "time": 13
              },
              {
                "time": 14
              },
              {
                "time": 15
              },
              {
                "time": 16
              }
            ]
          },
          "wednesday": {
            "closed": false,
            "availability": [
              {
                "time": 11
              },
              {
                "time": 12
              },
              {
                "time": 13
              },
              {
                "time": 14
              },
              {
                "time": 15
              },
              {
                "time": 16
              },
              {
                "time": 17
              },
              {
                "time": 18,
                "fee": "£20"
              },
              {
                "time": 19,
                "fee": "£20"
              }
            ]
          },
          "thursday": {
            "closed": true
          },
          "friday": {
            "closed": true
          },
          "saturday": {
            "closed": false,
            "availability": [
              {
                "time": 11
              },
              {
                "time": 12
              },
              {
                "time": 13
              },
              {
                "time": 14
              },
              {
                "time": 15
              },
              {
                "time": 16
              }
            ]
          },
          "sunday": {
            "closed": false,
            "availability": [
              {
                "time": 11,
                "fee": "£20"
              },
              {
                "time": 12,
                "fee": "£20"
              },
              {
                "time": 13,
                "fee": "£20"
              },
              {
                "time": 14,
                "fee": "£20"
              },
              {
                "time": 15,
                "fee": "£20"
              },
              {
                "time": 16,
                "fee": "£20"
              }
            ]
          }
        },
        "appointments": [
          {
            "date": "2020-03-17",
            "times": [
              {
                "time": 13
              }
            ],
            "closed": false
          },
          {
            "date": "2020-06-12",
            "times": [
              {
                "time": 17
              }
            ],
            "closed": false
          },
          {
            "date": "2020-09-23",
            "times": [
              {
                "time": 17
              }
            ],
            "closed": false
          },
          {
            "date": "2020-08-20",
            "times": [
              {
                "time": 15
              }
            ],
            "closed": false
          },
          {
            "date": "2020-04-21",
            "times": [
              {
                "time": 10
              },
              {
                "time": 11
              },
              {
                "time": 12
              },
              {
                "time": 13
              },
              {
                "time": 14
              },
              {
                "time": 15
              },
              {
                "time": 16
              }
            ],
            "closed": false
          },
          {
            "date": "2020-10-24",
            "times": [],
            "closed": true
          },
          {
            "date": "2020-05-25",
            "times": [],
            "closed": true
          }
        ]
      }';

		return json_decode( $expected_json );
	}

	private $monday_appointment_availability_fixture    = array( '', '', '', '', '10', '', '11', '', '12', '', '13', '', '14', '', '15', '', '16', '', '', '', '', '', '', '', '', '', '', '' );
	private $tuesday_appointment_availability_fixture   = array( '', '', '', '', '10', '', '11', '', '12', '', '13', '', '14', '', '15', '', '16', '', '', '', '', '', '', '', '', '', '', '' );
	private $wednesday_appointment_availability_fixture = array( '', '', '', '', '', '', '11', '', '12', '', '13', '', '14', '', '15', '', '16', '', '17', '', '18', '£20', '19', '£20', '', '', '', '' );
	private $thursday_appointment_availability_fixture  = array( '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' );
	private $friday_appointment_availability_fixture    = array( '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' );
	private $saturday_appointment_availability_fixture  = array( '', '', '', '', '', '', '11', '', '12', '', '13', '', '14', '', '15', '', '16', '', '', '', '', '', '', '', '', '', '', '' );
	private $sunday_appointment_availability_fixture    = array( '', '', '', '', '', '', '11', '£20', '12', '£20', '13', '£20', '14', '£20', '15', '£20', '16', '£20', '', '', '', '', '', '', '', '', '', '' );

	private $display_format_fixture = array( '12' );

	private $appointments_fixture = '[{
    "date": "2020-03-17",
    "times": [
      {
        "time": 13
      }
    ],
    "closed": false
  },
  {
    "date": "2020-06-12",
    "times": [
      {
        "time": 17
      }
    ],
    "closed": false
  },
  {
    "date": "2020-09-23",
    "times": [
      {
        "time": 17
      }
    ],
    "closed": false
  },
  {
    "date": "2020-08-20",
    "times": [
      {
        "time": 15
      }
    ],
    "closed": false
  },
  {
    "date": "2020-04-21",
    "times": [
      {
        "time": 10
      },
      {
        "time": 11
      },
      {
        "time": 12
      },
      {
        "time": 13
      },
      {
        "time": 14
      },
      {
        "time": 15
      },
      {
        "time": 16
      }
    ],
    "closed": false
  },
  {
    "date": "2020-10-24",
    "times": [],
    "closed": true
  },
  {
    "date": "2020-05-25",
    "times": [],
    "closed": true
  }]';
}
