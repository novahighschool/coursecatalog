let coursesData;

fetch("courses.json")
  .then((response) => response.json())
  .then((data) => {
    coursesData = data;
    
    data.courses.sort((a, b) => a.title.localeCompare(b.title));
  
    console.log(coursesData);
    filterCourses();
  })
  .catch((error) => console.error("Error loading courses:", error));







// SCROLL TO TOP 
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
  
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'  // scrolls slowly, not instantly
  });
}






// Function to create course card
function createCourseCard(course) { 
  return `
        <div class="course-card">
            <div class="course-number">${course.courseNumber}</div>
            <h2 class="course-title">${course.title}</h2>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                
                ${course.grades ? `<span>Grades: ${course.grades}</span>`: ""}
                ${course.prerequisites ? `<span>Prerequisites: ${course.prerequisites}</span>`: ""}
                ${course.creditEquivalency ? `<span>Credit-by-Exam Equivalency for College Credit: ${course.creditEquivalency}</span>`: ""}
                ${course.aiceCategory ? `<span>AICE Category: ${course.aiceCategory}</span>`: ""}
                
            </div>
        </div>
    `;
}




// Function to filter courses
function filterCourses() {
  const subject = document.getElementById("subjectFilter").value;
  const type = document.getElementById("typeFilter").value;
  const search = document.getElementById("searchFilter").value.toLowerCase();
  
  console.log("Filtering with:", { subject, type, search });

  const filteredCourses = coursesData.courses.filter(course => {
    const subjectMatch = !subject || course.subject === subject;
    const typeMatch = !type || course.type === type;
    const searchMatch =
      !search || 
      course.description?.toLowerCase().includes(search) ||
      course.title?.toLowerCase().includes(search) ||
      course.courseNumber?.toLowerCase().includes(search) ||
      course.prerequisites?.toLowerCase().includes(search) ||
      course.creditEquivalency?.toLowerCase().includes(search) ||
      course.grades?.toLowerCase().includes(search) ||
      course.aiceCategory?.toLowerCase().includes(search);
    return subjectMatch && typeMatch && searchMatch;
  });
  .sort((a, b) => a.title.localeCompare(b.title));
  
  console.log("Filtered Courses:", filteredCourses);
  
  const courseGrid = document.getElementById("courseGrid");
  courseGrid.innerHTML = filteredCourses.map(createCourseCard).join("");
}





// event listeners for filters
document.getElementById("subjectFilter").addEventListener("change", filterCourses);
document.getElementById("typeFilter").addEventListener("change", filterCourses);
document.getElementById("searchFilter").addEventListener("input", filterCourses);

