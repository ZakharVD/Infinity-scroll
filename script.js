const imageContainer = document.getElementById('image-container');
const loaded = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API 
let fetchCount = 30;
const apiKey = 'A_7o7bWPNdP-W6HUvX3ULoO0ISVQBs34VDMPl1Od-Xg';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${fetchCount}`; 

//check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log(`ready = ${ready}`)
        fetchCount = 30;
    }
}

// Displaying photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(`total images = ${totalImages}`)
    photosArray.forEach((photo) =>{
        // create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // check if loaded
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Data fetching
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        return (`somwthing went wrong, error: ${error}`)
    }
}

// loading more photos when at the bottom of the page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos();