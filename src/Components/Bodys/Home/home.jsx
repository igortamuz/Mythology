import { useEffect, useRef } from 'react';
import './home.css';
import fundoHome from '../../../Assets/Imgs/fundoHome.jpg';
import imgInicial from "../../../Assets/Imgs/imgInicial.png";

export default function Home() {
  const contentRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="home-page">
      <section className="hero-section">
        <img className="background-image" src={fundoHome} alt="Cenário místico da Cidade de Zeus" />
        <div className="hero-overlay"></div>
      </section>

      <section className="content-section" ref={contentRef}>
        <h2 className="welcome-header">Olá, caro desperto!</h2>

        <div className="intro-block">
          <div className="intro-text">
            <p>O ano é <span className="highlight-gold">1985.</span></p>
            <p>
              Mapa da Cidade: <a href="http://localhost:3000">Link</a><br />
              Discord do RPG: <a href="http://localhost:3000">Link</a>
            </p>
            <p>Você acaba de ultrapassar o limiar entre o mundo visível e a Cidade de Zeus — um enclave secreto na Hypernizuszean (Hyperexistência) onde deuses, despertos, herdeiros divinos, semideuses e outras entidades coexistem em harmonia.</p>
            <p>Talvez sua vinda tenha sido guiada por ninfas ou emissários celestiais; quem sabe por um grupo de despertos enviados pela própria cidade, alertada sobre seu despertar genético, para conduzi-lo em segurança até aqui. Atualmente, nossa comunidade conta com aproximadamente 10.000 habitantes — você incluído — e crescerá ainda mais com as futuras chegadas. Com maioria sendo despertos, herdandos ou semideuses romanos.</p>
            <p>Ao adentrar a portão natural formado por duas árvores ancestrais cujos galhos se curvam em reverência, você sentiu o véu entre os mundos se descerrar. Em seguida, pronunciou as palavras sagradas na velha língua grega:</p>
          </div>
          <img className="intro-image" src={imgInicial} alt="Ilustração de um personagem desperto" />
        </div>

        <div className="final-text-block">
          <p className="greek-quote">Αναπνεύστε στους καθαρούς ανέμους της δικαιοσύνης, αρνηθείτε το κενό της νύχτας και τέλος κολυμπήστε στην ομορφιά της ζωής.</p>
          <p>Um instante, revelou-se diante de dois montes colossais que flanqueiam o acesso à cidade. Cada pedra e sopro de névoa aqui contam histórias de eras passadas, aguardando que você escreva o próximo capítulo.</p>
          <p>Se porventura se perguntar: "Se romanos e gregos estão em paz, por que mantemos velhos encantamentos em vez de unificar cultos?" Lembre-se: quando algo já funciona, por que alterar?</p>
          <p>Prepare-se, portanto, para explorar distritos suspensos, descobrir portais ocultos e trilhar sendas onde o divino corre tão livre quanto o vento que percorre os cumes.</p>
          <p className="farewell-message">Que seus genes divinos despertem todo o seu potencial e o conduzam a descobertas que transcendem o mundo humano.</p>
          <p className="welcome-message">Bem vindo à "Cidade de Zeus"!</p>
        </div>
      </section>
    </main>
  );
}