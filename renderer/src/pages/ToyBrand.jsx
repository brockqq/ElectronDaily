import React, { useEffect, useState } from 'react';

const ToyBrand = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    window.api.invoke('get-data', 'toy_brands.json').then(setBrands);
  }, []);

  const addBrand = () => {
    const newBrand = { id: Date.now(), name };
    const updated = [...brands, newBrand];
    window.api.invoke('save-data', 'toy_brands.json', updated).then(() => {
      setBrands(updated);
      setName('');
    });
  };

  const deleteBrand = (id) => {
    const updated = brands.filter(b => b.id !== id);
    window.api.invoke('save-data', 'toy_brands.json', updated).then(() => {
      setBrands(updated);
    });
  };

  return (
    <div>
      <h2>玩具廠牌維護</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="廠牌名稱" />
      <button onClick={addBrand}>新增廠牌</button>
      <ul>
        {brands.map(b => (
          <li key={b.id}>{b.name} <button onClick={() => deleteBrand(b.id)}>刪除</button></li>
        ))}
      </ul>
    </div>
  );
};

export default ToyBrand;