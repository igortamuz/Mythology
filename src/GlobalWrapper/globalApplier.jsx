import React, { useEffect, useRef, useCallback } from "react";
import {
  Zap,
  Undo2,
  HeartCrack,
  Sword,
  BookOpen,
  ShieldCheck,
  XCircle,
  Skull,
  Bolt,
  Bomb,
  Angry,
  Shield,
  Syringe,
  Lock,
  Star,
  Repeat,
  Crosshair,
  Flower2,
  Droplets,
  FlaskConical,
  Snowflake,
  GitBranch,
  Flame,
  Biohazard,
  Gem,
  Grape,
  CircuitBoard,
  Asterisk,
  Wind,
  Anchor,
  EyeOff,
  EarOff,
  Hand,
  Utensils,
  Waves,
  ChevronsUp,
  ChevronsDown,
  Heart
} from "lucide-react";
import ReactDOMServer from "react-dom/server";

const keywordData = [
  { term: "Amplificação", color: "#3b82f6", iconName: "Zap" },
  { term: "Devolução", color: "#10b981", iconName: "Undo2" },
  { term: "Dor Cruél", color: "#ef4444", iconName: "HeartCrack" },
  { term: "Laminar Sagrada", color: "#f59e0b", iconName: "Sword" },
  { term: "Papiro Sagrado", color: "#a855f7", iconName: "BookOpen" },
  { term: "Ataque Preventivo", color: "#84cc16", iconName: "ShieldCheck" },
  { term: "Eliminar", color: "#ef4444", iconName: "XCircle" },
  { term: "Arruinar", color: "#78716c", iconName: "Skull" },
  { term: "Ruptura", color: "#f59e0b", iconName: "Bolt" },
  { term: "Fúria", color: "#dc2626", iconName: "Angry" },
  { term: "Lâmina Furiosa", color: "#b91c1c", iconName: "Sword" },
  { term: "Barreira", color: "#22d3ee", iconName: "Shield" },
  { term: "Extorquir", color: "#4ade80", iconName: "Syringe" },
  { term: "Fixação", color: "#64748b", iconName: "Lock" },
  { term: "Perfeição", color: "#facc15", iconName: "Star" },
  { term: "Reflexão", color: "#0ea5e9", iconName: "Repeat" },
  { term: "Provocação", color: "#e11d48", iconName: "Crosshair" },
  { term: "Espinhos", color: "#ec4899", iconName: "Flower2" },
  { term: "Sangramento", color: "#ef4444", iconName: "Droplets" },
  { term: "Corrosão", color: "#a16207", iconName: "FlaskConical" },
  { term: "Explosão", color: "#f97316", iconName: "Bomb" },
  { term: "Congelamento", color: "#38bdf8", iconName: "Snowflake" },
  { term: "Encarceramento", color: "#7c3aed", iconName: "GitBranch" },
  { term: "Queimadura", color: "#ea580c", iconName: "Flame" },
  { term: "Infecção", color: "#84cc16", iconName: "Biohazard" },
  { term: "Petrificação", color: "#a8a29e", iconName: "Gem" },
  { term: "Envenenamento", color: "#7e22ce", iconName: "Grape" },
  { term: "Eletrificação", color: "#facc15", iconName: "CircuitBoard" },
  { term: "Atordoamento", color: "#fde047", iconName: "Asterisk" },
  { term: "Restrição", color: "#0891b2", iconName: "Wind" },
  { term: "Extorquido", color: "#16a34a", iconName: "Anchor" },
  { term: "Cegueira", color: "#475569", iconName: "EyeOff" },
  { term: "Surdez", color: "#475569", iconName: "EarOff" },
  { term: "Perda de Tato", color: "#475569", iconName: "Hand" },
  { term: "Perda de Paladar", color: "#475569", iconName: "Utensils" },
  { term: "Perda de Olfato", color: "#475569", iconName: "Waves" },
  { term: "Amor Incontrolável", color: "#ffc0cb", iconName: "Heart" },

  { term: "Incremento de PV", color: "#22c55e", iconName: "ChevronsUp" },
  { term: "Incremento de Força", color: "#22c55e", iconName: "ChevronsUp" },
  {
    term: "Incremento de Velocidade",
    color: "#22c55e",
    iconName: "ChevronsUp",
  },
  {
    term: "Incremento de Alcance",
    color: "#22c55e",
    iconName: "ChevronsUp",
  },
  {
    term: "Incremento de Dano de Habilidade",
    color: "#22c55e",
    iconName: "ChevronsUp",
  },
  {
    term: "Incremento de Dano de Físico",
    color: "#22c55e",
    iconName: "ChevronsUp",
  },
  {
    term: "Incremento de Dano de Arma",
    color: "#22c55e",
    iconName: "ChevronsUp",
  },

  { term: "Decrescimento de PV", color: "#f97316", iconName: "ChevronsDown" },
  {
    term: "Decrescimento de Força",
    color: "#f97316",
    iconName: "ChevronsDown",
  },
  {
    term: "Decrescimento de Velocidade",
    color: "#f97316",
    iconName: "ChevronsDown",
  },
  {
    term: "Decrescimento de Dano de Habilidade",
    color: "#f97316",
    iconName: "ChevronsDown",
  },
  {
    term: "Decrescimento de Dano de Físico",
    color: "#f97316",
    iconName: "ChevronsDown",
  },
  {
    term: "Decrescimento de Dano de Arma",
    color: "#f97316",
    iconName: "ChevronsDown",
  },
];

