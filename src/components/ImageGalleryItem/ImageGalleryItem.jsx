



export default function ImageGallery({ srs,alt,bigPhoto,getBigPhoto }) {
 
  return (
  <li key={bigPhoto} id={bigPhoto} onClick={getBigPhoto} className="ImageGalleryItem">
   <img className="ImageGalleryItem-imag" src={srs} alt={alt} />
  </li>
  );
}



