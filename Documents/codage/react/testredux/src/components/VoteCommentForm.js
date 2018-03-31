import React, { Component } from 'react'
import { connect } from 'react-redux'

import  { changeComment } from '../actions/actions'


class VoteScoreForm extends Component {

	
	state = {
		score : 0
	}
	
	
	
	increaseVote = (commentId, score) => {
	
		fetch('http://localhost:3001/comments/' + commentId, {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
  			},
  			method : "PUT",
  			body : JSON.stringify({ voteScore : score})
		})
		.then( rep => rep.json() )
		.then( data => this.props.IncreaseVote(data.id, data.voteScore) )
		
	}
	
	
	decreaseVote = (commentId, score) => {
	
		fetch('http://localhost:3001/comments/' + commentId, {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
  			},
  			method : "PUT",
  			body : JSON.stringify({ voteScore : score})
		})
		.then( rep => rep.json() )
		.then( data => this.props.IncreaseVote(data.id, data.voteScore) )
		
	}
	

	
	
	handleIncreaseScore = () => {
		this.increaseVote(this.props.commentId, this.props.voteScore + 1)
		this.setState({ score : this.props.voteScore + 1 })
	}
	
	
	handleDecreaseScore = () => {
		this.decreaseVote(this.props.commentId, this.props.voteScore - 1)
		this.setState({ score : this.props.voteScore - 1 })
	}
	
	
	
	
	
	componentDidMount() {
	
		if(this.props.voteScore !== "undefined"){
			this.setState({score : this.props.voteScore })
		} else {
			this.setState({score : 0 })
		}
		
		
	}
	
	

	
  
  
  render() {
    
    
    const {commentId} = this.props
    
  	
    return (
          
		<div className="encart" style={{width:250}}>
			<button type="button" onClick={() => this.handleIncreaseScore(commentId)}>Increase</button>
			
				Score : {this.props.voteScore}
			
			<button type="button" onClick={() => this.handleDecreaseScore(commentId)}>Decrease</button>
			
			
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
  		
  		dispatch(changeComment({ id : id, param : 'voteScore', newValue : newscore}))
	}
	
	
	
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(VoteScoreForm)












