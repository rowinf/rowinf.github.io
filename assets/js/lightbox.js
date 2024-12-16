import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

const lightbox = new PhotoSwipeLightbox({
    gallery: '.post-content figure',
    children: 'a',
    pswpModule: PhotoSwipe,
    initialZoomLevel: 'fit'
});
lightbox.init();