const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", name: "Front-End Web Development I", credits: 3, completed: false },
  { code: "CSE 110", name: "Programming Building Blocks", credits: 3, completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 3, completed: true }
];

const courseContainer = document.querySelector('#courses');
const totalCredits = document.querySelector('#totalCredits');

function displayCourses(courseList) {
  courseContainer.innerHTML = '';

  courseList.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');

    if (course.completed) {
      card.classList.add('completed');
    }

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    `;

    courseContainer.appendChild(card);
  });

  const credits = courseList.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = credits;
}

// Filter buttons
document.querySelector('#all').addEventListener('click', () => {
  displayCourses(courses);
});

document.querySelector('#wdd').addEventListener('click', () => {
  const wddCourses = courses.filter(course => course.code.startsWith('WDD'));
  displayCourses(wddCourses);
});

document.querySelector('#cse').addEventListener('click', () => {
  const cseCourses = courses.filter(course => course.code.startsWith('CSE'));
  displayCourses(cseCourses);
});

// Initial display
displayCourses(courses);
