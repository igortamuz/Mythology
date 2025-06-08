import React, { useState } from "react";
import "./shop.css";
import shopData from "../../../Json/Shop/Shop.json";
import {
    Gem,
    Shield,
    Egg,
    Sparkles,
    Wand,
    Hammer,
    HeartPulse,
    Briefcase,
    CookingPot,
    Leaf,
    Drama,
    PawPrint,
    Swords,
    FlaskConical
} from "lucide-react";

const categoryIcons = {
    grau1: <Gem size={24} />,
    grau2_3: <Shield size={24} />,
    reborn: <Sparkles size={24} />,
    especiais: <Wand size={24} />,
    servicos: <Briefcase size={24} />,
};

const subCategoryIcons = {
    metais: <Gem size={20} className="subcategory-icon" />,
    itens: <CookingPot size={20} className="subcategory-icon" />,
    ovinhos: <Egg size={20} className="subcategory-icon" />,
    lacrimas: <Sparkles size={20} className="subcategory-icon" />,
    outros: <Wand size={20} className="subcategory-icon" />,
    alquimista: <FlaskConical size={20} className="subcategory-icon" />,
    ferreiro: <Hammer size={20} className="subcategory-icon" />,
    enfermeiros: <HeartPulse size={20} className="subcategory-icon" />,
    artistas: <Drama size={20} className="subcategory-icon" />,
    agricultores: <Leaf size={20} className="subcategory-icon" />,
    domadores: <PawPrint size={20} className="subcategory-icon" />,
    guardioes: <Swords size={20} className="subcategory-icon" />,
    cura: <HeartPulse size={18} />,
    debuffs: <Sparkles size={18} />
};


const ItemCard = ({ item }) => (
    <div className="item-card">
        {item.imagem && (
            <div className="item-image-container">
                <img
                    src={item.imagem}
                    alt={`[Imagem de ${item.nome}]`}
                    className="item-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/400x300/1a1614/b0a49d?text=Imagem+Indisponível";
                    }}
                />
            </div>
        )}
        <div className="item-card-content">
            <div className="item-card-header">
                <h3 className="item-name">{item.nome}</h3>
                {item.valor && <p className="item-price">{item.valor}</p>}
            </div>
            <div className="item-card-body">
                <div className="item-details">
                    {item.nivel != null && (
                        <p>
                            <strong>Nível:</strong> {item.nivel}
                        </p>
                    )}
                    {item.condicao && (
                        <p>
                            <strong>Condição:</strong> {item.condicao}
                        </p>
                    )}
                    {item.quantidade && (
                        <p>
                            <strong>Quantidade:</strong> {item.quantidade}
                        </p>
                    )}
                </div>
                {item.descricao && <p className="item-description">{item.descricao}</p>}
                {item.capacidades && (
                    <p className="item-description">{item.capacidades}</p>
                )}
                {item.observacao && (
                    <p className="item-obs">
                        <strong>Observação:</strong> {item.observacao}
                    </p>
                )}
                {item.companheiros && (
                    <div className="companions-section">
                        <h4>Companheiros Possíveis:</h4>
                        <ul>
                            {item.companheiros.map((c, i) => (
                                <li key={i}>
                                    <strong>{c.nome}:</strong> {c.descricao}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {item.status && (
                    <div className="status-section">
                        <h4>Bônus de Status:</h4>
                        <ul>
                            {Object.entries(item.status).map(([stat, value]) => (
                                <li key={stat}>
                                    <strong>{stat}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const ServiceCard = ({ service }) => {
    if (!service || !service.nome) return null;
    return (
        <div className="service-category-card">
            <h2 className="service-category-title">
                {subCategoryIcons[service.key]} {service.nome}
            </h2>
            {service.obs && <p className="service-obs">{service.obs}</p>}
            {service.itens &&
                service.itens.map((item, index) => (
                    <div key={index} className="service-item">
                        <span className="service-item-name">{item.nome}</span>
                        <span className="item-price">{item.valor}</span>
                    </div>
                ))}
            {service.cura && (
                <div className="sub-service-section">
                    <h4>
                        {subCategoryIcons.cura} {service.cura.titulo}
                    </h4>
                    <p className="service-obs">{service.cura.obs}</p>
                    {service.cura.itens.map((item, index) => (
                        <div key={index} className="service-item">
                            <span className="service-item-name">{item.nome}</span>
                            <span className="item-price">{item.valor}</span>
                        </div>
                    ))}
                </div>
            )}
            {service.debuffs && (
                <div className="sub-service-section">
                    <h4>
                        {subCategoryIcons.debuffs} {service.debuffs.titulo}
                    </h4>
                    <p className="service-obs">{service.debuffs.obs}</p>
                    {service.debuffs.itens.map((item, index) => (
                        <div key={index} className="service-item">
                            <span className="service-item-name">{item.nome}</span>
                            <span className="item-price">{item.valor}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Shop() {
    const [activeTab, setActiveTab] = useState("grau1");

    const renderContent = () => {
        const data = shopData[activeTab];
        if (!data) return <p>Categoria não encontrada.</p>;

        if (activeTab === "servicos") {
            return (
                <div className="items-grid">
                    {Object.entries(data).map(([key, serviceData]) => (
                        <ServiceCard key={key} service={{ ...serviceData, key }} />
                    ))}
                </div>
            );
        }

        return Object.entries(data).map(([category, items]) => (
            <div className="category-block" class key={category}>
                <h2 className="subcategory-title">
                    {subCategoryIcons[category] || null}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <div className="items-grid">
                    {items.map((item, index) => (
                        <ItemCard key={index} item={item} />
                    ))}
                </div>
            </div>
        ));
    };

    const tabs = {
        grau1: "1° Grau",
        grau2_3: "2°/3° Grau",
        reborn: "Reborn",
        especiais: "Especiais",
        servicos: "Serviços & Profissões",
    };

    return (
        <div className="shop-container">
            <header className="shop-header">
                <h1>Mercado & Ofícios</h1>
                <p>
                    Os melhores itens para gastar seus belos dracmas!
                </p>
            </header>

            <nav className="shop-tabs">
                {Object.entries(tabs).map(([key, name]) => (
                    <button
                        key={key}
                        className={`tab-button ${activeTab === key ? "active" : ""}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {categoryIcons[key]}
                        <span>{name}</span>
                    </button>
                ))}
            </nav>

            <main className="shop-content">{renderContent()}</main>
        </div>
    );
}