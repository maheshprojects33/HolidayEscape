/* ============================================
   Holiday Escape — Pure Vanilla JavaScript
   ============================================ */
// ---------- Smooth Scroll ----------
function smoothScroll(selector) {
  closeMobileMenu();
  var el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
// ---------- Navbar Scroll Effect ----------
(function () {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();
// ---------- Mobile Menu ----------
function toggleMenu() {
  var menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}
function closeMobileMenu() {
  var menu = document.getElementById('mobileMenu');
  menu.classList.remove('open');
}
// ---------- Select Package & Scroll to Booking ----------
function selectPackageAndScroll(packageName) {
  smoothScroll('#booking');
  setTimeout(function () {
    var select = document.getElementById('booking-package');
    if (select) {
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].text === packageName) {
          select.selectedIndex = i;
          break;
        }
      }
    }
  }, 800);
}
// ---------- Toast Notification ----------
function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}
// ---------- Booking Form ----------
(function () {
  var form = document.getElementById('bookingFormEl');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    // Clear errors
    var errFields = ['name', 'email', 'phone', 'package', 'date', 'travelers'];
    errFields.forEach(function (f) {
      document.getElementById('bookErr-' + f).textContent = '';
    });
    var fd = new FormData(form);
    var name = fd.get('name');
    var email = fd.get('email');
    var phone = fd.get('phone');
    var pkg = fd.get('package');
    var date = fd.get('date');
    var travelers = fd.get('travelers');
    if (!name) { document.getElementById('bookErr-name').textContent = 'Name is required'; valid = false; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { document.getElementById('bookErr-email').textContent = 'Valid email is required'; valid = false; }
    if (!phone || phone.length < 7) { document.getElementById('bookErr-phone').textContent = 'Valid phone number is required'; valid = false; }
    if (!pkg) { document.getElementById('bookErr-package').textContent = 'Please select a package'; valid = false; }
    if (!date) { document.getElementById('bookErr-date').textContent = 'Travel date is required'; valid = false; }
    if (!travelers || Number(travelers) < 1) { document.getElementById('bookErr-travelers').textContent = 'At least 1 traveler'; valid = false; }
    if (!valid) return;
    // Save to localStorage
    var booking = {};
    fd.forEach(function (val, key) { booking[key] = val; });
    booking.timestamp = new Date().toISOString();
    var existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    existing.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existing));
    // Show success
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';
    showToast('Booking submitted successfully!');
  });
})();
function resetBooking() {
  document.getElementById('bookingFormEl').reset();
  document.getElementById('bookingSuccess').style.display = 'none';
  document.getElementById('bookingForm').style.display = 'block';
}
// ---------- Enquiry Form ----------
(function () {
  var form = document.getElementById('enquiryFormEl');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    ['name', 'email', 'message'].forEach(function (f) {
      document.getElementById('enqErr-' + f).textContent = '';
    });
    var fd = new FormData(form);
    var name = fd.get('name');
    var email = fd.get('email');
    var message = fd.get('message');
    if (!name) { document.getElementById('enqErr-name').textContent = 'Name is required'; valid = false; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { document.getElementById('enqErr-email').textContent = 'Valid email required'; valid = false; }
    if (!message) { document.getElementById('enqErr-message').textContent = 'Message is required'; valid = false; }
    if (!valid) return;
    var enquiry = {};
    fd.forEach(function (val, key) { enquiry[key] = val; });
    enquiry.timestamp = new Date().toISOString();
    var existing = JSON.parse(localStorage.getItem('enquiries') || '[]');
    existing.push(enquiry);
    localStorage.setItem('enquiries', JSON.stringify(existing));
    document.getElementById('enquiryForm').style.display = 'none';
    document.getElementById('enquirySuccess').style.display = 'block';
    showToast('Enquiry sent successfully!');
  });
})();
function resetEnquiry() {
  document.getElementById('enquiryFormEl').reset();
  document.getElementById('enquirySuccess').style.display = 'none';
  document.getElementById('enquiryForm').style.display = 'block';
}
// ---------- Scroll Animations (Intersection Observer) ----------
(function () {
  var elements = document.querySelectorAll('.animate-on-scroll');
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(function (el) { observer.observe(el); });
})();
