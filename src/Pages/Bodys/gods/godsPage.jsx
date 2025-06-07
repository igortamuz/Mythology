import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sword, Zap, Clock, Star, Telescope, Eclipse, BowArrow } from 'lucide-react';
import '../gods/godsPage.css';
import olimpoData from '../../../Json/Deuses/Olimpo.json';

const panteoes = {
  olimpo: olimpoData,
};


const SectionTitle = ({ children }) => ( <h2 className="section-title">{children}</h2> );

const InfoCard = ({ title, data }) => (
  <div className="info-card">
    <h3 className="info-card-title">{title}</h3>
    <dl className="info-card-dl">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="info-card-item">
          <dt>{key.replace(/_/g, ' ')}:</dt>
          <dd>{String(value)}</dd>
        </div>
      ))}
    </dl>
  </div>
);

//  Atratividade Divina
const AtratividadeDivinaCard = ({ data }) => {
    const renderFeitos = (feitos, colorClass) => (
      <ul className="deeds-list">
        {Object.entries(feitos).map(([key, value]) => (
          <li key={key} className="deeds-item">
            <span>{key.replace(/_/g, ' ')}</span>
            <span className={`deeds-value ${colorClass}`}>{value > 0 ? `+${value}` : value}</span>
          </li>
        ))}
      </ul>
    );
    return (
      <div className="info-card">
          <h3 className="info-card-title">Atratividade Divina</h3>
          <div className="theikos-tropos-sections">
              <div><h5 className="deeds-title-positivo">Pontos Fixos</h5>{renderFeitos(data.Pontos_Fixos, 'text-green')}</div>
              <div><h5 className="deeds-title-positivo">Feitos Comuns</h5>{renderFeitos(data.Feitos_Comuns, 'text-green')}</div>
              <div><h5 className="deeds-title-positivo">Feitos Divinos</h5>{renderFeitos(data.Feitos_Divinos, 'text-green')}</div>
              <div><h5 className="deeds-title-negativo">Feitos Negativos</h5>{renderFeitos(data.Feitos_Negativos, 'text-red')}</div>
          </div>
      </div>
    );
};

