import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import { list } from 'firebase/storage';

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      setListing(docSnap.data());
      setLoading(false);
    };

    fetchListing();
  }, [params.listingId, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return <main>
    {/* Slider goes here */}
    <div className="shareIconDiv" onClick={async () => {

      await navigator.clipboard.writeText(window.location.href);
      setShareLinkCopied(true);

      setTimeout(() => {
        setShareLinkCopied(true);
      }, 2000);
    }}>
      <img src={shareIcon} alt="" />
    </div>
    {shareLinkCopied && <p className='linkCopied'>Link Copied</p>}

    <div className="listingDetails">
      <p className="listingName">{listing.name} - ${listing.offer
        ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : listing.regularPricetoString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
      </p>
      <p className="listingLocation">{listing.location}</p>
      <p className="listingType">For {listing.type}</p>
      {listing.offer && (
        <p className="discountPrice">$ {listing.regularPrice - listing.discountedPrice} discount</p>
      )}

      <ul className='listingDetailsList'>
        <li>{listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}</li>
        <li>{listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bedroom'}</li>
        <li>{listing.parking && 'Parking Spot'}</li>
      </ul>

      <p className="listingLocationTitle">Location</p>
      {/* map goes here */}

      {auth.currentUser?.uid !== listing.useRef && (
        <Link to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`} className='primaryButton'>Contact Landlord</Link>
      )
      }

    </div>




  </main>;
}

export default Listing;
