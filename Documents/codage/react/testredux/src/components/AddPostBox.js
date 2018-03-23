import React, { Component } from 'react'


import Modal from 'react-modal'

import Loading from 'react-loading'

import FoodList from './FoodList'
import AddPostForm from './AddPostForm'






class AddPostBox extends Component {

  

  render() {
    
    const { closePostModal, day, meal, postModalOpen, food, loadingFood, selectRecipe, searchFood } = this.props
    

    return (
      
		
        
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={closePostModal}
          contentLabel='Modal'
        >
          <div>
            {loadingFood === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <div className='search-container'>
                  
                  <h3 className='subheader'>
                    Add a post :
                  </h3>
                  
                  
                  <AddPostForm />
                  
                  <div className='search'>
                    
                    <input
                      className='food-input'
                      type='text'
                      placeholder='author'
                      ref={(input) => this.input = input}
                	/><br />
                	
                	<input
                      className='food-input'
                      type='text'
                      placeholder='title'
                      ref={(input) => this.input = input}
                	/><br />
                    
                    <button
                      className='icon-btn'
                      onClick={searchFood}>
                    </button>
                    
                  </div>
                  
                </div>}
          </div>
        </Modal>
	


    )
  }
}











export default AddPostBox




















