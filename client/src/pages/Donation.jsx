
import Collection from '../components/Collection';
import Report from '../components/Report';

const Donation = () => {
  return (
    <>
      <div className='container'>
        <Report />
        <Collection hideItems={true} />
      </div>
    </>
  )
}

export default Donation