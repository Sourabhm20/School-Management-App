document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to forms
  document.getElementById("class-form").addEventListener("submit", addClass);
  document.getElementById("teacher-form").addEventListener("submit", addTeacher);
  document.getElementById("student-form").addEventListener("submit", addStudent);
});

function addClass(event) {
  event.preventDefault();

  const name = document.getElementById("class-name").value;
  const year = document.getElementById("class-year").value;
  const teacher = document.getElementById("class-teacher").value;
  const fees = document.getElementById("class-fees").value;

  const table = document.getElementById("class-table").querySelector("tbody");
  const row = table.insertRow();
  row.innerHTML = `<td>${name}</td><td>${year}</td><td>${teacher}</td><td>${fees}</td>
                   <td><button onclick="deleteRow(this)">Delete</button></td>`;

  event.target.reset();
}

function addTeacher(event) {
  event.preventDefault();

  const name = document.getElementById("teacher-name").value;
  const gender = document.getElementById("teacher-gender").value;
  const dob = document.getElementById("teacher-dob").value;
  const contact = document.getElementById("teacher-contact").value;
  const salary = document.getElementById("teacher-salary").value;

  const table = document.getElementById("teacher-table").querySelector("tbody");
  const row = table.insertRow();
  row.innerHTML = `<td>${name}</td><td>${gender}</td><td>${dob}</td><td>${contact}</td><td>${salary}</td>
                   <td><button onclick="deleteRow(this)">Delete</button></td>`;

  event.target.reset();
}

function addStudent(event) {
  event.preventDefault();

  const name = document.getElementById("student-name").value;
  const gender = document.getElementById("student-gender").value;
  const dob = document.getElementById("student-dob").value;
  const contact = document.getElementById("student-contact").value;
  const feesPaid = document.getElementById("fees-paid").checked;

  const table = document.getElementById("student-table").querySelector("tbody");
  const row = table.insertRow();
  row.innerHTML = `<td>${name}</td><td>${gender}</td><td>${dob}</td><td>${contact}</td><td>${feesPaid ? "Yes" : "No"}</td>
                   <td><button onclick="deleteRow(this)">Delete</button></td>`;

  event.target.reset();
}

function deleteRow(button) {
  button.closest("tr").remove();
}

function filterClasses() {
  const filterName = document.getElementById("class-filter-name").value.toLowerCase();
  const rows = document.querySelectorAll("#class-table tbody tr");

  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    row.style.display = name.includes(filterName) ? "" : "none";
  });
}

function filterTeachers() {
  const filterName = document.getElementById("teacher-filter-name").value.toLowerCase();
  const filterGender = document.getElementById("teacher-filter-gender").value;
  const rows = document.querySelectorAll("#teacher-table tbody tr");

  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    const gender = row.cells[1].textContent;
    const matchesName = name.includes(filterName);
    const matchesGender = !filterGender || gender === filterGender;
    row.style.display = matchesName && matchesGender ? "" : "none";
  });
}

function filterStudents() {
  const filterName = document.getElementById("student-filter-name").value.toLowerCase();
  const filterGender = document.getElementById("student-filter-gender").value;
  const rows = document.querySelectorAll("#student-table tbody tr");

  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    const gender = row.cells[1].textContent;
    const matchesName = name.includes(filterName);
    const matchesGender = !filterGender || gender === filterGender;
    row.style.display = matchesName && matchesGender ? "" : "none";
  });
}

let currentPage = 1;
const rowsPerPage = 5;

function paginateTable(tableId) {
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tbody tr");
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  rows.forEach((row, index) => {
    row.style.display = index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage ? "" : "none";
  });

  document.getElementById("current-page").textContent = `${currentPage}/${totalPages}`;
}

function changePage(direction) {
  const tableId = document.querySelector("section:target table").id;
  const rows = document.getElementById(tableId).querySelectorAll("tbody tr");
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  currentPage = Math.min(Math.max(currentPage + direction, 1), totalPages);
  paginateTable(tableId);
}

// Call paginateTable for each table on page load
document.addEventListener("DOMContentLoaded", () => {
  paginateTable("class-table");
  paginateTable("teacher-table");
  paginateTable("student-table");
});


// Paginate table rows
function paginateTable(tableId) {
    const table = document.getElementById(tableId);
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    rows.forEach((row, index) => {
        row.style.display =
            index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
                ? ""
                : "none";
    });

    document.getElementById("current-page").textContent = `Page: ${currentPage}/${totalPages}`;
}

function changePage(direction) {
    const tableId = "class-table"; // Change dynamically for different tables
    const rows = document.querySelectorAll(`#${tableId} tbody tr`);
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    if (direction === "prev" && currentPage > 1) {
        currentPage--;
    } else if (direction === "next" && currentPage < totalPages) {
        currentPage++;
    }

    paginateTable(tableId);
}

// Call pagination on page load
document.addEventListener("DOMContentLoaded", () => {
    paginateTable("class-table");
    paginateTable("teacher-table");
    paginateTable("student-table");
});

function filterTable(tableId) {
  const filterValue = document.getElementById("filter-input").value.toLowerCase();
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach(row => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(filterValue) ? "" : "none";
  });
}

function sortTable(tableId) {
  const sortKey = document.getElementById("sort-select").value;
  const table = document.getElementById(tableId);
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  rows.sort((a, b) => {
      const valA = a.querySelector(`td[data-key="${sortKey}"]`).textContent;
      const valB = b.querySelector(`td[data-key="${sortKey}"]`).textContent;
      return valA.localeCompare(valB);
  });

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = ""; // Clear the table body
  rows.forEach(row => tbody.appendChild(row)); // Append sorted rows
}

function filterTable(tableId) {
  const filterValue = document.getElementById("filter-input").value.toLowerCase();
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach(row => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(filterValue) ? "" : "none";
  });
}

function sortTable(tableId) {
  const sortKey = document.getElementById("sort-select").value;
  const table = document.getElementById(tableId);
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  rows.sort((a, b) => {
      const valA = a.querySelector(`td[data-key="${sortKey}"]`).textContent;
      const valB = b.querySelector(`td[data-key="${sortKey}"]`).textContent;
      return valA.localeCompare(valB);
  });

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = ""; // Clear the table body
  rows.forEach(row => tbody.appendChild(row)); // Append sorted rows
}

document.getElementById("class-form").addEventListener("submit", event => {
  event.preventDefault();

  const className = document.getElementById("class-name").value.trim();
  const classYear = document.getElementById("class-year").value.trim();
  const classFees = document.getElementById("class-fees").value.trim();

  if (!className || !classYear || !classFees) {
      alert("All fields are required.");
      return;
  }

  if (isNaN(classYear) || classYear < 2000 || classYear > 2100) {
      alert("Year must be between 2000 and 2100.");
      return;
  }

  if (isNaN(classFees) || classFees < 0) {
      alert("Fees must be a non-negative number.");
      return;
  }

  alert("Form submitted successfully!");
  // Add logic to send data to the backend
});
