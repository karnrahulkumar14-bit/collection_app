import { Link } from "react-router-dom";

const Gallery = ({ slides = [] }) => {
  return (
    <div
      id="myCarousel"
      className="carousel slide mb-5 mt-5"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            {/* Image / Placeholder */}
            {slide.image ? (
              <img
                src={slide.image}
                className="d-block w-sm-25 h-xs-20 h-sm-50"
                alt={slide.title || "Slide"}
              />
            ) : (
              <svg
                className="bd-placeholder-img"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                />
              </svg>
            )}

            <div className="container">
              <div className={`carousel-caption ${slide.align || "text-center"}`}>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                {slide.buttonText && (
                  <p>
                    <Link
                      className="btn btn-lg btn-primary"
                      to={slide.buttonLink || "#"}
                    >
                      {slide.buttonText}
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Gallery;
