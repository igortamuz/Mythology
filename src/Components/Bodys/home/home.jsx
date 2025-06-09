import React, { useEffect, useRef } from "react";
import "./home.css";
import fundoHome from "../../../Assets/Imgs/fundoHome.jpg";
import imgInicial from "../../../Assets/Imgs/imgInicial.png";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, 
      }
    );

    const elementsToAnimate =
      contentRef.current.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div
          className="background-video"
          style={{ backgroundImage: `url(${fundoHome})` }}
        ></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Mythology</h1>
          <p className="hero-subtitle">
            Onde Lendas Nascem e Destinos São Forjados
          </p>
          <button
            onClick={handleScrollDown}
            className="scroll-down-button"
            aria-label="Rolar para o conteúdo"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </section>

      <section className="content-section" ref={contentRef}>
        <div className="main-content-wrapper">
          <h2 className="welcome-header animate-on-scroll">
            Olá, caro desperto!
          </h2>
          <div className="links-section animate-on-scroll">
            <a
              href="http://localhost:3000"
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mapa da Cidade
            </a>
            <a
              href="http://localhost:3000"
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord do RPG
            </a>
          </div>

          <div className="intro-block animate-on-scroll">
            <div className="intro-text">
              <p>
                O ano é <span className="highlight-gold">1985.</span>
              </p>

              <p>
                Você acaba de ultrapassar o limiar entre o mundo visível e a{" "}
                <span className="highlight-gold">Cidade de Zeus</span> — um
                enclave secreto na Hypernizuszean (Hyperexistência) onde deuses,
                despertos, herdeiros divinos, semideuses e outras entidades
                coexistem em harmonia.
              </p>
              <p>
                Talvez sua vinda tenha sido guiada por ninfas ou emissários
                celestiais; quem sabe por um grupo de despertos enviados pela
                própria cidade, alertada sobre seu despertar genético, para
                conduzi-lo em segurança até aqui. Atualmente, nossa comunidade
                conta com aproximadamente 10.000 habitantes — você incluído — e
                crescerá ainda mais com as futuras chegadas. A maioria é
                composta por despertos, herdandos ou semideuses romanos.
              </p>
              <p>
                Ao adentrar o portão natural formado por duas árvores
                ancestrais, você sentiu o véu entre os mundos se descerrar. Em
                seguida, pronunciou as palavras sagradas na velha língua grega:
              </p>
            </div>
            <div className="intro-image-container">
              <img
                className="intro-image"
                src={imgInicial}
                alt="Ilustração da Cidade"
              />
            </div>
          </div>

          <blockquote className="greek-quote animate-on-scroll">
            <p>
              "Αναπνεύστε στους καθαρούς ανέμους της δικαιοσύνης, αρνηθείτε το
              κενό της νύχτας και τέλος κολυμπήστε στην ομορφιά της ζωής."
            </p>
            <footer>
              ("Respire os ventos puros da justiça, negue o vazio da noite e,
              finalmente, nade na beleza da vida.")
            </footer>
          </blockquote>

          <div className="aligned-text-block animate-on-scroll">
            <p>
              Diante de seus olhos, revelam-se dois montes colossais que
              flanqueiam o acesso à cidade. Cada pedra e sopro de névoa aqui
              contam histórias de eras passadas, aguardando que você escreva o
              próximo capítulo.
            </p>
            <p>
              Se porventura se perguntar: "Se romanos e gregos estão em paz, por
              que mantemos velhos encantamentos em vez de unificar cultos?"
              Lembre-se: quando algo já funciona, por que alterar?
            </p>
            <p>
              Prepare-se, portanto, para explorar distritos suspensos, descobrir
              portais ocultos e trilhar sendas onde o divino corre tão livre
              quanto o vento que percorre os cumes.
            </p>
          </div>
        </div>

        <div className="final-block animate-on-scroll">
          <p className="farewell-message">
            Que seus genes divinos despertem todo o seu potencial e o conduzam a
            descobertas que transcendem o mundo humano.
          </p>
          <p className="welcome-message">
            Bem vindo à <span className="city-name">Cidade de Zeus</span>
          </p>
        </div>
      </section>
    </main>
  );
}
