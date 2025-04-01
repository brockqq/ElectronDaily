import React, { useEffect, useState } from 'react';
import Accounting from './pages/Accounting';
import Toys from './pages/Toys';
import Diary from './pages/Diary';
import Wishlist from './pages/Wishlist';
import Reminders from './pages/Reminders';
import Categories from './pages/Category';
import ToyCtegories from './pages/ToyCategory';
import ToyBrand from './pages/ToyBrand';

const App = () => {
  const [currentPage, setCurrentPage] = useState('accounting');

  useEffect(() => {
    if (window.api?.onNavigate) {
      window.api.onNavigate((page) => {
        setCurrentPage(page);
      });
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'accounting': return <Accounting />;
      case 'toys': return <Toys />;
      case 'diary': return <Diary />;
      case 'wishlist': return <Wishlist />;
      case 'reminders': return <Reminders />;
      case 'categories': return <Categories />;
      case 'ToyCtegories': return <ToyCtegories />;
      case 'ToyBrand': return <ToyBrand />;
      default: return <Accounting />;
    }
  };

  return (
    <div>
      <main style={{ padding: 20 }}>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
