import { useState } from "react";
import Report from '../components/Report';
import god from '../assets/images/god.jpg';
import IMG_1911 from '../assets/images/IMG_1911.jpg';
import IMG_1912 from '../assets/images/IMG_1913.jpg';
import IMG_1913 from '../assets/images/IMG_1912.jpg';
import IMG_1914 from '../assets/images/IMG_1914.jpg';
import IMG_1915 from '../assets/images/IMG_1915.jpeg';
import IMG_1918 from '../assets/images/IMG_1918.jpeg';
import IMG_1920 from '../assets/images/IMG_1920.jpeg';
import PHOTO1 from '../assets/images/PHOTO1.jpg';
import PHOTO2 from '../assets/images/PHOTO2.jpg';

const images = [
  { id: 7, src: IMG_1920, alt: "Gallery image 7" },
  { id: 1, src: IMG_1911, alt: "Gallery image 1" },
  { id: 5, src: IMG_1915, alt: "Gallery image 5" },
  { id: 2, src: IMG_1912, alt: "Gallery image 2" },
  { id: 3, src: IMG_1913, alt: "Gallery image 3" },
  { id: 4, src: IMG_1914, alt: "Gallery image 4" },
  { id: 6, src: IMG_1918, alt: "Gallery image 6" },
  { id: 9, src: PHOTO1, alt: "Gallery image 7" },
  { id: 8, src: PHOTO2, alt: "Gallery image 8" },
];

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className='home-section'>
      <div className='container'>
        <div className="two-col-section">
          <div className="card mb-3 mt-3 border-0 shadow-sm rounded-3 pt-4 pb-4 ">
            <h1 className='heading font-l text-center secondary-font'>ॐ श्री चित्रगुप्ताय नमः। ॐ <br/> <span>FAITH · COMMUNITY · TOGETHER</span></h1>
            <div className="row g-0 align-items-center">
              <div className="col-sm-12 col-md-4 wow animate__fadeInUp">
                <img src={god} className="img-fluid rounded-start" alt="God" />
              </div>
              <div className="col-sm-12 col-md-8">
                <div className="card-body">
                  <h3 className="card-title secondary-font wow animate__fadeInUp" style={{color:"var(--third-color)"}}>प्रार्थना श्लोक</h3>
                  <p className="card-text secondary-font fs-4 wow animate__fadeIn">
                      कायस्थ कुलदैवाय चित्रगुप्ताय वै नमः।  <br/>
                      लेखन्यां कमठे चैव सुपूज्याय नमो नमः॥
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Report />
        <div className="gallary-section">
          <div className="img-gallary py-4">
            {/* Gallery */}
            <div className="row g-4">
              {images.map((image, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={image.id}>
                  <div className="gallery-item">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="img-fluid w-100"
                      onClick={() => openLightbox(index)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox */}
            {selectedIndex !== null && (
              <div className="lightbox-overlay" onClick={closeLightbox}>
                <button
                  className="lightbox-close"
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                >
                  &times;
                </button>

                <button
                  className="lightbox-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrevious();
                  }}
                  aria-label="Previous image"
                >
                  &#10094;
                </button>

                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  className="lightbox-image"
                  onClick={(e) => e.stopPropagation()}
                />

                <button
                  className="lightbox-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next image"
                >
                  &#10095;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home