import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../Assets/Imgs/Minotauro_logo.png";
import Olimpo from "../../Json/Deuses/Olimpo.json";
import Sagas from "../../Json/Sagas/Sagas.json";

export default function Header() {
  const deusesOlimpo = Object.keys(Olimpo.deuses);
  const temporadas = Object.entries(Sagas.sagas);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSubmenuToggle = (menuKey, event) => {
    event.stopPropagation();
    setOpenSubmenus((prevOpenState) => {
      const newState = { ...prevOpenState };
      const isCurrentlyOpen = !!prevOpenState[menuKey];
      newState[menuKey] = !isCurrentlyOpen;

      if (!newState[menuKey]) {
        Object.keys(newState).forEach((key) => {
          if (key.startsWith(menuKey + "-")) {
            newState[key] = false;
          }
        });
      }
      return newState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const MenuItem = ({
    label,
    children,
    menuKey,
    href = null,
    renderSubmenuRight = false,
  }) => {
    const hasSubmenu = React.Children.count(children) > 0;
    const isCurrentlyOpen = !!openSubmenus[menuKey];

    const liClasses = [
      "menu-item",
      hasSubmenu ? "has-submenu" : "",
      isCurrentlyOpen && window.innerWidth <= 768 ? "mobile-submenu-open" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const submenuClasses = [
      "submenu",
      renderSubmenuRight ? "right" : "",
      isCurrentlyOpen && window.innerWidth <= 768 ? "open" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const handleItemClick = (e) => {
      if (hasSubmenu && window.innerWidth <= 768) {
        handleSubmenuToggle(menuKey, e);
      } else if (
        !hasSubmenu &&
        href &&
        isMobileMenuOpen &&
        window.innerWidth <= 768
      ) {
        setTimeout(() => {
          setIsMobileMenuOpen(false);
        }, 250);
      }
    };

    return (
      <li className={liClasses}>
        {hasSubmenu ? (
          <span className="menu-item-content" onClick={handleItemClick}>
            {label}
          </span>
        ) : (
          <a
            href={href || "#"}
            className="menu-item-content"
            onClick={handleItemClick}
          >
            {label}
          </a>
        )}

        {hasSubmenu && <ul className={submenuClasses}>{children}</ul>}
      </li>
    );
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <div className="logo-container">
          <img src={logo} alt="Minotauro_Logo" className="logo" />
          <div className="site-name">Mythology</div>
        </div>
      </Link>

      <button
        className={`menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Alternar menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>

      <nav
        ref={navRef}
        className={`nav ${isMobileMenuOpen ? "open" : ""}`}
        aria-hidden={!isMobileMenuOpen && window.innerWidth <= 768}
      >
        <ul className="menu">
          <MenuItem label="Início" menuKey="entrada" href="/entrada" />

          <MenuItem label="Sagas" menuKey="sagas">
            {temporadas.map(([keyTemporada, temporada]) => (
              <MenuItem
                key={keyTemporada}
                label={temporada.nome}
                menuKey={`sagas-${keyTemporada}`}
                renderSubmenuRight={true}
              >
                {Object.entries(temporada)
                  .filter(([key]) => key !== "nome")
                  .map(([keySaga, saga]) => (
                    <MenuItem
                      key={keySaga}
                      label={saga.nome}
                      menuKey={`sagas-${keyTemporada}-${keySaga}`}
                      href={`/sagas/${keyTemporada}/${keySaga}`}
                    />
                  ))}
              </MenuItem>
            ))}
          </MenuItem>

          <MenuItem label="Panteão" menuKey="panteao">
            <MenuItem
              label="Olimpo"
              menuKey="panteao-olimpo"
              renderSubmenuRight={true}
            >
              {deusesOlimpo.map((nomeDoDeus) => (
                <MenuItem
                  key={nomeDoDeus}
                  label={Olimpo.deuses[nomeDoDeus].nome_original || nomeDoDeus}
                  menuKey={`panteao-olimpo-${nomeDoDeus
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  href={`/panteao/olimpo/${nomeDoDeus
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                />
              ))}
            </MenuItem>
            <MenuItem
              label="Submundo"
              menuKey="panteao-submundo"
              renderSubmenuRight={true}
            >
              <MenuItem
                label="Hades"
                menuKey="panteao-submundo-hades"
                href="/panteao/submundo/hades"
              />
            </MenuItem>
            <MenuItem
              label="Menores"
              menuKey="panteao-menores"
              renderSubmenuRight={true}
            >
              <MenuItem
                label="Hércules"
                menuKey="panteao-menores-hercules"
                href="/panteao/menores/hercules"
              />
            </MenuItem>
          </MenuItem>

          <MenuItem label="Sistemas RPG" menuKey="sistemas-rpg">
            <MenuItem
              label="Base"
              menuKey="sistemas-rpg-base"
              renderSubmenuRight={true}
            >
              <MenuItem
                label="Leitura do Sistema"
                menuKey="sistemas-rpg-base-leitura"
                href="/sistemas/base/leitura"
              />
              <MenuItem
                label="Fichas do RPG"
                menuKey="sistemas-rpg-base-fichas"
                href="/sistemas/base/fichas"
              />
              <MenuItem
                label="Guildas"
                menuKey="sistemas-rpg-base-guildas"
                href="/sistemas/base/guildas"
              />
              <MenuItem
                label="Profissões"
                menuKey="sistemas-rpg-base-profissoes"
                href="/sistemas/base/profissoes"
              />
              <MenuItem
                label="Materiais/Danos"
                menuKey="sistemas-rpg-base-materiais"
                href="/sistemas/base/materiais"
              />
            </MenuItem>
            <MenuItem
              label="Combate"
              menuKey="sistemas-rpg-combate"
              renderSubmenuRight={true}
            >
              <MenuItem
                label="Leitura do Sistema"
                menuKey="sistemas-rpg-combate-leitura"
                href="/sistemas/combate/leitura"
              />
              <MenuItem
                label="Efeitos/Buffs"
                menuKey="sistemas-rpg-combate-guia"
                href="/sistemas/combate/guia"
              />
              <MenuItem
                label="Espírito Animal"
                menuKey="sistemas-rpg-combate-espirito"
                href="/sistemas/combate/espirito"
              />
              <MenuItem
                label="Theïkós Trópos"
                menuKey="sistemas-rpg-combate-theikos"
                href="/sistemas/combate/theikos"
              />
              <MenuItem
                label="Reborn"
                menuKey="sistemas-rpg-combate-reborn"
                href="/sistemas/combate/reborn"
              />
            </MenuItem>
          </MenuItem>

          <MenuItem label="Loja" menuKey="loja" href="/loja" />

          <MenuItem label="Info Adicionais" menuKey="info-adicionais">
            <MenuItem
              label="Hyperdimensão"
              menuKey="info-hyperdimensao"
              href="/info/hyperdimensao"
            />
            <MenuItem
              label="Genética Divina"
              menuKey="info-genetica"
              href="/info/genetica"
            />
            <MenuItem
              label="Locais Zeus"
              menuKey="info-locais"
              href="/info/locais"
            />
            <MenuItem
              label="Tipos/Comparações"
              menuKey="info-tipos"
              href="/info/tipos"
            />
            <MenuItem
              label="Greco/Romanismo"
              menuKey="info-ismos"
              href="/info/ismos"
            />
            <MenuItem
              label="Língua Divina"
              menuKey="info-lingua"
              href="/info/lingua"
            />
          </MenuItem>

          <MenuItem label="Termos" menuKey="termos" href="/termos" />
        </ul>
      </nav>
    </header>
  );
}
