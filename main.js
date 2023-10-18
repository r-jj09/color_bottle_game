const form = document.getElementById("form");
const submitter = document.querySelector("button[value=save]");
const formData = new FormData();

var firstname = formData.get("firstname");
var lastname = formData.get("lastname");
var country = formData.get("country");
var address = formData.get("address");
var zipcode = formData.get("zipcode");
var email = formData.get("email");
var phone = formData.get("phone");

// console.log(firstname);
