import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import logo from "../../Assets/Imgs/Minotauro_logo.png";
import Olimpo from "../../Json/Deuses/Olimpo.json";
import Sagas from "../../Json/Sagas/Sagas.json";

export default function Header() {
  const deusesOlimpo = Object.keys(Olimpo.deuses); //Recebimento do JSON dos deuses em Array
  const temporadas = Object.entries(Sagas.sagas); //Recebimento do JSON das sagas em Array

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
        // A lógica de fechar ao clicar fora foi removida conforme o original,
        // mas se precisar, pode adicionar setIsMobileMenuOpen(false) aqui.
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Componente reutilizável para itens de menu e submenus
  const MenuItem = ({
    label,
    children,
    menuKey,
    href = null,
    isTopLevel = false,
    renderSubmenuRight = false,
  }) => {
    const hasSubmenu = React.Children.count(children) > 0;
    const isCurrentlyOpen = !!openSubmenus[menuKey];

    const liClasses = [
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

    const handleClick = (e) => {
      if (hasSubmenu) {
        if (window.innerWidth <= 768) {
          handleSubmenuToggle(menuKey, e);
        }
      } else {
        if (isMobileMenuOpen && window.innerWidth <= 768) {
          setTimeout(() => {
            setIsMobileMenuOpen(false);
          }, 250);
        }
      }
    };

    return (
      <li className={liClasses} onClick={handleClick}>
        <span className="menu-item-label">
          {!hasSubmenu && href && href !== "#" && href !== null ? (
            <a
              href={href}
              onClick={(e) => e.stopPropagation()}
            >
              {label}
            </a>
          ) : (
            label
          )}
        </span>

        {hasSubmenu && <ul className={submenuClasses}>{children}</ul>}
      </li>
    );
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Minotauro_Logo" className="logo" />
        <div className="site-name">Mythology</div>
      </div>

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
          <MenuItem
            label="Início"
            menuKey="entrada"
            isTopLevel={true}
            href="/entrada"
          />

          <MenuItem label="Sagas" menuKey="sagas" isTopLevel={true}>
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

          <MenuItem label="Panteão" menuKey="panteao" isTopLevel={true}>
            <MenuItem
              label="Olimpo"
              menuKey="panteao-olimpo"
              renderSubmenuRight={true}
            >
              {deusesOlimpo.map((nomeDoDeus) => (
                <MenuItem
                  key={nomeDoDeus}
                  label={nomeDoDeus}
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

          <MenuItem
            label="Sistemas RPG"
            menuKey="sistemas-rpg"
            isTopLevel={true}
          >
            <MenuItem
              label="Sistema Base"
              menuKey="sistemas-rpg-base"
              renderSubmenuRight={true}
            >
              <MenuItem
                label="Leitura do Sistema"
                menuKey="sistemas-rpg-base-leitura"
                href="/sistemas/combate/leitura"
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
              label="Sistemas de Combate"
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

          {/* Link da Loja Atualizado */}
          <MenuItem label="Loja" menuKey="loja" isTopLevel={true} href="/loja" />

          <MenuItem
            label="Info Adicionais"
            menuKey="info-adicionais"
            isTopLevel={true}
          >
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

          <MenuItem
            label="Termos"
            menuKey="termos"
            isTopLevel={true}
            href="/termos"
          />
        </ul>
      </nav>
    </header>
  );
}
