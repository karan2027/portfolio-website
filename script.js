window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => { loader.classList.add("hide"); }, 800);
});

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => { menu.classList.toggle("active"); });

const typingText = document.getElementById("typing");
const roles = ["Full Stack Developer", "Frontend Developer", "B.Tech CSE Student", "Internship Aspirant"];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex--);
  } else {
    typingText.textContent = currentRole.substring(0, charIndex++);
  }
  if (!isDeleting && charIndex === currentRole.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}
typeEffect();

const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    projects.forEach(project => {
      const category = project.getAttribute("data-category");
      project.style.display = filter === "all" || filter === category ? "block" : "none";
    });
  });
});

const revealElements = document.querySelectorAll(".reveal");
function revealOnScroll() {
  revealElements.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "" || email === "" || message === "") {
    formMsg.textContent = "Please fill all fields.";
    return;
  }
  if (!emailPattern.test(email)) {
    formMsg.textContent = "Please enter a valid email address.";
    return;
  }

  formMsg.textContent = "Opening email app...";
  const mailLink = `mailto:chhotelalkushwahak9628@gmail.com?subject=Portfolio Contact from ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
  window.location.href = mailLink;
  contactForm.reset();
});

const galleryData = {
  electroshop: [
    { title: "ElectroShop - HomePage", src: "assets/electroshop-homepage.png" },
    { title: "ElectroShop - AllProducts", src: "assets/electroshop-all-products.png" },
    { title: "ElectroShop - AllLaptop", src: "assets/electroshop-all-laptop.png" },
    { title: "ElectroShop - HP Laptop", src: "assets/electroshop-hp-laptop.png" },
    { title: "ElectroShop - Product Detail", src: "assets/electroshop-product-detail.png" },
    { title: "ElectroShop - CartSection", src: "assets/electroshop-cart-section.png" },
    { title: "ElectroShop - MyOrders", src: "assets/electroshop-my-orders.png" },
    { title: "ElectroShop - CompareProducts", src: "assets/electroshop-compare-products.png" },
    { title: "ElectroShop - SearchProducts", src: "assets/electroshop-search-products.png" },
    { title: "ElectroShop - Search Result", src: "assets/electroshop-search-result.png" }
  ],
  portfolio: [
    { title: "Portfolio Website", src: "assets/portfolio.png" }
  ]
};

let currentGallery = [];
let currentIndex = 0;
const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryTitle = document.getElementById("galleryTitle");
const closeGallery = document.getElementById("closeGallery");
const prevImg = document.getElementById("prevImg");
const nextImg = document.getElementById("nextImg");

function showGalleryImage() {
  const item = currentGallery[currentIndex];
  galleryImage.src = item.src;
  galleryImage.alt = item.title;
  galleryTitle.textContent = `${item.title} (${currentIndex + 1}/${currentGallery.length})`;
}

document.querySelectorAll(".gallery-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const galleryName = btn.getAttribute("data-gallery");
    currentGallery = galleryData[galleryName] || [];
    if (!currentGallery.length) return;
    currentIndex = 0;
    showGalleryImage();
    galleryModal.style.display = "flex";
  });
});

nextImg.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showGalleryImage();
});
prevImg.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showGalleryImage();
});
closeGallery.addEventListener("click", () => { galleryModal.style.display = "none"; });
galleryModal.addEventListener("click", e => {
  if (e.target === galleryModal) {
    galleryModal.style.display = "none";
  }
});
