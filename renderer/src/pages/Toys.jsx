import React, { useEffect, useState } from 'react';

const Toys = () => {
  const [toys, setToys] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    window.api.invoke('get-data', 'toys.json').then(setToys);
    window.api.invoke('get-data', 'toy_categories.json').then(setCategories);
    window.api.invoke('get-data', 'toy_brands.json').then(setBrands);
  }, []);

  const addToy = () => {
    const newToy = {
      id: Date.now(),
      name,
      category,
      brand,
      purchase_date: new Date().toISOString().split('T')[0]
    };
    const updated = [...toys, newToy];
    window.api.invoke('save-data', 'toys.json', updated).then(() => {
      setToys(updated);
      setName('');
      setCategory('');
      setBrand('');
    });
  };

  return (
    <div>
      <h2>玩具清單</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="玩具名稱" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">分類</option>
        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>
      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value="">廠牌</option>
        {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
      </select>
      <button onClick={addToy}>新增玩具</button>
      <ul>
        {toys.map(t => (
          <li key={t.id}>{t.purchase_date} - {t.name} - {t.category} - {t.brand}</li>
        ))}
      </ul>
    </div>
  );
};

export default Toys;