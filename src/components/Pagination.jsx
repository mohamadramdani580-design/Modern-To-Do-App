function pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null; // Ne pas afficher si une seule page

  return (
    <div className="pagination">
      <button 
        disabled={currentPage === 1} 
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Précédent
      </button>
      
      <span>Page {currentPage} sur {totalPages}</span>

      <button 
        disabled={currentPage === totalPages} 
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Suivant
      </button>
    </div>
  );
}
export default pagination