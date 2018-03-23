import React, { Component } from 'react'




class BigHeader extends Component {
  
  
  
  
  
  render() {
    
    const { openIngredientsModal } = this.props
    
    
    
    
    return (
      

        <div className='nav'>
          <h1 className='header'>Readable</h1>
          <button
            className='shopping-list'
            onClick={openIngredientsModal}>
              Shopping List
          </button>
        </div>
        
        
    )
  }
}


export default BigHeader











