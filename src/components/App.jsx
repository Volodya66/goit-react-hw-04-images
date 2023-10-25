
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
  page: '',    
  totalPages: '',   //? then
  totalHits:'',     //? then
  photo:  [],      
  loading: false,    
  error: null,        //? then
  bigUrl: null,
};

componentDidUpdate(prevProps,prevState){
  const { searchPhoto, page } = this.state;
  
  if (prevState.searchPhoto !== searchPhoto || prevState.page !== page) {
    this.setState({ error:null });

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
  // this.setState({ bigUrl: null })
  const bigPhotoId = evt.currentTarget.getAttribute('id');
  // console.log(bigPhotoId)
  this.setState({ bigUrl: bigPhotoId });
  
}
  
onClick = (event) => {
  this.setState(prevState => ({
    page: prevState.page + 1,loading: true
  }));
}
  
settingSearchOption=option=>{
  this.setState({ photo: [],searchPhoto: option,page: 1,totalPages: '',totalHits:'' ,loading: true,});
}
  
render(){
  const {photo,totalPages,page,loading,bigUrl} = this.state;
  const dieRenderingBtn = totalPages > page;
  // console.log(loading)
  // console.log('searchPhoto', this.state.searchPhoto)
   console.log('state',this.state)
  return (
    <>
      <Searchbar onSubmit={this.settingSearchOption} />
      {photo && photo.length > 0 && (<ImageGallery getBigPhoto={this.getBigUrlPhoto} cards={photo} />)} 
      {loading && (<Loader/>)}
      {dieRenderingBtn && (<Button onClick={this.onClick} />)}
      {bigUrl && (<Modals url={bigUrl} onClose={() => this.setState({ bigUrl: null })}/>)}
      {/* {error&& ()} */}
    </>
  )
}
}


export default App;