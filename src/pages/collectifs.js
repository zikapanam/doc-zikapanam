// src/pages/collectifs.js
import React, { useEffect, useState } from 'react';
import NoNavLayout from '../components/NoNavLayout';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const scrollToWithOffset = (id) => {
  const element = document.getElementById(id);
  const yOffset = -100;
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

const isValidImageUrl = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

const removeLinks = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/https?:\/\/[^\s]+/g, '');
};

const removeEmojis = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/[\u{1F600}-\u{1FAFF}\u{2600}-\u{27BF}]+/gu, '');
};

const capitalizeNames = (names) => names ? names.split(',')
  .map((name) => name.trim()
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('-'))
  .join(', ') : '';

const formatArrayAsText = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => removeLinks(item)).join(', ');
  }
  return removeLinks(data);
};

const CollectifsPage = () => {
  const [collectifs, setCollectifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/collectifs_data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const filteredData = Object.values(data)
          .filter((collectif) => collectif.intitule)
          .sort((a, b) =>
            removeEmojis(a.intitule).localeCompare(removeEmojis(b.intitule))
          );
        setCollectifs(filteredData);
      } catch (error) {
        setError('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCollectifs = collectifs
    .map((collectif) => ({
      ...collectif,
      lineups: (collectif.lineups || []).filter((lineup) => 
        removeEmojis(lineup.intitule_long || lineup.intitule_court || '').toLowerCase().includes(searchTerm) ||
        (lineup.style_musique && lineup.style_musique.toLowerCase().includes(searchTerm))
      )
    }))
    .filter((collectif) =>
      removeEmojis(collectif.intitule).toLowerCase().includes(searchTerm) ||
      (collectif.lineups && collectif.lineups.length > 0)
    );

  const toc = filteredCollectifs.map((collectif) => ({
    id: collectif.intitule,
    title: collectif.intitule,
    lineups: collectif.lineups,
  }));

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <NoNavLayout title="Collectifs et Lineups">
      <div style={{ padding: '20px' }}>
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <h2>Table des matières</h2>
          <input
            type="text"
            placeholder="Rechercher un collectif, lineup ou style de musique..."
            onChange={handleSearch}
            style={{
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              width: '100%',
              border: '1px solid #ddd',
            }}
          />
          {toc.map((collectif) => (
            <div key={collectif.id}>
              <a
                href={`#collectif-${collectif.id}`}
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToWithOffset(`collectif-${collectif.id}`);
                }}
              >
                {collectif.title}
              </a>
              <ul>
                {collectif.lineups.map((lineup, index) => (
                  <li key={index}>
                    <a 
                      href={`#lineup-${collectif.id}-${index}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToWithOffset(`lineup-${collectif.id}-${index}`);
                      }}
                    >
                      {lineup.intitule_long || lineup.intitule_court}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          {filteredCollectifs.map((collectif, index) => (
            <div
              key={index}
              id={`collectif-${collectif.intitule}`}
              style={{
                marginBottom: '40px',
                paddingBottom: '20px',
                borderBottom: '1px solid #ccc',
              }}
            >
              <div
                id={`anchor-${collectif.intitule}`}
                style={{ position: 'relative', top: '-80px' }}
              ></div>

              <h3>{removeLinks(collectif.intitule)}</h3>
              {collectif.intitule_court && <h4>{removeLinks(collectif.intitule_court)}</h4>}
              {collectif.recrutement_permanent && (
                <p className="recrutement-permanent">Recrutement permanent</p>
              )}
              {collectif.pseudo_zap && (
                <div><strong>Leader :</strong> {formatArrayAsText(collectif.pseudo_zap)}<br /></div>
              )}
              {collectif.jam_description && (
                <div className="markdown-container">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {removeLinks(collectif.jam_description)}
                  </ReactMarkdown>
                </div>
              )}
              {collectif.illustration_url && isValidImageUrl(collectif.illustration_url) && (
                <img
                  src={collectif.illustration_url}
                  alt={`${collectif.intitule} logo`}
                  style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                />
              )}
              {collectif.discord_presentation_url && (
                <p>
                  <a
                    href={collectif.discord_presentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Présentation Discord
                  </a>
                </p>
              )}

              <h4>Lineups</h4>
              <ul>
                {collectif.lineups.map((lineup, lineupIndex) => (
                  <li key={lineupIndex} id={`lineup-${collectif.intitule}-${lineupIndex}`}>
                    <p><strong>{removeLinks(lineup.intitule_long) || removeLinks(lineup.intitule_court)}</strong></p>
                    {lineup.referent_pseudo_zap && (
                      <div><strong>Référent :</strong> {formatArrayAsText(lineup.referent_pseudo_zap)}<br /></div>
                    )}
                    {lineup.prenoms_membres && (
                      <div><strong>Membres :</strong> {capitalizeNames(removeLinks(lineup.prenoms_membres))}<br /></div>
                    )}
                    {lineup.style_musique && (
                      <div><strong>Style(s) de musique :</strong> {lineup.style_musique}<br /></div>
                    )}
                    {lineup.phrase_accroche && (
                      <div className="markdown-container">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                          {removeLinks(lineup.phrase_accroche)}
                        </ReactMarkdown>
                      </div>
                    )}
                    {lineup.description && (
                      <div className="markdown-container">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                          {removeLinks(lineup.description)}
                        </ReactMarkdown>
                      </div>
                    )}
                    <br />
                  </li>
                ))}
              </ul>

              <p>
                <a href="#top" style={{ textDecoration: 'underline' }}>
                  Retour à la table des matières
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </NoNavLayout>
  );
};

export default CollectifsPage;
