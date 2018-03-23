import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import  { changePost } from '../actions/actions'
import { Link } from "react-router-dom";

import CommentList from './CommentList'
import AddCommentForm from './AddCommentForm'
import AddPostForm from './AddPostForm'
import SelectSortMethod from './SelectSortMethod'


class VoteScoreForm extends Component {

	
	state = {
		score : 0
	}
	
	
	
	
	
	increaseVote = (postId) => {
	
		fetch('http://localhost:3001/posts/' + postId, {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
  			},
  			method : "POST",
  			body : JSON.stringify({ option : "upVote"})
		}).then( rep => rep.json() )
		.then( data => this.setState({score : data.voteScore }))
		
	}
	
	
	
	handleIncreaseScore = () => {
		this.increaseVote(this.props.postId)
		this.setState({ score : this.props.voteScore + 1 })
  		console.log(this.state.score)
		this.props.IncreaseVote(this.props.postId, this.state.score)
	}
	
	
	
	componentDidMount() {
	
		console.log(this.props.voteScore)
		
		
		if(this.props.voteScore != "undefined"){
			this.setState({score : this.props.voteScore })
		} else {
			this.setState({score : 0 })
		}
		
		
	}
	
	

	
  
  
  render() {
    
    
    const {postId, voteScore} = this.props
    
  	
  	
    return (

            
		<div class="input-group plus-minus-input">
		  <div class="input-group-button">
			<button type="button" class="button hollow circle" data-quantity="minus" data-field="quantity" onClick={() => this.handleIncreaseScore(postId)}>
			  <i class="fa fa-minus" aria-hidden="true"></i>
			</button>
		  </div>
		  <input class="input-group-field" type="number" name="quantity" value={this.state.score}></input>
		  <div class="input-group-button">
			<button type="button" class="button hollow circle" data-quantity="plus" data-field="quantity">
			  <i class="fa fa-plus" aria-hidden="true"></i>
			</button>
		  </div>
		</div>


        
    )
  }
}



function mapStateToProps ({
	posts,
	comments,
	categories
}) {
  
  return {
  
  	posts,
	comments,
	categories
  
  }
}




const mapDispatchToProps = dispatch => ({
	
	IncreaseVote: (id, newscore) => { 
  		
  		dispatch(changePost({ id : id, param : 'voteScore', newValue : newscore}))
	}
	
	
	
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(VoteScoreForm)












