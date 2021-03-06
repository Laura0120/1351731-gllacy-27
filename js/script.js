var link = document.querySelector(".feedback-form-link");

var popup = document.querySelector(".feedback-form-overlay");
var close = popup.querySelector(".close");

var form = popup.querySelector("form");
var userName = popup.querySelector("[name=name]");
var email = popup.querySelector("[name=email]");
var text = popup.querySelector("[name=appeal-text]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("userName");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.add("feedback-form-show");
  if (storageName || storageEmail) {
    userName.value = storageName;
    email.value = storageEmail;
    text.focus();
  } else {
    userName.focus();
  }
});
close.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("feedback-form-show");
  form.classList.remove("feedback-form-error");
});
form.addEventListener("submit", function(evt) {
  if (!userName.value || !email.value || !text.value) {
    evt.preventDefault();
    form.classList.remove("feedback-form-error");
    form.offsetWidth = form.offsetWidth;
    form.classList.add("feedback-form-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("userName", userName.value);
      localStorage.setItem("email", email.value);
    }
  }
});
window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("feedback-form-show")) {
      popup.classList.remove("feedback-form-show");
      form.classList.remove("feedback-form-error");
    }
  }
});
