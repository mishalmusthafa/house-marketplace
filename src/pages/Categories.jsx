import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { list } from 'firebase/storage';

function Categories() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings');
      }
    };
    fetchListings();
  }, []);


  return <div className='category'>
    <header>
      <p className="pageHeader">
        {params.categoryName === 'rent' ? 'Places for Rent' : 'Places for Sale'}
      </p>
    </header>
    {loading ?
      <Spinner /> :
      listings.length > 0 ?
        <>
          <main>
            {console.log(listings)}
            <ul className="categoryListings">
              {listings.map((listing) => {
                console.log(listing.data.name);
                <p>{listing.data.name}</p>;
              })}
            </ul>
          </main>
        </>
        : <p>No listings found</p>
    }
  </div>;
}

export default Categories;
