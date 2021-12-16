function pass() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function newPass() {
  var x = document.getElementById("myNewInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
