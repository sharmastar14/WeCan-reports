const employeeListUL = document.getElementById("employee-list");
const employees = JSON.parse(localStorage.getItem("employees")) ?? [];
const addEmployeeForm = document.getElementById("add-employee-form");

employees.forEach((employee) => {
  const employeeListItem = document.createElement("li");
  employeeListItem.classList.add(
    "list-group-item",
    "list-group-item-action",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  const addClassBtn = document.createElement("button");
  const badge = document.createElement("span");
  badge.classList.add("badge", "badge-warning", "badge-pill", "mr-1");
  badge.textContent = "9";
  addClassBtn.setAttribute("data-toggle", "modal");
  addClassBtn.setAttribute("data-target", "#exampleModal");
  addClassBtn.classList.add("btn", "btn-outline-primary", "btn-sm");
  addClassBtn.textContent = "Add class +";
  const div = document.createElement("div");
  employeeListItem.textContent = employee.name;
  employeeListItem.appendChild(addClassBtn);
  div.appendChild(badge);
  div.appendChild(addClassBtn);
  employeeListItem.appendChild(div);
  employeeListUL.appendChild(employeeListItem);
});
addEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitted");
});

/*
employees = [
  { id: 1, name: "Suman", phone: "23132131231" },
  { id: 2, name: "Anjani", phone: "321321111" },
];

const classes = [
  {
    employeeId: 2,
    school: "AVM",
    name: "Class 6, Section A",
    type: "single",
    date: "2020-02-20",
  },
  {
    employeeId: 1,
    school: "Floroscent",
    name: "Class 5, Section A",
    type: "dual",
    date: "2020-02-20",
  },
  {
    employeeId: 1,
    school: "Floroscent",
    name: "Class 5, Section B",
    type: "single",
    date: "2020-02-20",
  },
];
*/
