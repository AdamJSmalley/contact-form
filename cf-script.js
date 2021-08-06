//set the variables
var problem = undefined;
var subURL = undefined;
var nextPart = "Phone: <input id='phone' type='text' /><button id='next'><i class='fa fa-angle-right fa-3x'></i></button>";
var emailCode = "<span id='email' style='display: none;'>Email: <input id='emailBox' type='text' placeholder='optional' /></span><br/><span id='nameCon'>Name: <input id='name' type='text' /></span>";
jQuery.cform = jQuery("#cform");

//validate the data and submit the form
function subForm() {
	//validate email and phone number
	jQuery('#email').hide();
	var email = jQuery("#emailBox").val();
	var phone = jQuery("#phone").val();
	var name = jQuery("#name").val();
	var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var phoneReg = /(\+\d{1,3}|0)\d{4}\s?\d{4,6}/;
	if (!(emailReg.test(email) || email == "")) {
		alert("Please enter a valid email address ");
		return;
	}
	if (!phoneReg.test(phone)) {
		alert("Please enter a valid phone number.");
		return;
	}
	
	//submit the form using ajax
	jQuery.post(subURL,
	{
			email: email,
			phone: phone,
			name: name,
			problem: problem
	},
	function(response, status) { //print error message or success message if data is submited
		jQuery("#cform").html(response);
	});
}

//when the user clicks next save the problem to a variable and load the next part.
jQuery(document).ready(function() {
	jQuery("#next").click(function() {
		subURL = jQuery('#subURL').val();
		//save the text to a variable and remove the problem textarea
		problem = jQuery("#problem").val();
		if (problem.length < 40) {   //validate the text area
			alert("lease write at least 40 characters to describe your problem");
			return;
		}
		//alert("3");
		jQuery("#cform").fadeOut();
		jQuery("#cform").html('');
		jQuery("#cform").fadeIn('slow');
	
		//create and fade in the next part
		jQuery("#cform").html(nextPart);
		jQuery("#cform").after(emailCode);
		//check for intruders
		jQuery("#nameCon").hide();
		jQuery("#email").fadeIn('slow');
	
		//listen for the button to be clicked a second time
		jQuery("#next").click( subForm )
	
	});
});