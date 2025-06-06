import './home.css';
import fundoHome from '../../../Assets/Imgs/fundoHome.jpg'
import imgInicial from "../../../Assets/Imgs/imgInicial.png"

export default function Home() {

  return (
    <>
      <img className='fundoHome' src={fundoHome} alt='' />
      <h2 className='ola'> Olá, caro desperto!</h2>
      <div className='textoInicial'>
        <div className='texto-Ola'>
          <p>O ano é <span className='data'>1985.</span></p>
          <p>Mapa da Cidade: Link.<br />
          Discord do RPG: Link.</p>
          <p>Você acaba de ultrapassar o limiar entre o mundo visível e a Cidade de Zeus — um enclave secreto na Hypernizuszean (Hyperexistência) onde deuses, despertos, herdeiros divinos, semideuses e outras entidades coexistem em harmonia.</p>
          <p> Talvez sua vinda tenha sido guiada por ninfas ou emis­sá­rios celestiais; quem sabe por um grupo de despertos enviados pela própria cidade, alertada sobre seu despertar genético, para conduzi-lo em segurança até aqui. Atualmente, nossa comunidade conta com aproximadamente 10.000 habitantes — você incluído — e crescerá ainda mais com as futuras chegadas. Com maioria sendo despertos, herdandos ou semideuses romanos.</p>
          <p>Ao adentrar a portão natural formado por duas árvores ancestrais cujos galhos se curvam em reverência, você sentiu o véu entre os mundos se descerrar. Em seguida, pronunciou as palavras sagradas na velha língua grega:</p>
         
        </div>
        <img className='imgInicial' src={imgInicial} alt='' />
      </div>
      <div className = 'parteFinal'>
        <div className = 'textoFinal'>
         <p className = 'letra-grega'> Αναπνεύστε στους καθαρούς ανέμους της δικαιοσύνης, αρνηθείτε το κενό της νύχτας και τέλος κολυμπήστε στην ομορφιά της ζωής. </p>
          <p>Um instante, revelou-se diante de dois montes colossais que flanqueiam o acesso à cidade. Cada pedra e sopro de névoa aqui contam histórias de eras passadas, aguardando que você escreva o próximo capítulo. </p>
          <p>Se porventura se perguntar: Se romanos e gregos estão em paz, por que mantemos velhos encantamentos em vez de unificar cultos? Lembre-se: quando algo já funciona, por que alterar?</p>
          <p>Prepare‑se, portanto, para explorar distritos suspensos, descobrir portais ocultos e trilhar sendas onde o divino corre tão livre quanto o vento que percorre os cumes.</p>
          <p className = 'mensagem-final'>Que seus genes divinos despertem todo o seu potencial e o conduzam a descobertas que transcendem o mundo humano.</p>
          <p className = 'bem-vindo'>Bem vindo a "Cidade de Zeus"!</p>
          </div>
      </div>
    </>
  );
}