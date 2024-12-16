import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

const lightbox = new PhotoSwipeLightbox({
    gallery: 'figure',
    children: 'a',
    pswpModule: PhotoSwipe,
    initialZoomLevel: 1,
    secondaryZoomLevel: 1.5,
    maxZoomLevel: 2,
    showHideAnimationType: 'zoom'
});
lightbox.init();