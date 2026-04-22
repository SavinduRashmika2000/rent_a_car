import React from 'react';
import Header from '../components/Home/Header';
import Hero from '../components/Home/Hero';
import SearchSection from '../components/Home/SearchSection';
import Categories from '../components/Home/Categories';
import TopDeals from '../components/Home/TopDeals';

const Home = () => {
  return (
    <div className="px-5 md:px-8 pt-6 lg:pt-10 pb-28 md:pb-12">
      <Header />
      <Hero />
      <SearchSection />
      <Categories />
      <TopDeals />
    </div>
  );
};

export default Home;
