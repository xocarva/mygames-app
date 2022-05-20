import "./Pagination.css";

const Pagination = ({ page, setPage, totalPages }) => {

  const handlePrev = () => page > 0 && setPage( page - 1 );
  const handleNext = () => page < totalPages - 1 && setPage( page + 1 );

  return (
    <div className="pagination">
      <div className="pagination-buttons">
      { page +1 > 1 &&<button onClick={ handlePrev }>Prev</button> }
      { page +1 < totalPages && <button onClick={ handleNext }>Next</button> }
      </div>
      <span className="total-pages">{ page + 1 } / { totalPages }</span>
    </div>

  );

};

export default Pagination;
