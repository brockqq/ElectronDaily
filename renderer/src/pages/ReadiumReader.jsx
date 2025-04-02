import React, { useEffect, useState } from 'react';
import { PublicationNavigator } from 'r2-navigator-js/dist/es6-esm/src/electron/renderer/index';

const ReadiumReader = () => {
  const [manifestUrl, setManifestUrl] = useState(null);

  const openBook = async () => {
    const filePath = await window.readiumApi.pickEpubFile();
    if (!filePath) return;
    const manifest = await window.readiumApi.openEpub(filePath);
    setManifestUrl(manifest);
  };

  useEffect(() => {
    openBook();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {manifestUrl ? (
        <PublicationNavigator manifestUrl={manifestUrl} />
      ) : (
        <p>Loading EPUB...</p>
      )}
    </div>
  );
};

export default ReadiumReader;