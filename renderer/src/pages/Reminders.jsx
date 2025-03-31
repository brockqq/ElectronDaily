import React, { useEffect, useState } from 'react';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    window.api.invoke('get-data', 'reminders.json').then(setReminders);
  }, []);

  const addReminder = () => {
    const newReminder = { id: Date.now(), title, remind_time: new Date().toISOString() };
    const updated = [...reminders, newReminder];
    window.api.invoke('save-data', 'reminders.json', updated).then(() => {
      setReminders(updated);
      setTitle('');
    });
  };

  return (
    <div>
      <h2>提醒功能</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="提醒事項" />
      <button onClick={addReminder}>新增提醒</button>
      <ul>
        {reminders.map(r => <li key={r.id}>{r.remind_time} - {r.title}</li>)}
      </ul>
    </div>
  );
};

export default Reminders;