
import Report from '../components/Report';
import god from '../assets/images/god.jpg';
import PHOTO1 from '../assets/images/PHOTO1.jpg';
import PHOTO2 from '../assets/images/PHOTO2.jpg';
import Gallery from '../components/Gallery';

const slidesData = [
  {
    id: 1,
    image: PHOTO1
  },
  {
    id: 2,
    image: PHOTO2
  }
];
const Home = () => {
  return (
    <div className='home-section'>
      <div className='container'>
        <div className="two-col-section">
          <div className="card mb-3 mt-3 border-0 shadow-sm rounded-3 pt-4 pb-4 ">
            <h1 className='heading font-l text-center secondary-font'>ॐ श्री चित्रगुप्ताय नमः। ॐ</h1>
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
        <Gallery slides={slidesData} />
        
      </div>
    </div>
  )
}

export default Home