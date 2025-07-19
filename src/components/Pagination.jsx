import '../styles/Pagination.css'

export default function Pagination ({ currentPage, totalPages, setCurrentPage }) {
    
    // Create array of page numbers from total pages needed
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    };

    // Generate buttons for each page
    const numberOfPagesButtons = pages.map(page => (
        <button
            className={`pagination-button page-num-btn${page === currentPage ? ' active' : ''}`}
            key={page}
            onClick={() => setCurrentPage(page)}
        >
            {page}
        </button>
    ))

    // Previous page button click - Go to previous page
    function handlePreviousPageClick () {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    // Next page button click - Go to next page
    function handleNextPageClick () {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <nav className="pagination-section">
            
            {/* Prev button */}
            <button
                className="pagination-button"
                onClick={handlePreviousPageClick}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {/* Number of pages button */}
            {numberOfPagesButtons}

            {/* Next button */}
            <button 
                className="pagination-button"
                onClick={handleNextPageClick}
                disabled={currentPage === totalPages}
            >
                Next
            </button>

        </nav>
    )
}