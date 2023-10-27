
import React,{Component} from "react";

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modals from "./Modal/Modal";

import getImage from "../api-ferch";


class App extends Component {

state = {
  searchPhoto: '',   
  page: 0,    
  totalPages: '',   //? then
  totalHits:'',     //? then
  photo:  [],      
  loading: false,    
  error: null,        //? then
  bigUrl: null,
  
};

componentDidUpdate(_,prevState){
  const { searchPhoto, page, } = this.state;
  
  if (prevState.searchPhoto !== searchPhoto || prevState.page !== page ) {
    this.setState({ error:null , loading: true});

    getImage(searchPhoto, page)
    .then(data => {
      this.setState({ totalHits: data.totalHits, totalPages: Math.ceil(data.totalHits / 12) })
      this.setState(prevState => ({
        photo : [...prevState.photo, ...data.hits]
      }))
    }
    )
    .catch(error => this.setState({error:error}))
    .finally(() => {
        this.setState({ loading: false });
      });
  }
  }
  
  

getBigUrlPhoto=(evt)=>{
  const bigPhotoId = evt.currentTarget.getAttribute('id');
  this.setState({ bigUrl: bigPhotoId });
  
}
  
onClick = (event) => {
  this.setState(prevState => ({
    page: prevState.page + 1,
    loading: true
  }));
}
  
 
  
  settingSearchOption = option => {
 const {searchPhoto,totalPages,page} =this.state
 
  if (searchPhoto === option ) {
    if (page === totalPages) {
      this.setState(
        { photo: [], searchPhoto: option, page: 1 });
      return
    }
    this.setState(prevState => ({
    page: prevState.page + 1,
    loading: true
    }));
    
      return
    
    }
 
  
   this.setState({ photo: [],searchPhoto: option,totalPages: '',page: 1,totalHits:''  });
}
  
render(){
  const {photo,totalPages,page,loading,bigUrl,error} = this.state;
  const dieRenderingBtn = totalPages > page;
  console.log(this.state)
  return (
    <>
      <Searchbar onSubmit={this.settingSearchOption} />
      {photo && photo.length > 0 && (<ImageGallery getBigPhoto={this.getBigUrlPhoto} cards={photo} />)} 
      {loading && (<Loader/>)}
      {dieRenderingBtn && (<Button onClick={this.onClick} />)}
      {bigUrl && (<Modals url={bigUrl} onClose={() => this.setState({ bigUrl: null })}/>)}
      {error && (error)}
    </>
  )
}
}


export default App;