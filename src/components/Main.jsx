import "../styles/Main.css"
import FilterSection from "./FilterSection"
import CardSection from "./CardSection"
import Pagination from "./Pagination"

export default function Main (props) {
    return (
        <main>
            {/* Filter section */}
            <FilterSection 
                selectedGenre={props.selectedGenre} 
                setSelectedGenre={props.setSelectedGenre} 
                sortOrder={props.sortOrder} 
                setSortOrder={props.setSortOrder} 
                setCurrentPage={props.setCurrentPage}
            />

            {/* Card section */}
            <CardSection 
                podcastData={props.podcastData}
                searchLetters={props.searchLetters}
                selectedGenre={props.selectedGenre} 
                sortOrder={props.sortOrder} 
                currentPage={props.currentPage}
            />

            {/* Pagination section */}
            {props.totalPages > 0 && (
                <Pagination
                    currentPage={props.currentPage}
                    totalPages={props.totalPages}
                    setCurrentPage={props.setCurrentPage}
                />
            )}

            {/* Show no podcasts displayed */}
            {props.podcastData.length === 0 && !props.loading && (
                <div className="no-podcasts-container">
                <p className="no-podcasts-text">No podcasts found</p>
                </div>
            )}   
        </main>
    )
}