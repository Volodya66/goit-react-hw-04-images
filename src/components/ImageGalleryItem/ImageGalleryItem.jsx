



export default function ImageGallery({ srs,alt,bigPhoto,getBigPhoto }) {
 
  return (
  <li key={bigPhoto} id={bigPhoto} onClick={getBigPhoto} className="ImageGalleryItem">
   <img className="ImageGalleryItem-image" src={srs} alt={alt} />
  </li>
  );
}



