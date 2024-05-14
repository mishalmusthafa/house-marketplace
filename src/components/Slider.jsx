import { useState, useEffect } from 'react';
import { getDocs, doc, collection, query, orderBy, limit } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from './Spinner';
import { Pagination, Navigation, Zoom } from 'swiper/modules';


function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
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

  return listings && (
    <>
      <p className="exploreHeading">Recommended</p>
      <Swiper pagination={{ clickable: true }} modules={[Pagination]} slidesPerView={1}>
        {listings.map(({ data, id }) => (
          <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div className="swiperSlideDiv" style={{
              background: `url(${data.imgUrls[0]}) center no-repeat`,
              backgroundSize: 'cover',
              minHeight: '20rem'
            }}
            >
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                {data.discountedPrice ?? data.regularPrice}
                {' '}
                {data.type === 'rent' && ' / month'}
              </p>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
}

export default Slider;
