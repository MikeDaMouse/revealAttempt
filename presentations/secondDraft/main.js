//SIDEBAR
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

//individual fullscreen
document.addEventListener("DOMContentLoaded", (event) => {
	let fullscreenElement = null;

	// Add fullscreen button to each "fullscreen-capable" div
	const fullscreenDivs = document.querySelectorAll(".fullscreen-capable");
	fullscreenDivs.forEach((div) => {
		const fullscreenBtn = document.createElement("button");
		fullscreenBtn.innerHTML = "&#x26F6;"; // Unicode fullscreen symbol
		fullscreenBtn.classList.add("fullscreen-btn");

		const closeBtn = document.createElement("button");
		closeBtn.innerHTML = "&times;"; // Unicode 'X' symbol
		closeBtn.classList.add("close-btn");

		fullscreenBtn.addEventListener("click", function () {
			if (screenfull.isEnabled) {
				screenfull.request(this.parentElement);
			}
		});

		closeBtn.addEventListener("click", function () {
			if (screenfull.isEnabled) {
				screenfull.exit();
			}
		});

		div.appendChild(fullscreenBtn);
		div.appendChild(closeBtn);
	});

	// Add fullscreen change event listener
	if (screenfull.isEnabled) {
		screenfull.on("change", () => {
			if (screenfull.isFullscreen) {
				fullscreenElement = screenfull.element;
				fullscreenElement.classList.add("fullscreen");

				const closeBtn = fullscreenElement.querySelector(".close-btn");
				closeBtn.style.display = "block";

				if (window.screen.orientation) {
					window.screen.orientation.lock("landscape");
				}
			} else {
				if (fullscreenElement) {
					fullscreenElement.classList.remove("fullscreen");

					const closeBtn = fullscreenElement.querySelector(".close-btn");
					closeBtn.style.display = "none";

					if (window.screen.orientation) {
						window.screen.orientation.unlock();
					}
				}
			}
		});
	}
});

//SLIDESHOW
var slideshowContainers = Array.from(
	document.querySelectorAll(".slideshowContainer")
);

slideshowContainers.forEach(function (slideshowContainer) {
	var container = slideshowContainer.querySelector(".slideshow-container");
	var slideWrappers = Array.from(
		slideshowContainer.querySelectorAll(".slide-wrapper")
	);
	var currentSlide = 0;

	function moveToSlide(n, instant) {
		if (instant) {
			container.style.opacity = 0;
			setTimeout(() => {
				container.scroll({
					left: slideWrappers[n].offsetLeft,
					behavior: "auto",
				});
			}, 300);
			setTimeout(() => {
				container.style.opacity = 1;
			}, 300);
		} else {
			container.scroll({
				left: slideWrappers[n].offsetLeft,
				behavior: "smooth",
			});
		}
	}

	slideshowContainer
		.querySelector(".arrow-right")
		.addEventListener("click", function () {
			var instant = currentSlide === slideWrappers.length - 1; // we want an instant scroll if we're going to the first slide
			currentSlide = (currentSlide + 1) % slideWrappers.length;
			moveToSlide(currentSlide, instant);
		});

	slideshowContainer
		.querySelector(".arrow-left")
		.addEventListener("click", function () {
			var instant = currentSlide === 0; // we want an instant scroll if we're going to the last slide
			currentSlide =
				(currentSlide - 1 + slideWrappers.length) % slideWrappers.length;
			moveToSlide(currentSlide, instant);
		});
});

document.querySelectorAll(".feature").forEach((feature) => {
	feature.addEventListener("click", function () {
		// Close all other dialogs
		document.querySelectorAll(".dialog").forEach((dialog) => {
			dialog.style.display = "none";
		});
		// Display this dialog
		this.querySelector(".dialog").style.display = "block";
	});

	// Add event listener to close button
	feature
		.querySelector(".close-dialog")
		.addEventListener("click", function (e) {
			this.parentElement.style.display = "none";

			e.stopPropagation(); // Prevent feature click event from triggering
		});
});

document.addEventListener("click", function (e) {
	if (!e.target.closest(".feature")) {
		document.querySelectorAll(".dialog").forEach((dialog) => {
			dialog.style.display = "none";
		});
	}
});

var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
