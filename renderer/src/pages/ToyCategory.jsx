import React, { useEffect, useState } from 'react';

const ToyCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    window.api.invoke('get-data', 'toy_categories.json').then(setCategories);
  }, []);

  const addCategory = () => {
    const newCat = { id: Date.now(), name };
    const updated = [...categories, newCat];
    window.api.invoke('save-data', 'toy_categories.json', updated).then(() => {
      setCategories(updated);
      setName('');
    });
  };

  const deleteCategory = (id) => {
    const updated = categories.filter(c => c.id !== id);
    window.api.invoke('save-data', 'toy_categories.json', updated).then(() => {
      setCategories(updated);
    });
  };

  return (
    <div>
      <h2>玩具分類維護</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="分類名稱" />
      <button onClick={addCategory}>新增分類</button>
      <ul>
        {categories.map(c => (
          <li key={c.id}>{c.name} <button onClick={() => deleteCategory(c.id)}>刪除</button></li>
        ))}
      </ul>
    </div>
  );
};

export default ToyCategory;