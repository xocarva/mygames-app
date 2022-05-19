import { useFetch } from "../../hooks";

const Copies = () => {

    const { status, data:genres, error, isLoading  } = useFetch( 'http://localhost:8000/api/copies' );

    console.log(status)
    console.log(genres)
    console.log(error)
    console.log(isLoading)

    return <main>Copies</main>


};

export default Copies;