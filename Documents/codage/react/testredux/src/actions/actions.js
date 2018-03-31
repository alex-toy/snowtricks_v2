export const ADD_CATEGORY = 'ADD_CATEGORY'
export function addCategory ({ name, path }) {
  return {
    type: ADD_CATEGORY,
	name, 
	path
  }
}


export const ADD_POST = 'ADD_POST'
export function addPost ({ newid, newtitle, newauthor, newbody, newcategory, timestamp, voteScore }) {
  return {
    type: ADD_POST,
	newid, 
	newtitle, 
	newauthor, 
	newbody,
	newcategory,
	timestamp,
	voteScore
  }
}


export const CHANGE_POST = 'CHANGE_POST'
export function changePost ({ id, param, newValue }) {
  return {
    type : CHANGE_POST, 
    id, 
    param, 
    newValue
  }
}


export const REMOVE_POST = 'REMOVE_POST'
export function removePost ({ id }) {
  return {
    type : REMOVE_POST, 
    id
  }
}



export const ADD_COMMENT = 'ADD_COMMENT'
export function addComment ({ newid, newparentId, newauthor, newscore, newbody, timestamp }) {
  return {
    type: ADD_COMMENT,
	newid, 
	newparentId, 
	newauthor, 
	newscore, 
	newbody,
	timestamp
  }
}




export const CHANGE_COMMENT = 'CHANGE_COMMENT'
export function changeComment ({ id, param, newValue }) {
  return {
    type: CHANGE_COMMENT,
	id, 
	param, 
	newValue 
  }
}

























