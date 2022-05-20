import { useFetch } from "../../hooks";
import CopiesGridItem from "../CopiesGridItem/CopiesGridItem";
import Loading from "../Loading/Loading";
import "./CopiesGrid.css";

const CopiesGrid = ({ url }) => {

    const { isLoading, data: copies } = useFetch( url );

    return (
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
            <button className="next-page">prev</button>
            <button className="prev-page">next</button>
        </section>
    )

};

export default CopiesGrid;