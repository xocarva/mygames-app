import { useState } from "react";
import { CopiesGridItem, Loading } from "../../components";
import { useFetch } from "../../hooks";
import "./MyCollection.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const MyCollection = () => {

    const [ url, setUrl ] = useState( SERVER_URL + '/copies' );

    const { isLoading, data: copies, links } = useFetch( url );

    return (
        <main className="my-collection-main">
            <aside className="filters">
                <h2 className="filters-title">Filters</h2>
            </aside>
            <section className="my-collection">
                <h2 className="my-collection-title">My Collection</h2>
                { isLoading && < Loading /> }
                { !isLoading && copies && copies.length > 0 &&
                    <section className="copies-grid">
                        { copies.map( copy =>
                            <CopiesGridItem key={ copy.id}  copy={ copy } />
                        )}
                    </section>
                }
                { !isLoading && links?.prev &&
                    <button className="next-page" onClick={ () => setUrl( links.prev ) }>prev</button>
                }
                { !isLoading && links?.next &&
                    <button className="prev-page" onClick={ () => setUrl( links.next ) }>next</button>
                }
            </section>
        </main>
    );
};

export default MyCollection;
