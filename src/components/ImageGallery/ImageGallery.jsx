// import { render } from "@testing-library/react"
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

export default function ImageGallery({ cards,getBigPhoto }) {
  // console.log('cards', ...cards);
  //  console.log('cardssssss', cards);
  return (
    <ul className="ImageGallery">
      {cards.map( ({  webformatURL,largeImageURL, tags })=>{
        return <ImageGalleryItem key={webformatURL} srs={webformatURL} getBigPhoto={getBigPhoto} alt={tags} bigPhoto={ largeImageURL}/>
      })}
    </ul>
  );
}