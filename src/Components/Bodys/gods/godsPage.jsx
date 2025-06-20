import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Sword,
  Zap,
  Clock,
  Star,
  Telescope,
  Eclipse,
  BowArrow,
  Sparkles,
  Award,
  ShieldCheck,
  MinusCircle,
  PlusCircle,
  BookUser,
  Info,
  GitMerge,
  ShieldPlus,
  ScrollText,
} from "lucide-react";
import "../gods/godsPage.css";
import olimpoData from "../../../Json/Deuses/Olimpo.json";

const panteoes = {
  olimpo: olimpoData,
};

const SectionTitle = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

const InfoCard = ({ title, data, icon: Icon }) => (
  <div className="info-card">
    <h3 className="info-card-title">
      {Icon && <Icon size={22} className="info-card-title-icon" />}
      <span>{title}</span>
    </h3>
    <dl className="info-card-dl">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="info-card-item">
          <dt>{key.replace(/_/g, " ")}</dt>
          <dd>{String(value)}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const AtratividadeDivinaCard = ({ data }) => {
  const renderCategory = (title, feitos, colorClass, Icon) => (
    <div className="attraction-category">
      <h5
        className={`attraction-category-title ${
          colorClass === "text-green" ? "positive" : "negative"
        }`}
      >
        <Icon size={18} className="title-icon" />
        <span>{title}</span>
      </h5>
      <ul className="deeds-list">
        {Object.entries(feitos).map(([key, value]) => (
          <li key={key} className="deeds-item">
            <span>{key.replace(/_/g, " ")}</span>
            <span className={`deeds-value ${colorClass}`}>
              {value > 0 ? `+${value}` : value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="info-card divine-attraction-card">
      <h3 className="info-card-title">Atratividade Divina</h3>
      <div className="attraction-grid">
        {renderCategory(
          "Pontos Fixos",
          data.Pontos_Fixos,
          "text-green",
          ShieldCheck
        )}
        {renderCategory(
          "Feitos Comuns",
          data.Feitos_Comuns,
          "text-green",
          Award
        )}
        {renderCategory(
          "Feitos Divinos",
          data.Feitos_Divinos,
          "text-green",
          PlusCircle
        )}
        {renderCategory(
          "Feitos Negativos",
          data.Feitos_Negativos,
          "text-red",
          MinusCircle
        )}
      </div>
    </div>
  );
};

const DogmasCard = ({ data, icon: Icon }) => {
  if (!data) return null;

  const dogmas = Object.keys(data)
    .filter((key) => key.startsWith("Dogma"))
    .sort()
    .map((key) => data[key]);

  return (
    <div className="info-card dogmas-card">
      <SectionTitle>Dogmas</SectionTitle>
      <p className="dogmas-intro">{data.Introducao}</p>
      <ul className="dogmas-list">
        {dogmas.map((dogma, index) => (
          <li key={index} className="dogma-item">
            <h5 className="dogma-title">{dogma.titulo}</h5>
            <p className="dogma-description">{dogma.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TheikosTroposCard = ({ data }) => {
  if (!data) return null;

  const renderAdaptacao = (adaptacao) => {
    if (!adaptacao || !adaptacao.alvo || !adaptacao.efeito) return null;
    return (
      <div className="ability-adaptation">
        <h6 className="adaptation-title">
          <GitMerge size={16} /> Adaptação
        </h6>
        <p>
          <strong>Alvo:</strong> {adaptacao.alvo}
        </p>
        <p>
          <strong>Efeito:</strong> {adaptacao.efeito}
        </p>
      </div>
    );
  };

  return (
    <div className="ability-card">
      <h4 className="ability-card-name">{data.nome}</h4>
      <p className="ability-card-description">{data.descricao}</p>
      {Object.keys(data)
        .filter((key) => key.toLowerCase().startsWith("obs") && data[key])
        .map((key, index) => (
          <p key={key} className="ability-obs">
            <strong>Obs{index > 0 ? ` ${index + 1}` : ""}:</strong> {data[key]}
          </p>
        ))}

      {/* Renderiza a adaptação se existir */}
      {data.adaptacao && renderAdaptacao(data.adaptacao)}

      {data.niveis && (
        <div className="level-progression">
          <h5 className="level-progression-title">Progressão de Nível</h5>
          <ul className="theikos-level-list">
            {Object.entries(data.niveis).map(([level, desc]) => (
              <li key={level}>
                <strong>
                  {level}
                  {(level.includes("125") || level.includes("150")) && (
                    <>
                      {"   "}
                      <span
                        className="stat-item reborn"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          verticalAlign: "baseline",
                        }}
                      >
                        <Sparkles size={14} />
                        Reborn
                      </span>
                    </>
                  )}
                  :
                </strong>{" "}
                {desc}
              </li>
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

const HabilidadeCard = ({ habilidade, tipo, calculatedStats }) => {
  const nomeHabilidade = habilidade["nome:"] || habilidade.nome;
  if (!habilidade || !nomeHabilidade) return null;

  const getCalculatedValue = (statValue, statType, baseStats) => {
    if (!baseStats || typeof statValue !== "string" || !statValue.includes("%"))
      return statValue;
    const percentage = parseFloat(statValue);
    if (isNaN(percentage)) return statValue;
    let baseValue = 0;
    switch (statType) {
      case "danoHabilidade":
      case "danoHabilidadeArco":
        baseValue = baseStats.DanoHabilidade;
        break;
      case "danoFísico":
      case "danoFisicoArmaInvocada":
        baseValue = baseStats.DanoFisico;
        break;
      case "danoArmaInvocada":
        baseValue = baseStats.DanoArmaInvocada;
        break;
      case "gastoEnergia":
      case "gastoDeEnergia":
        baseValue = baseStats.PV;
        break;
      default:
        return statValue;
    }
    if (baseValue === undefined) return statValue;

    const match = statValue.match(/(\d+(\.\d+)?%)(.*)/);
    if (match) {
      const perc = parseFloat(match[1]);
      const rest = match[3] || "";
      const finalValue = Math.floor((perc / 100) * baseValue);
      return `${statValue} (${finalValue})${rest}`;
    }

    const finalValue = Math.floor((percentage / 100) * baseValue);
    return `${statValue} (${finalValue})`;
  };

  const renderAdaptacao = (adaptacao) => {
    if (!adaptacao || !adaptacao.alvo || !adaptacao.efeito) return null;
    return (
      <div className="ability-adaptation">
        <h6 className="adaptation-title">
          <GitMerge size={16} /> Adaptação
        </h6>
        <p>
          <strong>Alvo:</strong> {adaptacao.alvo}
        </p>
        <p>
          <strong>Efeito:</strong> {adaptacao.efeito}
        </p>
      </div>
    );
  };

  const renderSubHabilidade = (nivel) => {
    if (!nivel.subHabilidade) return null;
    return (
      <div className="sub-ability">
        <h6 className="sub-ability-title">
          <ShieldPlus size={16} /> {nivel.subHabilidade}
        </h6>
        <div className="stats-grid">
          {nivel.reducaoDeDano && (
            <span className="stat-item damage-h">
              <ShieldCheck size={14} />
              <strong>Redução de Dano:</strong> {nivel.reducaoDeDano}
            </span>
          )}
          {nivel.gastoDeEnergia && (
            <span className="stat-item cost">
              <Zap size={14} />
              <strong>Custo:</strong>{" "}
              {getCalculatedValue(
                nivel.gastoDeEnergia,
                "gastoDeEnergia",
                calculatedStats
              )}
            </span>
          )}
          {nivel.subDuracao && (
            <span className="stat-item duration">
              <Clock size={14} />
              <strong>Duração:</strong> {nivel.subDuracao}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ability-card">
      <h4 className="ability-card-name">{nomeHabilidade}</h4>
      <p className="ability-card-type">
        {habilidade.Tipo || habilidade.tipo || tipo}
      </p>
      <p className="ability-card-description">{habilidade.descricao}</p>
      {Object.keys(habilidade)
        .filter((k) => k.startsWith("Obs") && habilidade[k])
        .map((key, i) => (
          <p key={key} className="ability-obs">
            <strong>Obs{i > 0 ? i + 1 : ""}:</strong> {habilidade[key]}
          </p>
        ))}
      {habilidade.niveis && Array.isArray(habilidade.niveis) && (
        <div className="level-progression">
          <h5 className="level-progression-title">Progressão de Nível</h5>
          <ul className="level-progression-list">
            {habilidade.niveis.map((nivel, index) => (
              <li key={index} className="level-progression-item">
                <strong className="level-progression-level">
                  Nível {nivel.level}:
                </strong>
                <p className="level-progression-desc">{nivel.descrição}</p>
                <div className="stats-grid">
                  {nivel.danoHabilidade && (
                    <span className="stat-item damage-h">
                      <Eclipse size={14} />
                      <strong>Dano de Habilidade:</strong>
                      {getCalculatedValue(
                        nivel.danoHabilidade,
                        "danoHabilidade",
                        calculatedStats
                      )}
                    </span>
                  )}
                  {nivel.danoArmaInvocada && (
                    <span className="stat-item damage-a">
                      <BowArrow size={14} />
                      <strong>Dano de Arma:</strong>
                      {getCalculatedValue(
                        nivel.danoArmaInvocada,
                        "danoArmaInvocada",
                        calculatedStats
                      )}
                    </span>
                  )}
                  {nivel.danoFisicoArmaInvocada && (
                    <span className="stat-item damage-f">
                      <Sword size={14} />
                      <strong>Dano de Arma:</strong>
                      {getCalculatedValue(
                        nivel.danoFisicoArmaInvocada,
                        "danoFisicoArmaInvocada",
                        calculatedStats
                      )}
                    </span>
                  )}
                  {nivel.danoFísico && (
                    <span className="stat-item damage-f">
                      <Sword size={14} />
                      <strong>Dano Físico:</strong>
                      {getCalculatedValue(
                        nivel.danoFísico,
                        "danoFísico",
                        calculatedStats
                      )}
                    </span>
                  )}
                  {nivel.danoHabilidadeArco && (
                    <span className="stat-item damage-h-arco">
                      <BowArrow size={14} />
                      <strong>Dano de Habilidade + Arco:</strong>
                      {getCalculatedValue(
                        nivel.danoHabilidadeArco,
                        "danoHabilidadeArco",
                        calculatedStats
                      )}
                    </span>
                  )}
                  {nivel.gastoEnergia && (
                    <span className="stat-item cost">
                      <Zap size={14} />
                      <strong>Custo:</strong>
                      {getCalculatedValue(nivel.gastoEnergia, "gastoEnergia")}
                    </span>
                  )}
                  {nivel.duracao && (
                    <span className="stat-item duration">
                      <Clock size={14} />
                      <strong>Duração:</strong>
                      {nivel.duracao}
                    </span>
                  )}
                  {nivel.recarga && (
                    <span className="stat-item recharge">
                      <Star size={14} />
                      <strong>Recarga:</strong>
                      {nivel.recarga}
                    </span>
                  )}
                  {nivel.alcance && (
                    <span className="stat-item range">
                      <Telescope size={14} />
                      <strong>Alcance:</strong>
                      {nivel.alcance}
                    </span>
                  )}
                  {nivel.Cura && (
                    <span className="stat-item duration">
                      <PlusCircle size={14} />
                      <strong>Cura:</strong>
                      {nivel.Cura}
                    </span>
                  )}
                  {nivel.Reborn !== undefined && (
                    <span className="stat-item reborn">
                      <Sparkles size={14} />
                      <strong>Condição:</strong>Reborn
                    </span>
                  )}
                </div>
                {nivel.adaptacao && renderAdaptacao(nivel.adaptacao)}
                {nivel.subHabilidade && renderSubHabilidade(nivel)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {habilidade.bonusPorLevel && (
        <div className="level-progression">
          <h5 className="level-progression-title">
            Bônus por Faixa de Nível (por nível ganho)
          </h5>
          <div className="table-container">
            <table className="bonus-table">
              <thead>
                <tr>
                  <th>Nível</th>
                  <th>PV</th>
                  <th>Força</th>
                  <th>V. Movimento</th>
                  <th>V. Habilidade</th>
                  <th>D. Físico</th>
                  <th>D. Habilidade</th>
                  <th>D. Arma</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(habilidade.bonusPorLevel).map(
                  ([levelRange, stats]) => (
                    <tr key={levelRange}>
                      <td className="level-range">{levelRange}</td>
                      <td>{stats.PV}</td>
                      <td>{stats.Força}</td>
                      <td>{stats.VelocidadeMovimento}</td>
                      <td>{stats.VelocidadeHabilidade}</td>
                      <td>{stats.DanoFisico}</td>
                      <td>{stats.DanoHabilidade}</td>
                      <td>{stats.DanoArmaInvocada}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusCalculator = ({
  playerLevel,
  onLevelChange,
  onCalculate,
  calculatedStats,
  theikosForm,
  onFormChange,
  isReborn,
  onRebornChange,
  rebornStartLevel,
  onRebornLevelChange,
  resultsRef,
}) => {
  const formatStatName = (name) => {
    const formatted = name.replace(/([A-Z])/g, " $1").trim();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };
  const forms = [
    { id: "base", label: "Forma Base", level: 0, bonus: "0%" },
    { id: "falsa", label: "Falsa Theikos Tropos", level: 80, bonus: "+10%" },
    { id: "verdadeira", label: "Theikos Tropos", level: 100, bonus: "+20%" },
    { id: "divina", label: "Theikos Tropos - Real", level: 125, bonus: "+35%" },
    {
      id: "explosiva",
      label: "Theikos Tropos - Modo Explosivo",
      level: 150,
      bonus: "+50%",
    },
  ];

  const levelValue = parseInt(playerLevel, 10) || 0;

  return (
    <div className="status-calculator">
      <h6 className="calculator-title">Calcular Status</h6>
      <div className="calculator-input-group">
        <input
          type="number"
          value={playerLevel}
          onChange={onLevelChange}
          onKeyPress={(e) => e.key === "Enter" && onCalculate()}
          placeholder="Digite o Nível ATUAL"
          className="calculator-input"
        />
        <button onClick={onCalculate} className="calculator-button">
          Calcular
        </button>
      </div>
      <div className="theikos-form-selector">
        <h6 className="theikos-form-title">Forma</h6>
        <div className="theikos-radio-group">
          {forms.map((form) => (
            <div key={form.id} className="radio-button-wrapper">
              <input
                type="radio"
                id={`form-${form.id}`}
                name="theikos-form"
                value={form.id}
                checked={theikosForm === form.id}
                onChange={onFormChange}
                disabled={levelValue < form.level}
              />
              <label htmlFor={`form-${form.id}`}>
                {form.label} <span className="bonus-pill">{form.bonus}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="reborn-selector">
        <label className="reborn-toggle-label">Reborn?</label>
        <div className="reborn-toggle-switch">
          <input
            type="checkbox"
            id="reborn-toggle"
            checked={isReborn}
            onChange={onRebornChange}
          />
          <label htmlFor="reborn-toggle"></label>
        </div>
        {isReborn && (
          <div className="reborn-level-input-group">
            <label htmlFor="reborn-start-level">
              Nível que realizou o Reborn:
            </label>
            <input
              type="number"
              id="reborn-start-level"
              value={rebornStartLevel}
              onChange={onRebornLevelChange}
              className="calculator-input reborn-level-input"
              min="75"
              placeholder="Ex: 75, 155"
            />
            {rebornStartLevel && rebornStartLevel < 75 && (
              <p className="reborn-error-message">
                Nível mínimo para Reborn é 75.
              </p>
            )}
          </div>
        )}
        <br />
      </div>
      {calculatedStats && (
        <div className="calculator-results" ref={resultsRef}>
          <div className="table-container">
            <table className="bonus-table results-table">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(calculatedStats).map(([stat, value]) => (
                  <tr key={stat}>
                    <td>{formatStatName(stat)}</td>
                    <td>{value.toLocaleString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="calculator-disclaimer">
        Esses status não consideram buffs, itens, bênçãos ou alterações de
        outras habilidades.
      </p>
    </div>
  );
};

const GodsPage = () => {
  const { panteao, nomeDeus } = useParams();
  const [deus, setDeus] = useState(null);
  const [playerLevel, setPlayerLevel] = useState("");
  const [baseCalculatedStats, setBaseCalculatedStats] = useState(null);
  const [calculatedStats, setCalculatedStats] = useState(null);
  const [theikosForm, setTheikosForm] = useState("base");
  const [isReborn, setIsReborn] = useState(false);
  const [rebornStartLevel, setRebornStartLevel] = useState("");

  const resultsRef = useRef(null);

  useEffect(() => {
    const data = panteoes[panteao.toLowerCase()];
    if (data) {
      const deusKey = Object.keys(data.deuses).find(
        (key) => key.toLowerCase() === nomeDeus.toLowerCase()
      );

      const deusData = deusKey ? data.deuses[deusKey] : null;
      setDeus(deusData);
      if (deusData) document.title = `${deusData.nome_original} - Ficha de RPG`;
    } else {
      setDeus(null);
    }
  }, [panteao, nomeDeus]);

  useEffect(() => {
    if (calculatedStats && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [calculatedStats]);

  const findAlteracaoDeStatus = (habilidades) => {
    if (!habilidades) return null;
    return Object.values(habilidades).find(
      (hab) => hab.Tipo === "Alteração de Status"
    );
  };
  const alteracaoDeStatus = deus
    ? findAlteracaoDeStatus(deus.HabilidadesPassivas) ||
      findAlteracaoDeStatus(deus.HabilidadesAtivas)
    : null;

  const calculateBaseStats = () => {
    if (!alteracaoDeStatus || !alteracaoDeStatus.bonusPorLevel) return null;
    const level = parseInt(playerLevel, 10);
    if (isNaN(level) || level < 1) return null;
    const initialStats = Object.keys(
      alteracaoDeStatus.bonusPorLevel["1-25"]
    ).reduce((obj, key) => ({ ...obj, [key]: 0 }), {});
    return Object.entries(alteracaoDeStatus.bonusPorLevel).reduce(
      (acc, [levelRange, stats]) => {
        const rangeParts = levelRange.replace("+", "").split("-");
        const startLevel = parseInt(rangeParts[0], 10);
        const endLevel = rangeParts[1] ? parseInt(rangeParts[1], 10) : Infinity;
        let levelsInThisTier = 0;
        if (level >= startLevel) {
          levelsInThisTier = Math.min(level, endLevel) - startLevel + 1;
        }
        if (levelsInThisTier > 0) {
          for (const statName in stats) {
            const valuePerLevel = parseInt(
              String(stats[statName]).replace("+", ""),
              10
            );
            if (!isNaN(valuePerLevel)) {
              acc[statName] =
                (acc[statName] || 0) + valuePerLevel * levelsInThisTier;
            }
          }
        }
        return acc;
      },
      initialStats
    );
  };

  const handleCalculateClick = () => {
    const baseStats = calculateBaseStats();
    setBaseCalculatedStats(baseStats);
  };

  useEffect(() => {
    if (!baseCalculatedStats) {
      setCalculatedStats(null);
      return;
    }

    let statsAfterTheikos = { ...baseCalculatedStats };
    if (theikosForm !== "base") {
      let bonusMultiplier = 1.0;
      switch (theikosForm) {
        case "falsa":
          bonusMultiplier = 1.1;
          break;
        case "verdadeira":
          bonusMultiplier = 1.2;
          break;
        case "divina":
          bonusMultiplier = 1.35;
          break;
        case "explosiva":
          bonusMultiplier = 1.5;
          break;
        default:
          bonusMultiplier = 1.0;
      }
      for (const stat in statsAfterTheikos) {
        statsAfterTheikos[stat] = Math.floor(
          statsAfterTheikos[stat] * bonusMultiplier
        );
      }
    }

    const rebornLevel = parseInt(rebornStartLevel, 10);
    if (isReborn && !isNaN(rebornLevel) && rebornLevel >= 75) {
      let rebornMultiplier = 1.25;

      if (rebornLevel > 150) {
        const extraBonus = Math.floor((rebornLevel - 150) / 5) * 0.025;
        rebornMultiplier += extraBonus;
      }

      let finalStats = {};
      for (const stat in statsAfterTheikos) {
        let value = statsAfterTheikos[stat] * rebornMultiplier;
        if (stat === "PV") {
          value *= 1.35;
        }
        finalStats[stat] = Math.floor(value);
      }
      setCalculatedStats(finalStats);
    } else {
      setCalculatedStats(statsAfterTheikos);
    }
  }, [baseCalculatedStats, theikosForm, isReborn, rebornStartLevel]);

  useEffect(() => {
    const level = parseInt(playerLevel, 10) || 0;
    if (level < 150 && theikosForm === "explosiva") setTheikosForm("divina");
    if (level < 125 && theikosForm === "divina") setTheikosForm("verdadeira");
    if (level < 100 && theikosForm === "verdadeira") setTheikosForm("falsa");
    if (level < 80 && theikosForm === "falsa") setTheikosForm("base");
  }, [playerLevel, theikosForm]);

  useEffect(() => {
    if (!isReborn) setRebornStartLevel("");
  }, [isReborn]);

  if (!deus)
    return (
      <div className="page-container not-found-container">
        <p>Divindade não encontrada ou carregando...</p>
        <Link to="/" className="home-link-button">
          Voltar para a Home
        </Link>
      </div>
    );

  const infoGeral = {
    Tipo: deus.Tipo,
    Domínio: deus.Divindade,
    Classe: deus.Classe,
    Símbolos: deus.Símbolos,
  };
  const nomes = {
    Original: deus.nome_original,
    Grego: deus.nome_grego,
    Romano: deus.nome_romano,
  };

  return (
    <div className="page-container">
      <div className="max-width-container">
        <header className="main-header">
          <h1 className="main-title">
            {deus.nome_grego}
            <span className="main-title-roman"> / {deus.nome_romano}</span>
          </h1>
          <h2 className="main-subtitle">{deus["Hierarquia Divina"]}</h2>
        </header>
        <main className="main-grid">
          <aside className="aside-column">
            <div className="god-image-container">
              <img
                src={deus.Foto}
                alt={`Retrato de ${deus.nome_grego}`}
                className="god-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x800/1e293b/f59e0b?text=Imagem+N%C3%A3o+Encontrada";
                }}
              />
            </div>
            <InfoCard title="Nomes e Títulos" data={nomes} icon={BookUser} />
            <InfoCard title="Informações Gerais" data={infoGeral} icon={Info} />
            {deus.Atratividade_AD && (
              <AtratividadeDivinaCard data={deus.Atratividade_AD} />
            )}
          </aside>
          <section className="skills-column">
            {deus.Dogmas && <DogmasCard data={deus.Dogmas} icon={ScrollText} />}
            {alteracaoDeStatus && (
              <div className="skills-section-content">
                <SectionTitle>{alteracaoDeStatus.Tipo}</SectionTitle>
                <HabilidadeCard
                  habilidade={alteracaoDeStatus}
                  tipo={alteracaoDeStatus.Tipo}
                  calculatedStats={calculatedStats}
                />
                <StatusCalculator
                  playerLevel={playerLevel}
                  onLevelChange={(e) => setPlayerLevel(e.target.value)}
                  onCalculate={handleCalculateClick}
                  calculatedStats={calculatedStats}
                  theikosForm={theikosForm}
                  onFormChange={(e) => setTheikosForm(e.target.value)}
                  isReborn={isReborn}
                  onRebornChange={(e) => setIsReborn(e.target.checked)}
                  rebornStartLevel={rebornStartLevel}
                  onRebornLevelChange={(e) =>
                    setRebornStartLevel(e.target.value)
                  }
                  resultsRef={resultsRef}
                />
              </div>
            )}
            <div className="skills-section-content">
              <SectionTitle>Habilidades Passivas</SectionTitle>
              {deus.HabilidadesPassivas &&
                Object.values(deus.HabilidadesPassivas)
                  .filter((hab) => hab.Tipo !== "Alteração de Status")
                  .map((hab, i) => (
                    <HabilidadeCard
                      key={`pas-${i}`}
                      habilidade={hab}
                      tipo="Passiva"
                      calculatedStats={calculatedStats}
                    />
                  ))}
            </div>
            <div className="skills-section-content">
              <SectionTitle>Habilidades Ativas</SectionTitle>
              {deus.HabilidadesAtivas &&
                Object.values(deus.HabilidadesAtivas)
                  .filter(
                    (hab) =>
                      (hab.nome || hab["nome:"]) &&
                      hab.Tipo !== "Alteração de Status"
                  )
                  .map((hab, i) => (
                    <HabilidadeCard
                      key={`ati-${i}`}
                      habilidade={hab}
                      tipo="Ativa"
                      calculatedStats={calculatedStats}
                    />
                  ))}
            </div>
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
