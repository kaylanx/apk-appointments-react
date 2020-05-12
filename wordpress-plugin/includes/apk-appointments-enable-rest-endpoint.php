<?php
function get_appointments( $data ) {
	require_once __DIR__ . '/apk-appointments-defines.php';
	$appointments = get_option( APK_APPOINTMENTS_OPTION );

	// print_r ( $appointments );

	return get_dummy_data();
}

function get_dummy_data() {

 $dummy_json = "{
	\"schedule\": {
	  \"display\": {
		\"format\": 12
	  },
	  \"monday\": {
		\"closed\": false,
		\"availability\": [
		  {
			\"time\": 10
		  },
		  {
			\"time\": 11
		  },
		  {
			\"time\": 12
		  },
		  {
			\"time\": 13
		  },
		  {
			\"time\": 14
		  },
		  {
			\"time\": 15
		  },
		  {
			\"time\": 16
		  }
		]
	  },
	  \"tuesday\": {
		\"closed\": false,
		\"availability\": [
		  {
			\"time\": 10
		  },
		  {
			\"time\": 11
		  },
		  {
			\"time\": 12
		  },
		  {
			\"time\": 13
		  },
		  {
			\"time\": 14
		  },
		  {
			\"time\": 15
		  },
		  {
			\"time\": 16
		  }
		]
	  },
	  \"wednesday\": {
		\"closed\": false,
		\"availability\": [
		  {
			\"time\": 11
		  },
		  {
			\"time\": 12
		  },
		  {
			\"time\": 13
		  },
		  {
			\"time\": 14
		  },
		  {
			\"time\": 15
		  },
		  {
			\"time\": 16
		  },
		  {
			\"time\": 17
		  },
		  {
			\"time\": 18,
			\"fee\": \"£20\"
		  },
		  {
			\"time\": 19,
			\"fee\": \"£20\"
		  }
		]
	  },
	  \"thursday\": {
		\"closed\": true
	  },
	  \"friday\": {
		\"closed\": true
	  },
	  \"saturday\": {
		\"closed\": false,
		\"availability\": [
		  {
			\"time\": 11
		  },
		  {
			\"time\": 12
		  },
		  {
			\"time\": 13
		  },
		  {
			\"time\": 14
		  },
		  {
			\"time\": 15
		  },
		  {
			\"time\": 16
		  }
		]
	  },
	  \"sunday\": {
		\"closed\": false,
		\"availability\": [
		  {
			\"time\": 11,
			\"fee\": \"£20\"
		  },
		  {
			\"time\": 12,
			\"fee\": \"£20\"
		  },
		  {
			\"time\": 13,
			\"fee\": \"£20\"
		  },
		  {
			\"time\": 14,
			\"fee\": \"£20\"
		  },
		  {
			\"time\": 15,
			\"fee\": \"£20\"
		  },
		  {
			\"time\": 16,
			\"fee\": \"£20\"
		  }
		]
	  }
	},
	\"appointments\": [
	  {
		\"date\": \"2020-03-17\",
		\"times\": [
		  {
			\"time\": 13
		  }
		],
		\"closed\": false
	  },
	  {
		\"date\": \"2020-06-12\",
		\"times\": [
		  {
			\"time\": 17
		  }
		],
		\"closed\": false
	  },
	  {
		\"date\": \"2020-09-23\",
		\"times\": [
		  {
			\"time\": 17
		  }
		],
		\"closed\": false
	  },
	  {
		\"date\": \"2020-08-20\",
		\"times\": [
		  {
			\"time\": 15
		  }
		],
		\"closed\": false
	  },
	  {
		\"date\": \"2020-04-21\",
		\"times\": [
		  {
			\"time\": 10
		  },
		  {
			\"time\": 11
		  },
		  {
			\"time\": 12
		  },
		  {
			\"time\": 13
		  },
		  {
			\"time\": 14
		  },
		  {
			\"time\": 15
		  },
		  {
			\"time\": 16
		  }
		],
		\"closed\": false
	  },
	  {
		\"date\": \"2020-10-24\",
		\"times\": [],
		\"closed\": true
	  },
	  {
		\"date\": \"2020-05-25\",
		\"times\": [],
		\"closed\": true
	  }
	]
  }";

  return json_decode($dummy_json);
}

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'apk-appointments/v1',
			'/appointments',
			array(
				'methods'  => 'GET',
				'callback' => 'get_appointments',
			)
		);
	}
);
