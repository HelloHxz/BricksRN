import React from 'react';

class Text extends React.Component {

  componentWillRecevieProps(){

  }

  render() {
  	var style = this.props.style||{};
  	if(this.props.selected){
  		style.color = "red";
  	}
    return (<span style={style} className='bri-span'>{this.props.children}</span>);
  }
}

export default Text;