// Theikos Tropos
const TheikosTroposCard = ({ data }) => {
    if (!data) return null;
    return (
        <div className="ability-card">
            <h4 className="ability-card-name">{data.nome}</h4>
            <p className="ability-card-description">{data.descricao}</p>

            {data.obs && <p className="ability-obs"><strong>Obs:</strong> {data.obs}</p>}
            {data.Obs2 && <p className="ability-obs"><strong>Obs 2:</strong> {data.Obs2}</p>}

            {data.niveis && (
                <div className="level-progression">
                    <h5 className="level-progression-title">Progressão de Nível</h5>
                    <ul className="theikos-level-list">
                        {Object.entries(data.niveis).map(([level, desc]) => (
                            <li key={level}><strong>{level}:</strong> {desc}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.subDescricao && (
                 <div className="level-progression">
                    <h5 className="level-progression-title">Habilidades Adicionais</h5>
                    <ul className="theikos-sub-list">
                       {Object.entries(data.subDescricao).map(([nome, desc]) => (
                           <li key={nome}>
                               <strong>{nome}:</strong>
                               <p>{desc}</p>
                           </li>
                       ))}
                    </ul>
                 </div>
            )}
        </div>
    );
};


const HabilidadeCard = ({ habilidade, tipo }) => {
  const nomeHabilidade = habilidade['nome:'] || habilidade.nome;
  if (!habilidade || !nomeHabilidade) return null;

  return (
    <div className="ability-card">
      <h4 className="ability-card-name">{nomeHabilidade}</h4>
      <p className="ability-card-type">{habilidade.Tipo || habilidade.tipo || tipo}</p>
      <p className="ability-card-description">{habilidade.descricao}</p>

      {Object.keys(habilidade).filter(k => k.startsWith('Obs') && habilidade[k]).map(key => (
        <p key={key} className="ability-obs"><strong>Obs:</strong> {habilidade[key]}</p>
      ))}

      {habilidade.niveis && Array.isArray(habilidade.niveis) && (
        <div className="level-progression">
          <h5 className="level-progression-title">Progressão de Nível</h5>
          <ul className="level-progression-list">
            {habilidade.niveis.map((nivel, index) => (
              <li key={index} className="level-progression-item">
                <strong className="level-progression-level">Nível {nivel.level}:</strong>
                <p className="level-progression-desc">{nivel.descrição}</p>
                <div className="stats-grid">
                  {nivel.danoHabilidade && <span className="stat-item damage-h"><Eclipse size={14}/><strong>Dano de Habilidade:</strong>{nivel.danoHabilidade}</span>}
				  {nivel.danoArma && <span className="stat-item damage-a"><BowArrow size={14}/><strong>Dano de Arma Invocada:</strong>{nivel.danoArma}</span>}
                  {nivel.danoFísico && <span className="stat-item damage-f"><Sword size={14}/><strong>Dano Físico:</strong>{nivel.danoFísico}</span>}
                  {nivel.gastoEnergia && <span className="stat-item cost"><Zap size={14}/><strong>Custo:</strong>{nivel.gastoEnergia}</span>}
                  {nivel.duracao && <span className="stat-item duration"><Clock size={14}/><strong>Duração:</strong>{nivel.duracao}</span>}
                  {nivel.recarga && <span className="stat-item recharge"><Star size={14}/><strong>Recarga:</strong>{nivel.recarga}</span>}
                  {nivel.alcance && <span className="stat-item range"><Telescope size={14}/><strong>Alcance:</strong>{nivel.alcance}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {habilidade.bonusPorLevel && (
        <div className="level-progression">
          <h5 className="level-progression-title">Bônus por Faixa de Nível</h5>
          <div className="table-container">
            <table className="bonus-table">
              <thead>
                <tr>
                  <th>Nível</th>
                  {Object.keys(habilidade.bonusPorLevel['1-25']).map(stat => (
                    <th key={stat}>{stat.replace(/([A-Z])/g, ' $1').trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(habilidade.bonusPorLevel).map(([levelRange, stats]) => (
                  <tr key={levelRange}>
                    <td className="level-range">{levelRange}</td>
                    {Object.values(stats).map((value, i) => <td key={i}>{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


// --- COMPONENTE PRINCIPAL DA PÁGINA ---

const GodsPage = () => {
  const [deus, setDeus] = useState(null);
  const { panteao, nomeDeus } = useParams();

  useEffect(() => {
    const data = panteoes[panteao.toLowerCase()];
    if (data) {
      const deusKey = Object.keys(data.deuses).find(
        (key) => key.toLowerCase() === nomeDeus.toLowerCase()
      );
      const deusData = deusKey ? data.deuses[deusKey] : null;
      setDeus(deusData);

      if (deusData) {
        document.title = `${deusData.nome_grego} - Ficha de RPG`;
      }
    } else {
      setDeus(null);
    }
  }, [panteao, nomeDeus]);

  if (!deus) {
    return (
      <div className="page-container not-found-container">
        <p>Divindade não encontrada ou carregando...</p>
        <Link to="/" className="home-link-button">Voltar para a Home</Link>
      </div>
    );
  }

  const infoGeral = { Panteão: deus.Tipo, Divindade: deus.Divindade, Classe: deus.Classe, Símbolos: deus.Símbolos };
  const nomes = { Original: deus.nome_original, Grego: deus.nome_grego, Romano: deus.nome_romano };

  return (
    <div className="page-container">
      <div className="max-width-container">
        <header className="main-header">
          <h1 className="main-title">
            {deus.nome_grego}
            <span className="main-title-roman"> / {deus.nome_romano}</span>
          </h1>
          <h2 className="main-subtitle">{deus['Hierarquia Divina']}</h2>
        </header>

        <main className="main-grid">
          {/* COLUNA DA ESQUERDA (ASIDE) */}
          <aside className="aside-column">
            <div className="god-image-container">
              <img src={deus.Foto} alt={`Retrato de ${deus.nome_grego}`} className="god-image" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/1e293b/f59e0b?text=Imagem+N%C3%A3o+Encontrada'; }} />
            </div>
            <InfoCard title="Nomes e Títulos" data={nomes} />
            <InfoCard title="Informações Gerais" data={infoGeral} />

            {/* Atratividade Divina na coluna da esquerda */}
            {deus.Atratividade_AD && <AtratividadeDivinaCard data={deus.Atratividade_AD} />}
          </aside>

          {/* COLUNA DA DIREITA (SECTION) */}
          <section className="skills-column">
            <div className="skills-section-content">
              <SectionTitle>Habilidades Passivas</SectionTitle>
              {deus.HabilidadesPassivas && Object.values(deus.HabilidadesPassivas).map((hab, i) => (
                <HabilidadeCard key={`pas-${i}`} habilidade={hab} tipo="Passiva" />
              ))}
            </div>
            <div className="skills-section-content">
              <SectionTitle>Habilidades Ativas</SectionTitle>
              {deus.HabilidadesAtivas && Object.values(deus.HabilidadesAtivas).filter(hab => hab.nome || hab['nome:']).map((hab, i) => (
                <HabilidadeCard key={`ati-${i}`} habilidade={hab} tipo="Ativa" />
              ))}
            </div>

            {/* CORRIGIDO: Theikos Tropos na coluna da direita */}
            {deus.TheikosTropos && (
              <div className="skills-section-content">
                <SectionTitle>Theikos Tropos</SectionTitle>
                <TheikosTroposCard data={deus.TheikosTropos} />
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default GodsPage;