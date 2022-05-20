import { useState } from "react";
import { useFetch } from "../../hooks";
import { Loading, CopiesGridItem, Pagination } from "../../components";
import "./CopiesGrid.css";

const CopiesGrid = ({ url }) => {

    const { isLoading, data: copies } = useFetch( url );

    const [page, setPage] = useState(0);
    const perPage = 10
    const totalPages = Math.ceil(copies?.length / perPage)

    return (
        <section className="my-collection">
            <h2 className="my-collection-title">My Collection</h2>
            { isLoading && < Loading /> }
            { !isLoading && copies && copies.length > 0 &&
                <section className="copies-grid">
                    { copies.slice( page * perPage, ( page + 1 ) * perPage ).map( copy =>
                        <CopiesGridItem key={ copy.id}  copy={ copy } />
                    )}
                </section>
            }
            { !isLoading && copies?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }
        </section>
    );

};

export default CopiesGrid;