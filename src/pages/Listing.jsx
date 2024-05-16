import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { register } from 'swiper/element';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import { list } from 'firebase/storage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
register();

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const params = useParams();

  // const swiperElRef = useRef(null);

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
    <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper">
      {listing.imgUrls.map((url, index) => (
        <SwiperSlide key={index}>
          <Link to={`/category/sale/${params.listingId}/images`}>
            <img src={url} alt="" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>

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
        : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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

      <div className='leafletContainer'>
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[listing.geolocation.lat, listing.geolocation.lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
          />

          <Marker
            position={[listing.geolocation.lat, listing.geolocation.lng]}
          >
            <Popup>{listing.location}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {auth.currentUser?.uid !== listing.userRef && (
        <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>Contact Landlord</Link>
      )
      }

    </div>




  </main>;
}

export default Listing;
