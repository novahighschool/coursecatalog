let coursesData;

fetch("courses.json")
  .then((response) => response.json())
  .then((data) => {
    coursesData = data;
    filterCourses();
  })
  .catch((error) => console.error("Error loading courses:", error));

// Function to create course card
function createCourseCard(course) {
  return `
        <div class="course-card">
            <div class="course-number">${course.courseNumber}</div>
            <h2 class="course-title">${course.title}</h2>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span>Grades: ${course.grades}</span>
                
                ${course.prerequisites ? `<span>Prerequisites: ${course.prerequisites}</span>`: ""}
                ${course.creditEquivalency ? `<span>Credit-by-Exam Equivalency: ${course.creditEquivalency}</span>`: ""}
                
            </div>
            
        </div>
    `;
}

// Function to filter courses
function filterCourses() {
  const subject = document.getElementById("subjectFilter").value;
  const type = document.getElementById("typeFilter").value;
  const search = document.getElementById("searchFilter").value.toLowerCase();

  const filteredCourses = coursesData.courses.filter((course) => {
    const subjectMatch = !subject || course.subject === subject;
    const typeMatch = !type || course.type === type;
    const searchMatch =
      !search ||
      course.title.toLowerCase().includes(search) ||
      course.description.toLowerCase().includes(search) ||
      course.courseNumber.toLowerCase().includes(search);

    return subjectMatch && typeMatch && searchMatch;
  });

  const courseGrid = document.getElementById("courseGrid");
  courseGrid.innerHTML = filteredCourses.map(createCourseCard).join("");
}

// event listeners for filters
document
  .getElementById("subjectFilter")
  .addEventListener("change", filterCourses);
document.getElementById("typeFilter").addEventListener("change", filterCourses);
document
  .getElementById("searchFilter")
  .addEventListener("input", filterCourses);
