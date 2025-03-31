import React, { useEffect, useState } from 'react';

const Diary = () => {
  const today = new Date().toISOString().split('T')[0];
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    window.api.invoke('get-data', 'diary.json').then(setEntries);
  }, []);

  const saveDiary = () => {
    const others = entries.filter(e => e.date !== today);
    const updated = [...others, { date: today, content }];
    window.api.invoke('save-data', 'diary.json', updated).then(() => {
      setEntries(updated);
      setContent('');
    });
  };

  return (
    <div>
      <h2>每日記錄</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="今天發生了什麼？" />
      <button onClick={saveDiary}>儲存日記</button>
      <ul>
        {entries.map(e => <li key={e.date}>{e.date} - {e.content}</li>)}
      </ul>
    </div>
  );
};

export default Diary;