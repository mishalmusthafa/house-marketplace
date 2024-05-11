import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged, } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function CreateListing() {
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });


  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
        }
      });
    }
  }, [isMounted]);

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const onMutate = (e) => {
    let boolean;

    if (e.target.value === 'true') {
      boolean = true;
    }

    if (e.target.value === 'false') {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData({
        ...formData,
        images: e.target.files
      });
    }

    // Text / Numbers / Boolean
    if (!e.target.files) {
      setFormData({
        ...formData,
        [e.target.id]: boolean ?? e.target.value
      });
    }

  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Sell / Rent</label>

          <div className="formButtons">
            <button type='button' className={type === 'sale' ? 'formButtonActive' : 'formButton'}
              id='type' value='sale' onClick={onMutate}
            >Sell</button>
            <button type='button' className={type === 'rent' ? 'formButtonActive' : 'formButton'}
              id='type' value='rent' onClick={onMutate}
            >Rent</button>
          </div>

          {/* Name */}
          <label className="formLabel">Name</label>
          <input type="text" className="formInputName" id='name' value={name} onChange={onMutate} maxLength='32' minLength='10' required />

          {/* Form rooms */}
          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input type="number" className="formInputSmall" id='bedrooms' value={bedrooms} onChange={onMutate} min='1' max='80' required />
            </div>
            <div>
              <label className="formLabel">Bathrooms</label>
              <input type="number" className="formInputSmall" id='bathrooms' value={bathrooms} onChange={onMutate} min='1' max='80' required />
            </div>
          </div>

          {/* Parking */}
          <label className="formLabel">Parking Spot</label>
          <div className="formButtons">
            <button type='button' className={parking ? 'formButtonActive' : 'formButton'} id='parking' value={true} onClick={onMutate} >Yes</button>
            <button type='button' className={!parking ? 'formButtonActive' : 'formButton'} id='parking' value={false} onClick={onMutate} >No</button>
          </div>

          {/* Furnished */}
          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button type='button' className={furnished ? 'formButtonActive' : 'formButton'} id='furnished' value={true} onClick={onMutate} >Yes</button>
            <button type='button' className={!furnished ? 'formButtonActive' : 'formButton'} id='furnished' value={false} onClick={onMutate} >No</button>
          </div>

          {/* Address */}
          <label className="formLabel">Address</label>
          <textarea id='address' className='formInputAddress' value={address} onChange={onMutate} required></textarea>

          {!geoLocationEnabled && <div className='formLatLng flex'>
            <div>
              <label className='formLabel'>Latitude</label>
              <input
                className='formInputSmall'
                type='number'
                id='latitude'
                value={latitude}
                onChange={onMutate}
                required
              />
            </div>
            <div>
              <label className='formLabel'>Longitude</label>
              <input
                className='formInputSmall'
                type='number'
                id='longitude'
                value={longitude}
                onChange={onMutate}
                required
              />
            </div>
          </div>}

          {/* Offer */}
          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button type='button' className={offer ? 'formButtonActive' : 'formButton'} id='offer' value={true} onClick={onMutate} >Yes</button>
            <button type='button' className={!offer ? 'formButtonActive' : 'formButton'} id='offer' value={false} onClick={onMutate} >No</button>
          </div>

          {/* Regular Price */}
          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              className="formInputSmall"
              type="number"
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              max='72000000'
              min='50'
              required />
            {type === 'rent' && (<p className='formPriceText'>$ / Month</p>)}
          </div>

          {/* OfferPrice */}
          {offer && (
            <>
              <div className="formLabel">Discounted Price</div>
              <div className="formPriceDiv">

                <input type="number" className="formInputSmall" id='discountedPrice' onChange={onMutate} value={discountedPrice} min='50' max='75000000' required={offer} />
                {type === 'rent' && (<p className='formPriceText'>$ / Month</p>)}

              </div>
            </>
          )}

          {/* Form image */}
          <label className="formLabel">Images</label>
          <p className="imageInfo">The first image will be the cover (max 6).</p>
          <input type="file" className='formInputFile'
            id='image' onChange={onMutate} max='6'
            min='1' accept='.jpg, .png, .jpeg' multiple required />

          <button type='submit' className='primaryButton createListingButton'>Create Listing</button>
        </form>
      </main>
    </div >
  );

}

export default CreateListing;
