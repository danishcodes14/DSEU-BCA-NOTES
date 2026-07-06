id="fixcards"
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      card.classList.add("show");
    }
  });
});

const links = document.querySelectorAll(".nav-links li a");
const indicator = document.querySelector(".nav-indicator");

links.forEach(link => {
  link.addEventListener("mouseenter", (e) => {
    const rect = e.target.getBoundingClientRect();
    const parentRect = e.target.parentElement.parentElement.getBoundingClientRect();

    indicator.style.left = (rect.left - parentRect.left) + "px";
    indicator.style.width = rect.width + "px";
  });
});

const active = document.querySelector(".nav-links a.active");

if (active) {
  const rect = active.getBoundingClientRect();
  const parentRect = active.parentElement.parentElement.getBoundingClientRect();

  indicator.style.left = (rect.left - parentRect.left) + "px";
  indicator.style.width = rect.width + "px";
}

indicator.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;

        const revealTop = element.getBoundingClientRect().top;

        const revealPoint = 100;

        if(revealTop < windowHeight - revealPoint){
            element.classList.add("active");
        }

    });

});

const exploreBtn = document.getElementById("exploreBtn");
const subjectsSection = document.getElementById("subjects-section");

exploreBtn.addEventListener("click", () => {

    subjectsSection.classList.toggle("show-subjects");

    if(subjectsSection.classList.contains("show-subjects")){

        subjectsSection.scrollIntoView({
            behavior: "smooth"
        });

    }

});

const text = " SUBJECTS";

const typingElement = document.getElementById("typingText");

let index = 0;

let isDeleting = false;

function typeLoop() {

    if(!isDeleting){

        typingElement.innerHTML = text.substring(0, index + 1);

        index++;

        if(index === text.length){

            isDeleting = true;

            setTimeout(typeLoop, 1200);

            return;
        }

    } else {

        typingElement.innerHTML = text.substring(0, index - 1);

        index--;

        if(index === 0){

            isDeleting = false;
        }
    }

    setTimeout(typeLoop, isDeleting ? 50 : 140);
}

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            typeLoop();

            observer.unobserve(entry.target);
        }
    });

}, { threshold: 0.5 });

observer.observe(document.querySelector(".subjects-heading"));
