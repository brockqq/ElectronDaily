import React, { useRef, useState, useEffect } from 'react';
import ePub from 'epubjs';

const EpubReader = () => {
  const viewerRef = useRef(null);
  const bookRef = useRef(null);
  const renditionRef = useRef(null);
  const [hasBook, setHasBook] = useState(false);

  const openBook = async () => {
    const filePath = await window.epubApi.pickEpubFile();
    if (!filePath) return;
  
    // ✅ 清除舊的內容（避免殘留）
    if (renditionRef.current) {
      renditionRef.current.destroy();
      renditionRef.current = null;
    }
    if (bookRef.current) {
      bookRef.current.destroy();
      bookRef.current = null;
    }
  
    const buffer = await window.epubApi.readEpubFile(filePath);
    const book = ePub(buffer.buffer);
    bookRef.current = book;
  
    const rendition = book.renderTo(viewerRef.current, {
      width: '100%',
      height: '100%'
    });
    renditionRef.current = rendition;
  
    await rendition.display();
    setHasBook(true);
  };
  

  const goNext = () => renditionRef.current?.next();
  const goPrev = () => renditionRef.current?.prev();

  useEffect(() => {
    const handleKey = (e) => {
      if (!hasBook) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [hasBook]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '95vh',
        width: '95vw', // ✅ 寬度也滿版
        overflow: 'hidden', // ✅ 不要出現 scroll bar
      }}
    >
      <div style={{
        padding: '10px',
        background: '#f0f0f0',
        borderBottom: '1px solid #ccc'
      }}>
        <button onClick={openBook}>📂 選擇 EPUB</button>
        {hasBook && (
          <>
            <button onClick={goPrev} style={{ marginLeft: 10 }}>⬅️ 上一頁</button>
            <button onClick={goNext} style={{ marginLeft: 10 }}>➡️ 下一頁</button>
          </>
        )}
      </div>

      <div
        ref={viewerRef}
        style={{
          flexGrow: 1,
          overflow: 'hidden', // ✅ 禁止滾動條
          background: '#fff'
        }}
      />
    </div>
  );
};

export default EpubReader;
