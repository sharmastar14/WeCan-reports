/*const classees = [
  { name: "4a", id: 1323 },
  { name: "4a", id: 1123 },
  { name: "7a", id: 1223 },
];
classees.filter((bclass) => {
  return bclass.id == 1123;
});
*/

function getFormValueFromEvent(e, fieldname) {
  return e.target.elements[fieldname].value;
}
const params = new URLSearchParams(window.location.search); //query parameter
let currentEmployeeId = params.get("id");
const employeeListUL = document.getElementById("employee-list");
const addEmployeeForm = document.getElementById("add-employee-form");
const addClassForm = document.getElementById("add-class-form");
const classDateInput = document.getElementById("classDate");
const classListUl = document.getElementById("class-list");

//database
const employees = JSON.parse(localStorage.getItem("employees")) ?? [];
const classes = JSON.parse(localStorage.getItem("classes")) ?? [];
const filteredClasses = classes.filter((aclass) => {
  return aclass.employeeId == currentEmployeeId;
});
console.log(filteredClasses);

function DisplayEmployees() {
  employeeListUL.innerHTML = "";
  //employeeDetail.textContent = params;
  employees.forEach((employee) => {
    const isSelected = currentEmployeeId == employee.id;
    const employeeListItem = document.createElement("li");
    const linkElement = document.createElement("a");
    linkElement.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      isSelected ? "text-light" : undefined
    );
    employeeListItem.classList.add(
      "list-group-item",
      "list-group-item-action",
      isSelected ? "active" : undefined
    );

    const hostName = window.location.href.split("?")[0];
    const link = hostName + "?id=" + employee.id;
    //console.log(hostName);

    linkElement.href = link;
    const addClassBtn = document.createElement("button");
    const badge = document.createElement("span");
    badge.classList.add("badge", "badge-warning", "badge-pill", "mr-1");
    badge.textContent = "9";
    addClassBtn.setAttribute("data-toggle", "modal");
    addClassBtn.setAttribute("data-target", "#addClassModal");
    addClassBtn.classList.add(
      "btn",
      "btn-sm",
      isSelected ? "btn-outline-light" : "btn-outline-primary"
    );
    addClassBtn.type = "button";

    addClassBtn.textContent = "Add class +";
    const classModal = document.getElementById("addClassModal");

    addClassBtn.addEventListener("click", (e) => {
      classModal.classList.add("show");
      e.preventDefault();
      classDateInput.value = new Date().toISOString().split("T")[0];

      const idInput = document.getElementById("idInput");
      idInput.value = employee.id;
    });

    const div = document.createElement("div");
    linkElement.textContent = employee.name;
    linkElement.appendChild(addClassBtn);
    div.appendChild(badge);
    div.appendChild(addClassBtn);
    linkElement.appendChild(div);
    employeeListItem.appendChild(linkElement);
    employeeListUL.appendChild(employeeListItem);
  });
}
DisplayEmployees();

function displayClasses() {
  classListUl.innerHTML = "";
  filteredClasses.forEach((classs) => {
    let listOfClass = document.createElement("li");
    // console.log(classs.className);
    listOfClass.innerHTML = classs.className;
    classListUl.appendChild(listOfClass);
  });
}
displayClasses();

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
addClassForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const classObj = {
    classDate: getFormValueFromEvent(e, "classdate"),
    employeeId: getFormValueFromEvent(e, "id"),
    schoolName: getFormValueFromEvent(e, "schoolName"),
    className: getFormValueFromEvent(e, "className"),
    classType: getFormValueFromEvent(e, "classType"),
  };
  classes.push(classObj);
  localStorage.setItem("classes", JSON.stringify(classes));

  //reset form so that next time modal opens, I dont see the same values.
  e.target.reset();

  //class obj is ready to store in local storage

  //added jquery to hide modal after data is stored
  $("#addClassModal").modal("hide");
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

label and date input didn't come in the same line
 
*/
