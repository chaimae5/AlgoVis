// Responsive Navbar
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}
  
// For the Carousel
var mySwiper = new Swiper('.mySwiper', {
  loop: true, // Optional loop mode
  autoplay: {
    delay: 0, // Delay in ms between slides. Adjust as needed.
    disableOnInteraction: false, // Continue autoplay on user interactions
  },
  speed: 10000,          //add
  // Responsive breakpoints
  breakpoints: {
    // when window width is <= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is <= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  }
});