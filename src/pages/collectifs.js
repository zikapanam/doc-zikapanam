// src/pages/collectifs.js
import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Vérifie si l'URL est une image
const isValidImageUrl = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

// Fonction pour retirer les liens internet des descriptions et des intitulés
const removeLinks = (text) => {
  if (!text) return '';
  return text.replace(/https?:\/\/[^\s]+/g, '');
};

const CollectifsPage = () => {
  const [collectifs, setCollectifs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement des données JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/collectifs_data.json'); // Chemin vers le fichier JSON
        const data = await response.json();

        // Filtre les collectifs avec intitulé et les trie alphabétiquement
        const filteredData = Object.values(data)
          .filter(collectif => collectif.intitule) // Ignore les collectifs sans intitulé
          .sort((a, b) => a.intitule.localeCompare(b.intitule));

        setCollectifs(filteredData);
      } catch (error) {
        console.error("Erreur lors du chargement des données JSON :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (!collectifs || collectifs.length === 0) {
    return <p>Aucune donnée disponible.</p>;
  }

  // Génère la table des matières avec collectifs et lineups triés
  const toc = collectifs.map((collectif) => ({
    id: collectif.intitule,
    title: collectif.intitule,
    lineups: (collectif.lineups || [])
      .filter(lineup => lineup.intitule_long || lineup.intitule_court)
      .sort((a, b) => (a.intitule_long || a.intitule_court).localeCompare(b.intitule_long || b.intitule_court))
  }));

  return (
    <Layout title="Index des Collectifs Musicaux">
      <div style={{ padding: '20px' }}>
        <h1>Index Alphabétique des Collectifs et Lineups</h1>

        {/* Table des matières */}
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Table des matières</h2>
          {toc.map((collectif) => (
            <div key={collectif.id}>
              <a href={`#collectif-${collectif.id}`} style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{collectif.title}</a>
              <ul>
                {collectif.lineups.map((lineup, index) => (
                  <li key={index}>
                    <a href={`#lineup-${collectif.id}-${index}`}>{lineup.intitule_long || lineup.intitule_court}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affichage des Collectifs et Lineups */}
        <div>
          {collectifs.map((collectif, index) => (
            <div key={index} id={`collectif-${collectif.intitule}`} style={{ marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #ccc' }}>
              <h3>{removeLinks(collectif.intitule)}</h3>
              {collectif.intitule_court && <h4>{removeLinks(collectif.intitule_court)}</h4>}
              
              {collectif.recrutement_permanent && (
                <p className="recrutement-permanent">Recrutement permanent</p>
              )}

              {collectif.jam_description && (
                <div className="markdown-container">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{removeLinks(collectif.jam_description)}</ReactMarkdown>
                </div>
              )}
              {collectif.illustration_url && isValidImageUrl(collectif.illustration_url) && (
                <img src={collectif.illustration_url} alt={`${collectif.intitule} logo`} style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
              )}
              {collectif.discord_presentation_url && (
                <p><a href={collectif.discord_presentation_url} target="_blank" rel="noopener noreferrer">Présentation Discord</a></p>
              )}

              <h4>Lineups</h4>
              <ul>
                {collectif.lineups
                  .filter(lineup => lineup.intitule_long || lineup.intitule_court) // Ignore les lineups sans intitulé
                  .sort((a, b) => (a.intitule_long || a.intitule_court).localeCompare(b.intitule_long || b.intitule_court))
                  .map((lineup, lineupIndex) => (
                    <li key={lineupIndex} id={`lineup-${collectif.intitule}-${lineupIndex}`}>
                      <strong>{removeLinks(lineup.intitule_long) || removeLinks(lineup.intitule_court)}</strong>
                      {lineup.style_musique && (
                        <p><strong>Style(s) de musique :</strong> {lineup.style_musique.join(', ')}</p>
                      )}
                      {lineup.phrase_accroche && (
                        <div className="markdown-container">
                          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{removeLinks(lineup.phrase_accroche)}</ReactMarkdown>
                        </div>
                      )}
                      {lineup.description && (
                        <div className="markdown-container">
                          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{removeLinks(lineup.description)}</ReactMarkdown>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>

              {/* Lien de retour à la table des matières */}
              <p><a href="#top" style={{ textDecoration: 'underline' }}>Retour à la table des matières</a></p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CollectifsPage;
