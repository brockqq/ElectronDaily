import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Accounting = () => {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');
  const pad = (n) => n.toString().padStart(2, '0');

  const getLocalDateString = (date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };
  useEffect(() => {
    window.api.invoke('get-data', 'accounting.json').then(setEntries);
    window.api.invoke('get-data', 'categories.json').then(setCategories);
  }, []);

  const addEntry = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('請輸入有效的金額');
      return;
    }
    if (!category) {
      setError('請選擇分類');
      return;
    }

    const newEntry = {
      id: Date.now(),
      type: 'expense',
      category,
      amount: parseFloat(amount),
      note,
      date: getLocalDateString(date)
    };

    const updated = [...entries, newEntry];
    window.api.invoke('save-data', 'accounting.json', updated).then(() => {
      setEntries(updated);
      setAmount('');
      setNote('');
      setCategory('');
      setDate(new Date());
      setError('');
    });
  };

  return (
    <div>
      <h2>記帳功能</h2>
      <div style={{ color: 'red' }}>{error}</div>
      <ul>
        <li>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="金額" />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">請選擇分類</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <DatePicker selected={date} onChange={(d) => setDate(d)} dateFormat="yyyy-MM-dd" />
        </li>
        <li>


          <input style={{ width: '100%' }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="備註" />
        </li>
      </ul>
      <button onClick={addEntry}>新增支出</button>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>日期</th>
            <th>金額</th>
            <th>分類</th>
            <th>備註</th>
          </tr>
        </thead>
        <tbody>
          {entries.sort((a, b) => {
            // 合併日期和 id 做排序
            const aTime = new Date(a.date).getTime() + a.id;
            const bTime = new Date(b.date).getTime() + b.id;
            return bTime - aTime; // 倒序排列
          }).map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.note}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
};

export default Accounting;