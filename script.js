/* TH PAGINATION-FILTER
1. When the page loads, your program should hide all but the first 10 students in the list.
2. Look at the HTML in the example-meets.html on lines 119-137 -- this is an example of the markup you'll need to add dynamically to the index.html page to create pagination links.
3. Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.
4. When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.
5. Your program should work for any number of students. There are 54 students in index.html, but you can test your code by adding the JavaScript file your write to the other lists of students we’ve provided in the student-list-examples folder.
6. Before you submit your project for review, make sure you can check off all of the items on the Student Project Submission Checklist. The checklist is designed to help you make sure you’ve met the grading requirements and that your project is complete and ready to be submitted!

EXTRA CREDIT
1. Include a search component so that a user could search for a particular student or students. See the file example-exceeds.html and lines 16-19 for what the markup for the search component should look like.
2. When the "Search" button is clicked, the list of students is filtered to match the search. For example if the name Phillip is typed into the box list all students whose name or email includes Phillip.
3. If no matches are found by the search, include a message in the HTML to tell the user there are no matches.
*/

let itemsPerPage = 10;
let studentItems = document.getElementsByClassName('student-item');
let numOfPages = Math.ceil(studentItems.length/itemsPerPage);
let currentPage = 1;



// Function to perform the page change
let displayPage = (pageToDisplay) => {
  // Highlights selected pagination link
  pageToDisplay.className = 'active';
  currentPageNum = pageToDisplay.innerHTML;

  // Hides all student items
  for (let i = 0; i < studentItems.length; i += 1) {
     studentItems[i].style.display = 'none';
  }
  // Makes correct student items visible
  for (let i = (currentPageNum -1) * itemsPerPage; i < (currentPageNum * itemsPerPage) && i < studentItems.length; i++) {
      studentItems[i].style.display = 'block';
  }
}



// Dynamically add HTML structure for pagination links
let paginationSection = document.createElement('div');
  paginationSection.className = 'pagination';
  paginationSection.innerHTML = '<ul>';
  let paginationList = paginationSection.querySelector('ul');

  for (let i = 1; i < numOfPages+1; i += 1) {
    paginationList.innerHTML += '<li><a href="#">' + i + '</a></li>';
  }

  let page = document.getElementsByClassName('page')[0];
  page.append(paginationSection);



// Display only first 10 student items on the first page upon loading
let pageOne = paginationList.querySelector('a[href="#"]');
displayPage(pageOne);



// Add event listener/handler to page links
let a = document.querySelectorAll('a[href="#"]');
for (let i = 0; i < a.length; i += 1) {
      a[i].addEventListener('click', () => {
      document.querySelector('.active').removeAttribute('class');
      displayPage(event.target);
  });
}



// Add search input field and button to the page header
let searchSection = document.createElement('div');
  searchSection.className = 'student-search';

  let searchField = document.createElement('input');
  searchField.type = 'search';
  searchField.id = 'input';
  searchField.placeholder = 'Search for students...';

  let searchButton = document.createElement('button');
  searchButton.type = 'button';
  searchButton.innerHTML= 'Search';

  let pageHeader = document.querySelector('.page-header');
  searchSection.appendChild(searchField);
  searchSection.appendChild(searchButton);
  pageHeader.appendChild(searchSection);



// Message to display when no matches are found
let noResultsMessage = document.createElement('div');
  noResultsMessage.innerHTML = 'No Matches Found';



// Search functionality
searchButton.addEventListener('click', () => {
  let userInput = document.getElementById('input').value.toUpperCase();
  let noMatch = 0;
  noResultsMessage.style.display = 'none';

  // Check if user input matches any student names
  for (let i = 0; i < studentItems.length; i += 1) {
    let studentName = studentItems[i].getElementsByTagName('h3')[0];
    if (studentName.innerHTML.toUpperCase().indexOf(userInput) > -1 && userInput !== ' ') {
        studentItems[i].style.display = 'block';
    }  else {
        studentItems[i].style.display = 'none';
        noMatch += 1;
    }
    paginationSection.style.display = 'none';
  }

  // If no matches are found, display 'No Matches Found' message
  if (noMatch === studentItems.length) {
    page.append(noResultsMessage);
    noResultsMessage.style.display = 'block';
  }

  // If search input returns blank, reset student list
  if (userInput === '') {
      document.querySelector('.active').removeAttribute('class');
      displayPage(pageOne);
      paginationSection.style.display = 'block';
  }
});
