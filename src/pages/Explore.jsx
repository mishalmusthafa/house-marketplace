import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Explore() {
  return <div className='explore'>
    <header>
      <p className="pageHeader">Explore</p>
    </header>
    <main>
      {/* Slider */}
      <div className="exploreCategoryHeading">Categories</div>
      <div className="exploreCategories">
        <Link to='/categories/rent' >
          <img src={rentCategoryImage} alt="rent" className='exploreCategoryImg' />
          <p className="exploreCategoryName">Places for Rent</p>
        </Link>
        <Link to='/categories/sale'>
          <img src={sellCategoryImage} alt="sell" className='exploreCategoryImg' />
          <p className="exploreCategoryName">Places for Sell</p>
        </Link>
      </div>

    </main>
  </div>;
}

export default Explore;
