'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollbtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Scroll To Section 1
scrollbtn.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });
    section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target.tagName);
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
    // Other Way to do is to check if tag has href and can be done in that way too
    // if (e.target.hasAttribute('href')) {
    //     const id = e.target.getAttribute('href');
    //     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // }
    // Other Way to do is to check if tag has a and can be done in that way too
    // if (e.target.tagName === 'A' && e.target.getAttribute('href') !== '#') {
    //     const id = e.target.getAttribute('href');
    //     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // }
});

// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
    const clickedtab = e.target.closest('.operations__tab');
    if (!clickedtab) return;
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    clickedtab.classList.add('operations__tab--active');
    tabsContent.forEach(content => content.classList.remove('operations__content--active'));
    document
        .querySelector(`.operations__content--${clickedtab.dataset.tab}`)
        .classList.add('operations__content--active');
});

// Menu Fade Animation

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Lazy Loading Images

const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// Slider Component

let curSlide = 0;
const maxSlide = slides.length;

const gotoSlide = function (slide) {
    document.querySelectorAll('.slide').forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
}
const prevSlide = function () {
    curSlide = (curSlide - 1 + maxSlide) % maxSlide;
    gotoSlide(curSlide);
    activateDot(curSlide);
}
const nextSlide = function () {
    curSlide = (curSlide + 1) % maxSlide;
    gotoSlide(curSlide);
    activateDot(curSlide);
}
setInterval(nextSlide, 5000);
const createDots = function () {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
}

const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        curSlide = slide;
        document.querySelectorAll('.slide').forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
        });
        activateDot(slide);
    }
});
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
});
(function () {
    createDots();
    gotoSlide(0);
    activateDot(0);
})();