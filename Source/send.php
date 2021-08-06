<?php
$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

if (isset($_POST)) {
	$data = $_POST;
	#validation
	if ($data['name'] != "") {
		echo 'Error please try again.';
	}
	
	else {
		$phone = $data['phone'];
		preg_replace('/[^0-9]/', '', $phone);
		$problem = esc_textarea($data['problem']);
		$email = sanitize_email($data['email']);
		
		#send the email
		$message= $problem . '    Number: ' . $phone;
		$headers = 'From: ' . $email . "\r\n" . 'Reply-To: ' . $email . "\r\n";
		
		if (wp_mail( get_option('admin_email'), 'Website enquiry', $message, $headers)) {
		
			echo 'Thanks for getting in touch. I give you a call to disscuss how I can help you soon.';
		
		}
		else {
			echo 'There has been an error. Please try again later.';
		}
	}
}

#return error message if data is not recieved
else {
	echo "The data did not get sent correctly. Please try again.";
}
?>