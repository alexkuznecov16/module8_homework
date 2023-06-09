// Array with images links
let images = ['img/slide1.jpg', 'img/slide2.jpg', 'img/slide3.jpg', 'img/slide4.jpg'];

// buttons vars
let btnPrevious = document.getElementById('prevImg');
let btnNext = document.getElementById('nextImg');

// slide vars
let slideImg = document.getElementById('slide');
let currentImg = 0;


// Event onclick - open previous slide
btnPrevious.addEventListener('click', () => {
    currentImg -= 1;
    if(currentImg < 0){
        currentImg = images.length - 1
    }

    // animation
    slideImg.style.opacity = 0;
    setTimeout(() => {
        slideImg.src = images[currentImg];
        slideImg.style.opacity = 1;
    }, 300);
})

// Event onclick - open next slide
btnNext.addEventListener('click', nextSlide);

// Here you can see a function, because I use it in interval
function nextSlide(){
    currentImg += 1;
    if(currentImg > (images.length - 1)){
        currentImg = 0
    }

    // animation
    slideImg.style.opacity = 0;
    setTimeout(() => {
        slideImg.src = images[currentImg];
        slideImg.style.opacity = 1;
    }, 300);
}


setInterval(nextSlide , 5000); // Every 5 seconds will be next slide