// settings up the Unsplash API
const apiKey = "2IM-jqPNHREytZ4fZavb3qjw9g-UikdyHu-yVUvBKR0"
const count = 10
const apiUrl = `https://api.unsplash.com/photos/random?count=${count}&client_id=${apiKey}`

let arrayGallery = []
let ready = false
let imagesLaded = 0
let totalImages = 0

const galleryContainer = document.querySelector('#box')
const err = document.querySelector('#error')
const loading = document.getElementById("loading");

// Check if the images loaded equals the total number of images to display more images
function imageLaded (){
    imagesLaded++
    if(totalImages === imagesLaded){
        ready = true
    }
}

//  set elements attributes for the gallery container
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create the gallery container and attach it to the document
function displayImage() {
    totalImages = arrayGallery.length
    imagesLaded = 0
    arrayGallery.forEach((photo) => {
        const item = document.createElement('a')
        setAttribute(item, {
            'href': photo.links.html,
            'target': '_blank'
        })

        const imageElement = document.createElement('img')
        setAttribute(imageElement, {
            'alt': photo.alt_description,
            'title': photo.alt_description,
            'src': photo.urls.regular
        })
        imageLaded()
        item.appendChild(imageElement)
        galleryContainer.appendChild(item)
    })
    loading.classList.remove('show');
}

// get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        arrayGallery = await response.json()
        displayImage()
    } catch (error) {
        err.textContent = "OOPS! Something went wrong ... "
    }
}

getPhotos() // get photos

// check to see if scrolling is near the bottom of the page , load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        showLoading();
    }
})

// loading animation
function showLoading() {
    loading.classList.add('show');
    getPhotos()
    ready = false
}