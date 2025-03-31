import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Accounting = () => {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');

  useEffect(() => {
    window.api.invoke('get-data', 'accounting.json').then(setEntries);
    window.api.invoke('get-data', 'categories.json').then(setCategories);
  }, []);

  const addEntry = () => {
    //加上限制
    if (!amount) {
      alert('請輸入金額');
      return;
    }

    const newEntry = {
      id: Date.now(),
      type: 'expense',
      category,
      amount: parseFloat(amount) || 0,
      note,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...entries, newEntry];
    window.api.invoke('save-data', 'accounting.json', updated).then(() => {
      setEntries(updated);
      setNote('');
      setAmount('');
      setDate(new Date());
    });
  };

  return (
    <div>
      <h2>記帳功能</h2>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="amount" />
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="備註" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">請選擇分類</option>
        {categories.map(c => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>
      
      <DatePicker selected={date} onChange={(d) => setDate(d)} dateFormat="yyyy-MM-dd" />
      
      <button onClick={addEntry}>新增支出</button>
      <ul>
        {entries.map(e => <li key={e.id}>{e.date} - {e.amount} - {e.note}</li>)}
      </ul>
    </div>
  );
};

export default Accounting;