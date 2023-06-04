function openRightWindow(windowIndex) {
	let rightWindows = document.getElementsByClassName("right-window");
	let people = document.getElementsByClassName("test");

	for (let i = 0; i < rightWindows.length; i++) {
		rightWindows[i].style.display = "none";
	}

	// Remove 'selected' class from all 'test' divs
	for (let i = 0; i < people.length; i++) {
		people[i].classList.remove("selected");
	}

	// Add 'selected' class to selected div
	document.getElementById(`div${windowIndex}`).classList.add("selected");

	document.getElementById(`right-window${windowIndex}`).style.display = "block";
	openTab(windowIndex, 1);
}

function openTab(windowIndex, tabIndex) {
	let tabContents = document.querySelectorAll(
		`#right-window${windowIndex} .tab-content`
	);
	let tabButtons = document.querySelectorAll(
		`#right-window${windowIndex} .tab-button`
	);

	for (let i = 0; i < tabContents.length; i++) {
		tabContents[i].style.display = "none";
		tabButtons[i].classList.remove("active");
	}

	document.querySelector(
		`#right-window${windowIndex} #tab${(windowIndex - 1) * 3 + tabIndex}`
	).style.display = "block";
	tabButtons[tabIndex - 1].classList.add("active");
}
// Get all the grid-item elements
let gridItems = document.getElementsByClassName("grid-item");

// Add click event listeners to each grid-item
for (let i = 0; i < gridItems.length; i++) {
	gridItems[i].addEventListener("click", function () {
		// Get the description from the clicked item's data-desc attribute
		let desc = this.getAttribute("data-desc");

		// Update the description div with the new description
		document.getElementById("description").textContent = desc;
	});
}

var typewrites = document.querySelectorAll(".typewrite");

// loop through each element
for (let i = 0; i < typewrites.length; i++) {
	// get the element and its data-text attribute
	let typewrite = typewrites[i];
	let text = typewrite.getAttribute("data-text");

	// declare variables for index, speed and started flag
	let index = 0;
	let speed = 80; // milliseconds
	let started = false; // flag to indicate if the animation has started

	// define a type function for this element
	function type() {
		if (index < text.length) {
			typewrite.textContent += text.charAt(index);
			index++;
			setTimeout(type, speed);
		}
	}

	// listen for the slidechanged event
	Reveal.addEventListener("slidechanged", function (event) {
		// check if the current slide contains this element
		if (event.currentSlide.contains(typewrite)) {
			// check if the animation has not started yet
			if (!started) {
				// start the animation and set the flag to true
				type();
				started = true;
			}
		}
	});
}

var sidenav = document.getElementById("mySidenav");
var hamburger = document.querySelector(".hamburger");

function toggleNav() {
	if (sidenav.classList.contains("open")) {
		closeNav();
	} else {
		openNav();
	}
}

function openNav() {
	sidenav.classList.add("open");
	hamburger.classList.add("open");
}

function closeNav() {
	closeAllDropdowns();
	sidenav.classList.remove("open");
	hamburger.classList.remove("open");
}

function toggleDropdown(id) {
	closeAllPopups();
	var dropdown = document.getElementById(id);
	var chevron = dropdown.previousElementSibling.querySelector(".chevron");
	if (dropdown.style.maxHeight) {
		dropdown.style.maxHeight = null;
		chevron.style.transform = "rotate(0deg)";
	} else {
		closeAllDropdowns();
		dropdown.style.maxHeight = dropdown.scrollHeight + "px";
		chevron.style.transform = "rotate(90deg)";
	}
}

function closeAllDropdowns() {
	var dropdowns = document.getElementsByClassName("dropdown-content");
	var chevrons = document.getElementsByClassName("chevron");
	for (var i = 0; i < dropdowns.length; i++) {
		dropdowns[i].style.maxHeight = null;
		chevrons[i].style.transform = "rotate(0deg)";
	}
}

function showPopup(id) {
	closeAllPopups();
	var popup = document.getElementById(id);
	popup.style.display = "block";
	popup.style.maxHeight = popup.scrollHeight + "px";
}

function closeAllPopups() {
	var popups = document.getElementsByClassName("popup");
	for (var i = 0; i < popups.length; i++) {
		popups[i].style.display = "none";
		popups[i].style.maxHeight = null;
	}
}
