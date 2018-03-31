import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

  
class Carrousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.comments.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.comments.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  
  
  formattedPostdate = (timestamp) => {
  	var a = new Date(timestamp * 1000);
  		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min + ':' + sec ;
		return time;
  }

  render() {
  
  
	const { comments, postId} = this.props
  	var commentArray = Object.values(comments).filter( comment => comment.parentId === postId )
  	console.log('commentArray', commentArray)
  
    const { activeIndex } = this.state;

    const slides = commentArray.map((comment) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited}  >
        	<div className='comment'>
        	Author : {comment.author} <br/>
    		Body : {comment.body} <br/>
    		posted on {this.formattedPostdate(comment.timestamp)} <br/>
    		</div>
        </CarouselItem>
      );
      
      });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={Object.values(this.props.comments)} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
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


export default connect(
  mapStateToProps
)(Carrousel)
















