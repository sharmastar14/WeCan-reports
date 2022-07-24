const employeeListUL = document.getElementById("employee-list");
const employees = JSON.parse(localStorage.getItem("employees"));
const addEmployeeForm = document.getElementById("add-employee-form");

employees.forEach((employee) => {
  const li = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.classList.add(
    "list-group-item",
    "list-group-item-action",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  const button = document.createElement("button");
  const badge = document.createElement("span");
  badge.classList.add("badge", "badge-light");
  badge.textContent = "9";
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#exampleModal");
  button.classList.add("btn", "btn-secondary");
  button.textContent = "Add class +";
  const div = document.createElement("div");
  anchor.textContent = employee.name;
  anchor.appendChild(button);
  div.appendChild(badge);
  div.appendChild(anchor);
  li.appendChild(div);
  employeeListUL.appendChild(li);
});
addEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitted");
});
