import React, { useRef } from 'react';
import ePub from 'epubjs';

const EpubReader = () => {
  const viewerRef = useRef(null);

  const openBook = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.epub';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const book = ePub(url);
      const rendition = book.renderTo(viewerRef.current, {
        width: '100%',
        height: '600px'
      });
      rendition.display();
    };
    input.click();
  };

  return (
    <div>
      <h2>EPUB 閱讀器</h2>
      <button onClick={openBook}>選擇 EPUB 檔案</button>
      <div ref={viewerRef} style={{ border: '1px solid #ccc', marginTop: 10 }} />
    </div>
  );
};

export default EpubReader;