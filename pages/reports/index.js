//html selectors
const employeeReportTableBody = document.getElementById("employeeReport");

//database
const employees = JSON.parse(localStorage.getItem("employees")) ?? [];
let classes = JSON.parse(localStorage.getItem("classes")) ?? [];

//console.log(employees);
//console.log(classes);

function getNoOfDualClassesForEmployee(employeeId) {
  let filteredDualClasses = classes.filter((aclass) => {
    return aclass.employeeId == employeeId && aclass.classType == "dual";
  });
  return filteredDualClasses.length;
}

function getNoOfSingleClassesForEmployee(employeeId) {
  let filteredSingleClasses = classes.filter((aclass) => {
    return aclass.employeeId == employeeId && aclass.classType == "single";
  });
  return filteredSingleClasses.length;
}

employeeReportTableBody.innerHTML = "";
employees.forEach((employee, index) => {
  let idData = index + 1;
  let tableRow = document.createElement("tr");
  let tableDataIndex = document.createElement("td");
  let tableDataEmployeeName = document.createElement("td");
  let tableDataDualClass = document.createElement("td");
  let tableDataSingleClass = document.createElement("td");
  let tableDataAmount = document.createElement("td");
  let noOfDualClasses = getNoOfDualClassesForEmployee(employee.id);
  let noOfSingleClasses = getNoOfSingleClassesForEmployee(employee.id);
  let amountEarned = noOfDualClasses * 75 + noOfSingleClasses * 150;

  tableDataIndex.innerText = idData;
  tableDataEmployeeName.innerText = employee.name;
  tableDataDualClass.innerText = noOfDualClasses;
  tableDataSingleClass.textContent = noOfSingleClasses;
  tableDataAmount.textContent = amountEarned;
  tableRow.appendChild(tableDataIndex);
  tableRow.appendChild(tableDataEmployeeName);
  tableRow.appendChild(tableDataDualClass);
  tableRow.appendChild(tableDataSingleClass);
  tableRow.appendChild(tableDataAmount);
  employeeReportTableBody.appendChild(tableRow);
  // }
  //});
});
