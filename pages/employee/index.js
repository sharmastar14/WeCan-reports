const employeeListUL = document.getElementById("employee-list");
const employees = JSON.parse(localStorage.getItem("employees")) ?? [];
const addEmployeeForm = document.getElementById("add-employee-form");
const employeeDetail = document.getElementById("employee-detail");

function DisplayEmployees() {
  employeeListUL.innerHTML = "";
  const params = new URLSearchParams(window.location.search);
  employeeDetail.textContent = params.get("id");
  console.log(params.get("id"));
  employees.forEach((employee) => {
    const isSelected = params.get("id") == employee.id;
    console.log(isSelected);
    const employeeListItem = document.createElement("li");
    employeeListItem.classList.add(
      "list-group-item",
      "list-group-item-action",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      isSelected ? "active" : undefined
    );

    const addClassBtn = document.createElement("button");
    const badge = document.createElement("span");
    badge.classList.add("badge", "badge-warning", "badge-pill", "mr-1");
    badge.textContent = "9";
    addClassBtn.setAttribute("data-toggle", "modal");
    addClassBtn.setAttribute("data-target", "#exampleModal");
    addClassBtn.classList.add(
      "btn",
      "btn-sm",
      isSelected ? "btn-outline-light" : "btn-outline-primary"
    );
    addClassBtn.textContent = "Add class +";
    const div = document.createElement("div");
    employeeListItem.textContent = employee.name;
    employeeListItem.appendChild(addClassBtn);
    div.appendChild(badge);
    div.appendChild(addClassBtn);
    employeeListItem.appendChild(div);
    employeeListUL.appendChild(employeeListItem);
  });
}
DisplayEmployees();
addEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const employee = {
    id: Date.now(),
    name: e.target.elements.name.value,
    phone: e.target.elements.phone.value,
  };
  //console.log(employee);
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
  e.target.reset();
  DisplayEmployees();
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
