import { useState, useEffect, } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function Contact() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [landlord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, 'users', params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
        setLandlord(docSnap.data());
      } else {
        setLoading(false);
        toast.error('Landlord data not found');
      }
    };

    getLandLord();
  }, [params.landlord]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  if (loading) {
    return <Spinner />;
  }
  return <div className='pageContainer'>
    <header>
      <p className="pageHeader">Contact Landlord</p>
    </header>
    {landlord !== null ? (
      <main>
        <div className='contactLandlord'>
          <p className='landlordName'>Contact {landlord.name}</p>
        </div>
        <form className='messageForm' >
          <div className="messageDiv">
            <label htmlFor="message" className="messageLabel">Message</label>
            <textarea name='message' id='message' className='textarea' value={message} onChange={onChange}></textarea>
          </div>
          <a href={`mailto:${landlord.email}?subject=${searchParams.get('listingName')}&body=${message}`}>
            <button className="primaryButton" type='button'>
              Contact Landlord
            </button>
          </a>
        </form>
      </main>
    )
      : (<main>
        <div className='contactLandlord'>
          <p className='landlordName'>No Landlord details found</p>
        </div>
      </main>
      )
    }
  </div>;
}

export default Contact;
