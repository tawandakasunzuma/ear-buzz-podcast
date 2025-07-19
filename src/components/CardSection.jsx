import "../styles/CardSection.css"
import Card from "./Card"

export default function CardSection (props) {

    // Create cards from podcast data
    const cards = props.podcastData.map(podcast => (
        <Card 
            key={podcast.id} 

            podcastData={podcast}
            
            searchLetters={props.searchLetters}
            selectedGenre={props.selectedGenre} 
            sortOrder={props.sortOrder} 
            currentPage={props.currentPage} 
        />
    ))

    return (
        <>
            <section className="card-section">
                {cards}
            </section>
        </>
    )
}