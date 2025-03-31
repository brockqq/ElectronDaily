import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');

  useEffect(() => {
    window.api.invoke('get-data', 'wishlist.json').then(setItems);
  }, []);

  const addItem = () => {
    const newItem = { id: Date.now(), item, purchased: false };
    const updated = [...items, newItem];
    window.api.invoke('save-data', 'wishlist.json', updated).then(() => {
      setItems(updated);
      setItem('');
    });
  };

  return (
    <div>
      <h2>願望清單</h2>
      <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="想買的東西" />
      <button onClick={addItem}>新增願望</button>
      <ul>
        {items.map(i => <li key={i.id}>{i.item} - {i.purchased ? '✅' : '❌'}</li>)}
      </ul>
    </div>
  );
};

export default Wishlist;