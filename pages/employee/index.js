"use strict";

function getFormValueFromEvent(e, fieldname) {
  return e.target.elements[fieldname].value;
}

//params
const params = new URLSearchParams(window.location.search); //query parameter
let currentEmployeeId = params.get("id");

//html selectors
const employeeListUL = document.getElementById("employee-list");
const addEmployeeForm = document.getElementById("add-employee-form");
const addClassForm = document.getElementById("add-class-form");
const classDateInput = document.getElementById("classDate");
const classListTableBody = document.getElementById("class-list");
const partnerContainerDiv = document.getElementById("partnerContainer");
const partnerSelect = document.getElementById("partnerSelect");
const classTypeRadios = document.getElementsByName("classType");

//database
const employees = JSON.parse(localStorage.getItem("employees")) ?? [];
let classes = JSON.parse(localStorage.getItem("classes")) ?? [];

function populateOptions(employeeId) {
  let filteredEmployees = employees.filter((employee) => {
    return employee.id != employeeId;
  });
  filteredEmployees.forEach((employee) => {
    const partnerNameOption = document.createElement("option");
    partnerSelect.appendChild(partnerNameOption);
    partnerNameOption.value = employee.id;
    partnerNameOption.textContent = employee.name;
    filteredEmployees = [];
  });
}

classTypeRadios.forEach((radio) => {
  radio.addEventListener("change", function (e) {
    if (e.target.value === "dual") {
      partnerContainerDiv.classList.remove("d-none");
      partnerContainerDiv.classList.add("d-flex");
      partnerSelect.setAttribute("required", "");
    } else {
      partnerContainerDiv.classList.remove("d-flex");
      partnerContainerDiv.classList.add("d-none");
      partnerSelect.removeAttribute("required");
    }
  });
});

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
      partnerSelect.textContent = "";
      e.preventDefault();
      classModal.classList.add("show");
      classDateInput.value = new Date().toISOString().split("T")[0];
      const idInput = document.getElementById("idInput");
      idInput.value = employee.id;
      populateOptions(employee.id);
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
  const filteredClasses = classes.filter((aclass) => {
    return aclass.employeeId == currentEmployeeId;
  });
  classListTableBody.innerHTML = "";
  filteredClasses.forEach((classs, index) => {
    let idData = index + 1;
    let tableRow = document.createElement("tr");
    let tableDataIndex = document.createElement("td");
    let tableDataClassName = document.createElement("td");
    let tableDataClassType = document.createElement("td");
    let tableDataClassDate = document.createElement("td");
    let tableDataDel = document.createElement("button");
    tableDataDel.classList.add(
      "btn",
      "btn-outline-danger",
      "btn-sm",
      "mx-2",
      "my-2"
    );
    tableDataDel.textContent = "Del";

    tableDataIndex.innerText = idData;
    tableDataClassName.innerText = classs.className;
    tableDataClassType.innerText = classs.classType;
    tableDataClassDate.innerText = classs.classDate;
    tableRow.appendChild(tableDataIndex);
    tableRow.appendChild(tableDataClassName);
    tableRow.appendChild(tableDataClassType);
    tableRow.appendChild(tableDataClassDate);
    tableRow.appendChild(tableDataDel);
    classListTableBody.appendChild(tableRow);

    tableDataDel.addEventListener("click", (e) => {
      classes = classes.filter((c) => c.id != classs.id);
      localStorage.setItem("classes", JSON.stringify(classes));
      displayClasses();
    });
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
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
  e.target.reset();
  DisplayEmployees();
});

addClassForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const classObj = {
    classDate: getFormValueFromEvent(e, "classdate"),
    id: Date.now(),
    employeeId: getFormValueFromEvent(e, "id"),
    schoolName: getFormValueFromEvent(e, "schoolName"),
    className: getFormValueFromEvent(e, "className"),
    classType: getFormValueFromEvent(e, "classType"),
  };
  classes.push(classObj);
  localStorage.setItem("classes", JSON.stringify(classes));

  if (classObj.classType === "dual") {
  }

  $("#addClassToast").toast("show");
  //reset form so that next time modal opens, I dont see the same values.
  e.target.reset();
  displayClasses();
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
