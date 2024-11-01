// src/pages/collectifs.js
import React, { useEffect, useState } from 'react';
import NoNavLayout from '../components/NoNavLayout';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Fonction de scroll avec un décalage personnalisé
const scrollToWithOffset = (id) => {
  const element = document.getElementById(id);
  const yOffset = -100; // Ajustez le décalage ici
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

// Vérifie si l'URL est une image
const isValidImageUrl = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

// Fonction pour retirer les liens internet des descriptions et des intitulés
const removeLinks = (text) => {
  if (!text) return '';
  return text.replace(/https?:\/\/[^\s]+/g, '');
};

// Fonction pour retirer les emojis d'un texte
const removeEmojis = (text) => {
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+/gu, '');
};

const CollectifsPage = () => {
  const [collectifs, setCollectifs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement des données JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/collectifs_data.json');
        const data = await response.json();

        // Filtre et trie les collectifs par intitulé sans emojis
        const filteredData = Object.values(data)
          .filter((collectif) => collectif.intitule)
          .sort((a, b) =>
            removeEmojis(a.intitule).localeCompare(removeEmojis(b.intitule))
          );

        setCollectifs(filteredData);
      } catch (error) {
        console.error('Erreur lors du chargement des données JSON :', error);
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

  // Génération de la table des matières
  const toc = collectifs.map((collectif) => ({
    id: collectif.intitule,
    title: collectif.intitule,
    lineups: (collectif.lineups || [])
      .filter((lineup) => lineup.intitule_long || lineup.intitule_court)
      .sort((a, b) =>
        removeEmojis(a.intitule_long || a.intitule_court).localeCompare(
          removeEmojis(b.intitule_long || b.intitule_court)
        )
      ),
  }));

  return (
    <NoNavLayout title="Collectifs et Lineups">
      <div style={{ padding: '20px' }}>
        {/* Table des matières */}
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <h2>Table des matières</h2>
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
                    <a href={`#lineup-${collectif.id}-${index}`}>
                      {lineup.intitule_long || lineup.intitule_court}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affichage des Collectifs et Lineups */}
        <div>
          {collectifs.map((collectif, index) => (
            <div
              key={index}
              id={`collectif-${collectif.intitule}`}
              style={{
                marginBottom: '40px',
                paddingBottom: '20px',
                borderBottom: '1px solid #ccc',
              }}
            >
              {/* Ancre invisible pour le décalage du saut */}
              <div
                id={`anchor-${collectif.intitule}`}
                style={{ position: 'relative', top: '-80px' }}
              ></div>

              <h3>{removeLinks(collectif.intitule)}</h3>
              {collectif.intitule_court && (
                <h4>{removeLinks(collectif.intitule_court)}</h4>
              )}

              {collectif.recrutement_permanent && (
                <p className="recrutement-permanent">Recrutement permanent</p>
              )}

              {collectif.jam_description && (
                <div className="markdown-container">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {removeLinks(collectif.jam_description)}
                  </ReactMarkdown>
                </div>
              )}
              {collectif.illustration_url &&
                isValidImageUrl(collectif.illustration_url) && (
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
                {collectif.lineups
                  .filter((lineup) => lineup.intitule_long || lineup.intitule_court)
                  .sort((a, b) =>
                    removeEmojis(a.intitule_long || a.intitule_court).localeCompare(
                      removeEmojis(b.intitule_long || b.intitule_court)
                    )
                  )
                  .map((lineup, lineupIndex) => (
                    <li
                      key={lineupIndex}
                      id={`lineup-${collectif.intitule}-${lineupIndex}`}
                    >
                      <p>
                        <strong>
                          {removeLinks(lineup.intitule_long) ||
                            removeLinks(lineup.intitule_court)}
                        </strong>
                      </p>
                      {lineup.referent_pseudo_zap && (
                        <div>
                          <strong>Référent :</strong>{' '}
                          {removeLinks(lineup.referent_pseudo_zap)}
                          <br />
                        </div>
                      )}
                      {lineup.prenoms_membres && (
                        <div>
                          <strong>Membres :</strong>{' '}
                          {removeLinks(lineup.prenoms_membres)}
                          <br />
                        </div>
                      )}
                      {lineup.style_musique && (
                        <div>
                          <strong>Style(s) de musique :</strong> {lineup.style_musique}
                          <br />
                        </div>
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

              {/* Lien de retour à la table des matières */}
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
