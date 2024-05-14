import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { Pagination, Navigation, Zoom } from 'swiper/modules';
import closeIcon from '../assets/svg/times.svg';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


function Images() {

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      setListing(docSnap.data());
      setLoading(false);
    };

    fetchListing();
  }, [params.listingId]);



  const handleRedirect = () => {
    navigate('/');
  };

  if (loading) {
    return <Spinner />;
  }

  // return (
  //   <div className="swiperContainer">
  //     <Swiper style={{
  //       '--swiper-navigation-color': '#000',
  //       '--swiper-pagination-color': '#000',
  //     }} pagination={{
  //       type: 'progressbar',
  //     }}
  //       navigation={true}
  //       zoom={true}
  //       modules={[Pagination, Navigation, Zoom]}
  //       className="mySwiper swiper-slide-full-container">

  //       {listing.imgUrls.map((url, index) => (
  //         <SwiperSlide key={index}>
  //           <div className="swiper-zoom-container ">
  //             <img src={url} alt="" className='fullImage' />
  //           </div>
  //         </SwiperSlide>
  //       ))}

  //     </Swiper>

  //     <div className="closeIconDiv" onClick={() => navigate(-1)}>
  //       <img src={closeIcon} alt="" />
  //     </div>
  //   </div>

  // );

  return (
    <div className="swiperContainer">
      <Swiper style={{
        '--swiper-navigation-color': '#000',
        '--swiper-pagination-color': '#000',
      }} pagination={{
        type: 'progressbar',
      }}
        navigation={true}
        zoom={true}
        modules={[Pagination, Navigation, Zoom]}
        className="mySwiper swiper-slide-full-container">

        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container ">
              <img src={url} alt="" className='fullImage' />
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

      <div className="closeIconDiv" onClick={() => navigate(-1)}>
        <img src={closeIcon} alt="" />
      </div>
    </div>

  );

}

export default Images;
