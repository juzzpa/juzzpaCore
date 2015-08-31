// For custom success and error messages


//login page
var invalidCredentials="Username/password incorrect";
var invalidEmailId="The valid emailId should be of the format 'abc@abc.com'";
var emailEmpty="Please enter emailId";
var passwordEmpty="Please enter login password";
var emailRegex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

//Register page
var regNameEmpty="Please Enter name";
var mobileNmuberEmpty="Please enter mobile number";
var invalidRegName="UserName should not contain special characters or numbers";
var invalidMobileNumber="Please provide a valid mobile number";
var passwordStrength="Password should contain atleast one number and one special characters";
var matchPassword="Confirm password should match with password";
var nameRegex=/[a-z]/i;
var mobileNumberRegex=/(^\+?)\d/i;
var passwordRegex=/[a-zA-Z0-9@$%^&]/;

//business details page
var contactEmpty="Please enter business contact number";
var invalidContact="Please provide a valid contact number";
var buAddressEmpty="Please enter address";

//manage services
var serviceSuccess="Service is added successfully";
var minService="Please add atleast one service to continue";

//manage staffs
var minStaff="Please add atleast one staff to continue";
var staffSuccess="Staff added Successfully";

//manage stores
var minStore="Please add atleast one store to continue";
var storeSuccess="Store added Successfully";

//update profile
var updateSuccess="Profile updated successfully";

var addressEmpty="Please enter the address";
