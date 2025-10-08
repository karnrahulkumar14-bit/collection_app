import PHOTO1 from '../assets/images/PHOTO1.jpg';
import PHOTO2 from '../assets/images/PHOTO2.jpg';
import neeraj from '../assets/images/neeraj.jpg';
import vikaram from '../assets/images/vikaram.jpg';
import pushakar from '../assets/images/pushakar.jpg';
import RK from '../assets/images/RK.jpg';
import Gallery from '../components/Gallery';
import TeamMembers from '../components/TeamMembers';

const About = () => {
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
  const cardsData = [
    {
      id:1,
      image:vikaram,
      title:"Vikaram kumar karn (Captain)",
      desc:"Age: 18Y"
    },
    {
      id: 2,
      image: neeraj,
      title: "Neeraj kumar karn (Lieutenant)",
      desc: "Age: 19Y"
    },
    {
      id: 3,
      image:pushakar,
      title:"Pushkar kumar karn (Lieutenant)",
      desc:"Age: 17Y"
    },
    {
      id: 4,
      image: RK,
      title: "Rahul Kumar (Technical support)",
      desc: "Age: 27Y"
    }
  ]
  return (
    <>
      <section>
        <div className="container">
          <Gallery slides={slidesData} />
          <TeamMembers cards={cardsData}/>
        </div>
      </section>
    </>
  )
}

export default About
