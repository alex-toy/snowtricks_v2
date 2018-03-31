import React from 'react';
import Modal from 'react-modal';
import AddPostForm from './AddPostForm'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    width				  : '600px',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


Modal.setAppElement('#root')

class AddPostModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="AddPostForm">
        <button onClick={this.openModal}>Add post Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <AddPostForm />
          
          
          
        </Modal>
      </div>
    );
  }
}

export default AddPostModal







