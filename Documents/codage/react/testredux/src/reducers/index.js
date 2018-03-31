import {
  CHANGE_POST,
  ADD_POST,
  REMOVE_POST,
  ADD_COMMENT,
  CHANGE_COMMENT,
  ADD_CATEGORY
} from '../actions/actions'


import { combineReducers } from 'redux'


const postReducer = (posts={}, action) => {

	const {id, param, newValue, newtitle, newauthor, newbody, newid, newcategory, voteScore, timestamp } = action
	
	switch(action.type) {
		
		case CHANGE_POST:
			return { ...posts, [id] : { ...posts[id], [param] : newValue } }
			
			
		case ADD_POST:
			return Object.assign({}, posts, {[newid] :  {title: newtitle, author: newauthor, body: newbody, category : newcategory, timestamp : timestamp, voteScore : voteScore} })
			
		
		case REMOVE_POST:
			var id_postArray = Object.entries(posts).filter( id_post => id_post[0] !== id )
			var updatedPost ={}
			for (let id_post of id_postArray) {
				Object.assign(updatedPost, {[id_post[0]] :  {title: id_post[1].title, author: id_post[1].author, body: id_post[1].body, category : id_post[1].category, timestamp : id_post[1].timestamp, voteScore : id_post[1].voteScore} })
			}
			return updatedPost
		

		default:
			return posts
	}
}


const commentsReducer = (comments={}, action) => {

	const {id, param, newValue, newauthor, newbody, newid, newparentId, newscore, timestamp } = action
	
	switch(action.type) {
			
		case ADD_COMMENT:
			return Object.assign({}, comments, {[newid] :  {parentId: newparentId, author: newauthor, voteScore: newscore,  body: newbody,  timestamp: timestamp} })
			
		case CHANGE_COMMENT:
			return { ...comments, [id] : { ...comments[id], [param] : newValue } }
			

		default:
			return comments
	}
}


const categoryReducer = (categories={}, action) => {

	const { name, path} = action
	
	switch(action.type) {
		
		case ADD_CATEGORY:
			return [ ...categories, { name : name, path : path } ]
	
		default:
			return categories
	}
}





export default combineReducers({
	posts : postReducer,
	comments : commentsReducer,
	categories : categoryReducer
})


























