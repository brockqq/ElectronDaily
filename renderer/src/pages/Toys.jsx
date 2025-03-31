import React, { useEffect, useState } from 'react';

const Toys = () => {
  const [toys, setToys] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    window.api.invoke('get-data', 'toys.json').then(setToys);
  }, []);

  const addToy = () => {
    const newToy = { id: Date.now(), name, purchase_date: new Date().toISOString().split('T')[0] };
    const updated = [...toys, newToy];
    window.api.invoke('save-data', 'toys.json', updated).then(() => {
      setToys(updated);
      setName('');
    });
  };

  return (
    <div>
      <h2>玩具清單</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="玩具名稱" />
      <button onClick={addToy}>新增玩具</button>
      <ul>
        {toys.map(t => <li key={t.id}>{t.purchase_date} - {t.name}</li>)}
      </ul>
    </div>
  );
};

export default Toys;