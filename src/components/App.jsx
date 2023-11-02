

import { useState, useEffect } from "react";

import 'animate.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modals from "./Modal/Modal";
import Error from './Error/Error'

import getImage from "../api-ferch";



export default function App() {
  const [searchPhoto, setSearchPhoto] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState('');
 
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bigUrl, setBigUrl] = useState(null);
  

  useEffect(() => {

    
    // if (page !== 0) {
    // //  return
    //   // .then(data => {
    //   //   setTotalHits(data.totalHits);
    //   //   setTotalPages(Math.ceil(data.totalHits / 12));
    //   //   setPhoto([...photo, ...data.hits]);
    //   // })
    //   // .catch(error => setError(error))
    //   // .finally(() => { setLoading(false); });
      
    //   try {
    //     const data =  getImage(searchPhoto, page);
    //     console.log(data)
    //   } catch (error) {
    //     setError('щось сталось не так');
    //   } finally{setLoading(false)};

    // };

   
     
      // getImage(searchPhoto, page)
      // try {
      //   console.log()
      // } catch (error) {
        
      // }finally{setLoading(false)};
    const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getImage(searchPhoto, page);
      setTotalPages(Math.ceil(data.totalHits / 12));
      setPhoto(prevPhoto => [...prevPhoto, ...data.hits]);
    } catch (error) {
      setError('Упссс, щось не так');
      setTotalPages(0)
      setPhoto([]);
      console.error(
        error.message);
    } finally {
      setLoading(false);
    }
  };

  if (page !== 0) {
    fetchData();
  }
  }, [searchPhoto, page ])


  
  const getBigUrlPhoto = (evt) => {
    const bigPhotoId = evt.currentTarget.getAttribute('id');
    setBigUrl(bigPhotoId);
  };
  
  const onClick = (event) => {
    setError(null)
    setPage(prevState => prevState + 1);
    setLoading(true);
  };

  const settingSearchOption = option => {
   

    if (searchPhoto !== option) {
        setError(null)
        setPhoto([]);
        setSearchPhoto(option);
        setPage(1);
        return
    };
    
      setPage(prevState => prevState + 1);
      setLoading(true);
    
      return
   
  };
  let dieRenderingBtn = totalPages > page;

    return (
      <>
        <Searchbar onSubmit={settingSearchOption} />
        {photo && photo.length > 0 && (<ImageGallery getBigPhoto={getBigUrlPhoto} cards={photo} />)}
        {loading && (<Loader />)}
        {dieRenderingBtn && (<Button onClick={onClick} />)}
        {bigUrl && (<Modals url={bigUrl} onClose={() => setBigUrl(null)} />)}
        {error && (<Error title={error} />)}
      </>
    )

  }



// class App extends Component {

// state = {
//   searchPhoto: '',   
//   page: 0,    
//   totalPages: '',   //? then
//   totalHits:'',     //? then
//   photo:  [],      
//   loading: false,    
//   error: null,        //? then
//   bigUrl: null,
  
// };

// componentDidUpdate(_,prevState){
//   const { searchPhoto, page, } = this.state;
  
//   if (prevState.searchPhoto !== searchPhoto || prevState.page !== page ) {
//     this.setState({ error:null , loading: true});

//     getImage(searchPhoto, page)
//     .then(data => {
//       this.setState({ totalHits: data.totalHits, totalPages: Math.ceil(data.totalHits / 12) })
//       this.setState(prevState => ({
//         photo : [...prevState.photo, ...data.hits]
//       }))
//     }
//     )
//     .catch(error => this.setState({error:error}))
//     .finally(() => {
//         this.setState({ loading: false });
//       });
//   }
//   }
  
  

// getBigUrlPhoto=(evt)=>{
//   const bigPhotoId = evt.currentTarget.getAttribute('id');
//   this.setState({ bigUrl: bigPhotoId });
  
// }
  
// onClick = (event) => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//     loading: true
//   }));
// }
  
 
  
//   settingSearchOption = option => {
//  const {searchPhoto,totalPages,page} =this.state
 
//   if (searchPhoto === option ) {
//     if (page === totalPages) {
//       this.setState(
//         { photo: [], searchPhoto: option, page: 1 });
//       return
//     }
//     this.setState(prevState => ({
//     page: prevState.page + 1,
//     loading: true
//     }));
    
//       return
    
//     }
 
  
//    this.setState({ photo: [],searchPhoto: option,totalPages: '',page: 1,totalHits:''  });
// }
  
// render(){
//   const {photo,totalPages,page,loading,bigUrl,error} = this.state;
//   const dieRenderingBtn = totalPages > page;
//   console.log(this.state)
//   return (
//     <>
//       <Searchbar onSubmit={this.settingSearchOption} />
//       {photo && photo.length > 0 && (<ImageGallery getBigPhoto={this.getBigUrlPhoto} cards={photo} />)} 
//       {loading && (<Loader/>)}
//       {dieRenderingBtn && (<Button onClick={this.onClick} />)}
//       {bigUrl && (<Modals url={bigUrl} onClose={() => this.setState({ bigUrl: null })}/>)}
//       {error && (error)}
//     </>
//   )
// }
// }