const iconComponents = {
  Zap,
  Undo2,
  HeartCrack,
  Sword,
  BookOpen,
  ShieldCheck,
  XCircle,
  Skull,
  Bolt,
  Bomb,
  Angry,
  Shield,
  Syringe,
  Lock,
  Star,
  Repeat,
  Crosshair,
  Flower2,
  Droplets,
  FlaskConical,
  Snowflake,
  GitBranch,
  Flame,
  Biohazard,
  Gem,
  Grape,
  CircuitBoard,
  Asterisk,
  Wind,
  Anchor,
  EyeOff,
  EarOff,
  Hand,
  Utensils,
  Waves,
  ChevronsUp,
  ChevronsDown,
  Heart
};

const regex = new RegExp(`(${keywordData.map((k) => k.term).join("|")})`, "gi");

export default function GlobalKeywordApplier({ children }) {
  const wrapperRef = useRef(null);
  const observer = useRef(null);
  const isHighlighting = useRef(false);

  const highlightNode = useCallback((node) => {
    const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    let currentNode;
    const nodesToProcess = [];

    while ((currentNode = treeWalker.nextNode())) {
      const parent = currentNode.parentElement;
      if (
        parent &&
        (parent.tagName === "SCRIPT" ||
          parent.tagName === "STYLE" ||
          parent.closest("[data-no-highlight]") ||
          parent.closest(".keyword-highlight"))
      ) {
        continue;
      }
      if (regex.test(currentNode.nodeValue)) {
        nodesToProcess.push(currentNode);
      }
    }

    nodesToProcess.forEach((textNode) => {
      const parts = textNode.nodeValue.split(regex);
      if (parts.length <= 1) return;

      const fragment = document.createDocumentFragment();

      parts.forEach((part) => {
        if (!part) return;
        const keyword = keywordData.find(
          (k) => k.term.toLowerCase() === part.toLowerCase()
        );

        if (keyword) {
          const IconComponent = iconComponents[keyword.iconName];
          const iconHtml = IconComponent
            ? ReactDOMServer.renderToString(
                <IconComponent size={16} className="inline-block" />
              )
            : "";

          const span = document.createElement("span");
          span.className = "keyword-highlight font-bold";
          span.style.color = keyword.color;
          span.innerHTML = `${part} <span class="inline-block ml-1 -translate-y-px">(${iconHtml})</span>`;
          fragment.appendChild(span);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  }, []);

  useEffect(() => {
    const targetNode = wrapperRef.current;
    if (!targetNode) return;

    if (observer.current) observer.current.disconnect();

    highlightNode(targetNode);

    observer.current = new MutationObserver((mutationsList) => {
      if (isHighlighting.current) return;

      isHighlighting.current = true;

      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              highlightNode(node);
            }
          });
        }
      }

      requestAnimationFrame(() => {
        isHighlighting.current = false;
      });
    });

    const config = { childList: true, subtree: true };
    observer.current.observe(targetNode, config);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [children, highlightNode]);

  return <div ref={wrapperRef}>{children}</div>;
}
