import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';

const reviewPromies=fetch('/reviews.json').then(res=>res.json())
const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <Brands></Brands>
           <Reviews reviewPromies={reviewPromies}></Reviews>
        </div>
    );
};

export default Home;