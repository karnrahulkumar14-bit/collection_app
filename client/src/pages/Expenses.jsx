import Spend from '../components/Spend';
import Report from '../components/Report';

const Expenses = () => {
    return (
        <>
            <div className='container'><Report /> <Spend hideIcon={true} /></div>
           
        </>
    )
}

export default Expenses