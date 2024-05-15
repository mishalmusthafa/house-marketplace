import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';



function Profile() {
  const auth = getAuth();

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });


  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };




  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        });

        // update name in fireStore 
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListing = listings.filter((listing) => listing.id !== listingId);
      setListings(updatedListing);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnap = await getDocs(q);
      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }


  return <div className='profile'>
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
      <button className="logOut" type='button' onClick={onLogout}>Logout</button>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className="personalDetailsText">Profile Details</p>
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit();
          setChangeDetails(!changeDetails);
        }} >
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>
      <div className="profileCard">
        <form >

          <input type="text" id='name'
            className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />

          <input type="text"
            id='email'
            className='profileEmail'
            disabled={true}
            value={email}
            onChange={onChange}
          />
        </form>
      </div>
      <Link to='/create-listing' className='createListing'>
        <img src={homeIcon} alt="home" />
        <p>Sell or rent your Home</p>
        <img src={arrowRight} alt="arrow right" />

      </Link>

      {listings && listings.length > 0 && (
        <>
          <p className='listingText'>Your Listitngs</p>
          <ul className="listingList">
            {listings.map((listing) => (
              <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={() => onDelete(listing.id)} />
            ))}
          </ul>
        </>

      )}
    </main>
  </div>;
}

export default Profile;
