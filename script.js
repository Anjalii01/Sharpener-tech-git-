// ----------------------------------------------------
// Student Manager — CRUD logic with localStorage
// ----------------------------------------------------

const STORAGE_KEY = "students_data_v1";

// ---- State ----
let students = loadStudents();
let editingId = null;
let searchTerm = "";

// ---- DOM refs ----
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile");
const addressInput = document.getElementById("address");
const studentIdInput = document.getElementById("studentId");

const nameError = document.getElementById("nameError");
const mobileError = document.getElementById("mobileError");
const addressError = document.getElementById("addressError");

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const submitBtnText = document.getElementById("submitBtnText");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const studentList = document.getElementById("studentList");
const emptyState = document.getElementById("emptyState");
const studentCount = document.getElementById("studentCount");
const searchInput = document.getElementById("searchInput");

const toast = document.getElementById("toast");

// ---- Storage helpers ----
function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load students:", e);
    return [];
  }
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// ---- Toast ----
let toastTimer = null;
function showToast(message, isError = false) {
  toast.textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---- Validation ----
function validate() {
  let valid = true;

  const name = nameInput.value.trim();
  const mobile = mobileInput.value.trim();
  const address = addressInput.value.trim();

  [nameInput, mobileInput, addressInput].forEach((el) => el.classList.remove("invalid"));
  nameError.textContent = "";
  mobileError.textContent = "";
  addressError.textContent = "";

  if (!name) {
    nameError.textContent = "Name is required.";
    nameInput.classList.add("invalid");
    valid = false;
  } else if (name.length < 2) {
    nameError.textContent = "Name must be at least 2 characters.";
    nameInput.classList.add("invalid");
    valid = false;
  }

  if (!mobile) {
    mobileError.textContent = "Mobile number is required.";
    mobileInput.classList.add("invalid");
    valid = false;
  } else if (!/^\d{10}$/.test(mobile)) {
    mobileError.textContent = "Enter a valid 10-digit mobile number.";
    mobileInput.classList.add("invalid");
    valid = false;
  } else {
    // check duplicate mobile (ignore current editing record)
    const duplicate = students.find(
      (s) => s.mobile === mobile && s.id !== editingId
    );
    if (duplicate) {
      mobileError.textContent = "This mobile number is already registered.";
      mobileInput.classList.add("invalid");
      valid = false;
    }
  }

  if (!address) {
    addressError.textContent = "Address is required.";
    addressInput.classList.add("invalid");
    valid = false;
  }

  return valid;
}

// ---- Render ----
function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function render() {
  const filtered = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) || s.mobile.includes(term)
    );
  });

  studentCount.textContent = students.length;

  if (students.length === 0) {
    emptyState.classList.remove("hidden");
    studentList.innerHTML = "";
    return;
  }

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    emptyState.querySelector("p").textContent = "No students match your search.";
    studentList.innerHTML = "";
    return;
  }

  emptyState.classList.add("hidden");

  studentList.innerHTML = filtered
    .map(
      (s) => `
      <div class="student-card" data-id="${s.id}">
        <div class="student-info">
          <div class="avatar">${getInitials(s.name)}</div>
          <div class="student-text">
            <p class="student-name">${escapeHtml(s.name)}</p>
            <p class="student-meta">📱 ${escapeHtml(s.mobile)} · 📍 ${escapeHtml(s.address)}</p>
          </div>
        </div>
        <div class="student-actions">
          <button class="icon-btn edit-btn" title="Edit" data-action="edit" data-id="${s.id}">✏️</button>
          <button class="icon-btn delete-btn" title="Delete" data-action="delete" data-id="${s.id}">🗑️</button>
        </div>
      </div>
    `
    )
    .join("");
}

// ---- CRUD operations ----
function addStudent(data) {
  const newStudent = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    ...data,
  };
  students.unshift(newStudent);
  saveStudents();
  render();
  showToast("Student added successfully ✓");
}

function updateStudent(id, data) {
  students = students.map((s) => (s.id === id ? { ...s, ...data } : s));
  saveStudents();
  render();
  showToast("Student updated successfully ✓");
}

function deleteStudent(id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;
  const confirmed = confirm(`Delete "${student.name}"? This cannot be undone.`);
  if (!confirmed) return;
  students = students.filter((s) => s.id !== id);
  saveStudents();
  if (editingId === id) resetForm();
  render();
  showToast("Student deleted");
}

// ---- Form handling ----
function resetForm() {
  form.reset();
  studentIdInput.value = "";
  editingId = null;
  formTitle.textContent = "Add New Student";
  submitBtnText.textContent = "Add Student";
  cancelEditBtn.classList.add("hidden");
  [nameInput, mobileInput, addressInput].forEach((el) => el.classList.remove("invalid"));
  nameError.textContent = "";
  mobileError.textContent = "";
  addressError.textContent = "";
}

function startEdit(id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;

  editingId = id;
  studentIdInput.value = id;
  nameInput.value = student.name;
  mobileInput.value = student.mobile;
  addressInput.value = student.address;

  formTitle.textContent = "Edit Student";
  submitBtnText.textContent = "Update Student";
  cancelEditBtn.classList.remove("hidden");

  nameInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---- Event listeners ----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validate()) return;

  const data = {
    name: nameInput.value.trim(),
    mobile: mobileInput.value.trim(),
    address: addressInput.value.trim(),
  };

  if (editingId) {
    updateStudent(editingId, data);
  } else {
    addStudent(data);
  }
  resetForm();
});

cancelEditBtn.addEventListener("click", resetForm);

studentList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const { action, id } = btn.dataset;
  if (action === "edit") startEdit(id);
  if (action === "delete") deleteStudent(id);
});

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim();
  render();
});

// Live mobile input sanitization (digits only)
mobileInput.addEventListener("input", () => {
  mobileInput.value = mobileInput.value.replace(/\D/g, "").slice(0, 10);
});

// ---- Init ----
render();
