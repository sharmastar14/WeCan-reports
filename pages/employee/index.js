console.log("hello world");
let addEmployeeForm = document.getElementById("add-employee-form");
addEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitted");
});
