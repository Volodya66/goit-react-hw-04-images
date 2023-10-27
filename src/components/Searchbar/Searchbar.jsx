import React,{Component} from 'react';

import css from './Searchbar.module.css'

class Searchbar extends Component {

state ={
 searchParam: '',
};

onInputChange= evt =>{
const param =  evt.currentTarget.value ;  
this.setState({searchParam:param.toLowerCase()})
}
    
onFormChange = evt =>{
evt.preventDefault();
const form = evt.currentTarget;
const searchPhoto = form.elements.searchParam.value;

if(searchPhoto.trim()){
this.props.onSubmit(this.state.searchParam);
this.setState({searchParam:''})
}
form.reset();
}

render() {
       
return(
    
<header className={css.Searchbar}>
  <form onSubmit={this.onFormChange} className={css.SearchForm}>
    <button type="submit" className={css.SearchFormButton}>
      <span className={css.SearchFormButtonLabel}>Search</span>
    </button>

    <input onChange={this.onInputChange}
      name='searchParam'
      value={this.setState.searchParam}
      className={css.SearchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>

)

}
}

export default Searchbar