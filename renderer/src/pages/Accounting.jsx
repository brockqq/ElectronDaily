import React, { useEffect, useState } from 'react';

const Accounting = () => {
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    window.api.invoke('get-data', 'accounting.json').then(setEntries);
  }, []);

  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      type: 'expense',
      category: 'food',
      amount: parseFloat(amount) || 0,
      note,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...entries, newEntry];
    window.api.invoke('save-data', 'accounting.json', updated).then(() => {
      setEntries(updated);
      setNote('');
      setAmount('');
    });
  };

  return (
    <div>
      <h2>記帳功能</h2>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="amount" />
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="備註" />
      <button onClick={addEntry}>新增支出</button>
      <ul>
        {entries.map(e => <li key={e.id}>{e.date} - {e.amount} - {e.note}</li>)}
      </ul>
    </div>
  );
};

export default Accounting;