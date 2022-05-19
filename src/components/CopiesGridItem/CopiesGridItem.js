import "./CopiesGridItem.css";

const CopiesGridItem = ({ copy }) => {

    return (
            <article className="copies-grid-item" key={ copy.id }>
                <header className="copy-header">
                    <h3 className="copy-title">{ copy.relationships.game.attributes.title }</h3>
                </header>
                <section className="copy-data">
                    <span className="genre">{ copy.relationships.game.relationships.genre.name }</span>
                    <span className="platform">{ copy.relationships.platform.name }</span>
                    <span className="studio">{ copy.relationships.game.relationships.studio.name }</span>
                </section>
                <section className="copy-status">
                    <span className="copy-rating">{ copy.attributes.rating }</span>
                    <span className="copy-completed">{ copy.attributes.completed ? '✅' : '' }</span>
                </section>
                <section className="copy-management">
                    <span>✏️</span>
                    <span>🗑️</span>
                </section>
            </article>
    );
};

export default CopiesGridItem;
