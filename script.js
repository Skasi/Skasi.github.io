// classes for IE 9&10 specific CSS
if (navigator.userAgent.indexOf("MSIE 10") != -1 || navigator.userAgent.indexOf("MSIE 9") != -1) {
	$("html").addClass("ie9or10")
}


// NAVBAR
var navbar = document.getElementById("navbar")
// HIDE NAVBAR BACKGROUND WHILE AT THE TOP OF THE WEBSITE
var navbg = false
function toggleNavbarBackground() {
	if ((document.documentElement.scrollTop || document.body.scrollTop) === 0 && navbg) {
		navbg = false
		navbar.className = navbar.className.replace(" background", "")
	} else if ((document.documentElement.scrollTop || document.body.scrollTop) > 0 && !navbg) {
		navbg = true
		navbar.className += " background"
	}
}
$(window).scroll(toggleNavbarBackground)
toggleNavbarBackground()


// HIGHLIGHT NAVBAR LINKS WHEN SCROLLING
// get all navlinks
var navlinks = document.querySelectorAll("#extranav a")
var highlightPairs = []
// loop through navlinks, for each of them find an element where the id is the same as the navlinks href but without the #
for (var i = 0; i < navlinks.length; i++) {
	var href = navlinks[i].getAttribute("href")
	var targetElement = document.getElementById(href.slice(href.indexOf("#")+1))
	highlightPairs.push({ anchor: navlinks[i], target: targetElement })
}
// get that elements' top/bottom coordinates
// then whenever scrolling, check if the browser's top is between one such elements' top and bottom; do that in another for loop, but if one is found, then break
var currentPair
function navbarHighlighter() {
	// Edge case for last pair (bottom most element can often be smaller than window height)
	if ($(window).scrollTop() + $(window).height() == $(document).height()) {
		if (currentPair)
			currentPair.anchor.className = currentPair.anchor.className.replace(" highlighted", "")
			
		highlightPairs[highlightPairs.length-1].anchor.className += " highlighted"
		currentPair = highlightPairs[highlightPairs.length-1]
		
		return
	}
	
	// (documentElement || body) for cross-browser-support
	var top = $(window).scrollTop() + navbar.offsetHeight
	
	// Check if current navlink still highlighted
	if (currentPair && currentPair.target.offsetTop <= top && currentPair.target.offsetTop + currentPair.target.offsetHeight > top) {
		// current navlink still highlighted
		return
	} else if (currentPair) {
		// no longer highlighted
		currentPair.anchor.className = currentPair.anchor.className.replace(" highlighted", "")
		currentPair = null
	}
	
	// Highlight new navlink
	for (var i = 0; i < highlightPairs.length; i++) {
		var anchor = highlightPairs[i].anchor
		var target = highlightPairs[i].target
		
		var targetTop = target.offsetTop
		var targetBottom = targetTop + target.offsetHeight
		if (targetTop <= top && targetBottom > top) {
			anchor.className += " highlighted"
			currentPair = highlightPairs[i]
		}
	}
}
$(window).scroll(navbarHighlighter)
$(window).resize(navbarHighlighter) // resizing can move around content, thus recalculation happens
navbarHighlighter()


// NAV MENU FOR MOBILE
$("#menutoggle").click(function() {
	$(this).html($(this).html() == 'MENU' ? 'X CLOSE' : 'MENU')
	$("#navbar").toggleClass("expanded")
})


// LEARN MORE BUTTON
$("#learnmore").click(function() {
	document.querySelector("#about").scrollIntoView({ 
		behavior: "smooth"
	})
})


// TOGGLE QUOTES FOR TEAMMEMBERS
var teammembers = document.getElementsByClassName("teammember")
for (var i = 0; i < teammembers.length; i++) {
	teammembers[i].onclick = function() {
		if (this.className.indexOf("flipped") === -1) {
			this.className += " flipped"
		} else {
			this.className = this.className.replace("flipped", "")
		}
	}
}


// TEAM SLIDER FOR MOBILE
var sliderEnabled = false
var maxWidthForSlider = 800
function toggleSlick(){
	var $windowWidth = $(window).width()
	if ($windowWidth <= maxWidthForSlider && !sliderEnabled) {
		sliderEnabled = true
		$('.memberlist').slick(
			{
				dots: true,
				variableWidth: true,
				swipe: false,
				centerMode: true,
				initialSlide: 2,
			}
		)
	} else if ($windowWidth > maxWidthForSlider && sliderEnabled) {
		sliderEnabled = false
		$('.memberlist').slick("unslick")
	}
}
$(document).ready(toggleSlick)
$(window).resize(toggleSlick)


// GALLERY
var galleryoverlay = document.getElementsByClassName("galleryoverlay")[0]
var display = document.getElementsByClassName("display")[0]
var imagedescription = document.getElementsByClassName("imagedescription")[0]
var currentimage
// closing overlay
var hidedoverlay = document.getElementsByClassName("hidedoverlay")[0]
hidedoverlay.onclick = function() {
	galleryoverlay.className = galleryoverlay.className.replace("expanded", "")
}
// previous image button
var previousimage = document.getElementsByClassName("previousimage")[0]
previousimage.onclick = function() {
	currentimage --
	if (currentimage === -1)
		currentimage = thumbs.length-1
	display.src = $(thumbs[currentimage]).data("imagepath")
	imagedescription.innerHTML = $(thumbs[currentimage]).data("imagetext")
}
// next image button
var nextimage = document.getElementsByClassName("nextimage")[0]
nextimage.onclick = function() {
	currentimage ++
	if (currentimage === thumbs.length)
		currentimage = 0
	display.src = $(thumbs[currentimage]).data("imagepath")
	imagedescription.innerHTML = $(thumbs[currentimage]).data("imagetext")
}
// clicking on thumbnails
var thumbs = document.getElementsByClassName("thumbnail")
for (var i = 0; i < thumbs.length; i++) {
	thumbs[i].onclick = (function(i) {
		return function() {
			currentimage = i
			display.src = $(this).data("imagepath")
			imagedescription.innerHTML = $(this).data("imagetext")
			galleryoverlay.className += " expanded"
		}
	})(i)
}


// VERIFY CONTACT INFO
// First name validation
$("#firstname").change(function() {
	if (/^[a-zA-Z-'´ \xc0-\xd6\xd8-\xf6\xf8-\xff]+$/.test($(this).val())) {
		// valid
		$("#firstnamevalidation").html("")
		$(this).removeClass("invalid")
		$(this).addClass("valid")
	} else {
		// invalid
		$("#firstnamevalidation").html("Sorry, that's no valid first name")
		$(this).removeClass("valid")
		$(this).addClass("invalid")
	}
})
// Last name validation
$("#lastname").change(function() {
	if (/^[a-zA-Z-'´ \xc0-\xd6\xd8-\xf6\xf8-\xff]+$/.test($(this).val())) {
		// valid
		$("#lastnamevalidation").html("")
		$(this).removeClass("invalid")
		$(this).addClass("valid")
	} else {
		// invalid
		$("#lastnamevalidation").html("Sorry, that's no valid last name")
		$(this).removeClass("valid")
		$(this).addClass("invalid")
	}
})
// Email validation - TODO: Adjust based on backend
$("#email").change(function() {
	if (/[^@]+@[^@]+\.[^@]/.test($(this).val())) {
		// valid
		$("#emailvalidation").html("")
		$(this).removeClass("invalid")
		$(this).addClass("valid")
	} else {
		// invalid
		$("#emailvalidation").html("Sorry, that's no valid E-Mail address")
		$(this).removeClass("valid")
		$(this).addClass("invalid")
	}
})