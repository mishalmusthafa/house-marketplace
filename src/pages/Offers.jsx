import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter, } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { list } from 'firebase/storage';
import ListingItem from '../components/ListingItem';

function Offers() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const [listingsCompleted, setListingsCompleted] = useState(false);


  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(5)
        );

        // Execute query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);



        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
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

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');

      // Create a query
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(5),
        startAfter(lastFetchedListing)
      );

      // Execute query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);


      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });

      setListings((prevState) => ([...prevState, ...listings]));
      setListingsCompleted(querySnap.empty);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  };


  return <div className='category'>
    <header>
      <p className="pageHeader">
        Offers
      </p>
    </header>
    {loading ?
      <Spinner /> :
      listings && listings.length > 0 ?
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {listingsCompleted ? <p className='noLoadText'>No More Listings</p> : (
            <p className='loadMore' onClick={onFetchMoreListings}>Load More</p>
          )
          }
        </>
        : <p>There are no current offers</p>
    }
  </div>;
}

export default Offers;
