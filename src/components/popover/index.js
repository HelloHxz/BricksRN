import React from 'react';
import Easing from '../easing';
import Text from '../text'
import View from '../view'
import Animated from '../animated'
import TouchableWithoutFeedback from '../touchablewithoutfeedback'
import StyleSheet from '../style'


var styles = StyleSheet.create({
	wrapper:{
		position:"absolute",
		backgroundColor:"transparent",
		overflow:"hidden",
		zIndex:1000
	},
	wrapper_hide:{
		left:-1000,
		width:0,
		height:0
	},
	wrapper_show:{
		top:0,
		left:0,
		right:0,
		bottom:0,
	},
	bkLayer:{
		position:"absolute",
		top:0,
		left:0,
		right:0,
		bottom:0,
		backgroundColor:"#000",
		overflow:"hidden",
		opacity:0.5,
		zIndex:1,
	}
})

class Popover extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			target:null,
			isShowVisiblity:false,
			openValue:new Animated.Value(0),
			isShow:false,
			direction:"top" // top right bottom left auto
		}
	}

	componentDidMount(){
		
	}
	componentWillReceiveProps(nextProps){
		var config = nextProps.config || {};
		if(config.target){
			if(this.state.isShow){
			
			}else{
				this.setState({isShowVisiblity:true,isShow:true},function(){
					setTimeout(()=>{
						this.setState({isShowVisiblity:false});
						Animated.timing(
					        this.state.openValue,
					        {
					          toValue: 1,
					          duration:300,
					          bounciness: 0, 
					          easing:Easing.ease,
					          restSpeedThreshold: 1
					        }
					      ).start(
					      	
					      )
					},20)
				});
			}
		}else{
			Animated.timing(
		        this.state.openValue,
		        {
		          toValue: 0,
		          duration:300,
		          bounciness: 0, 
		          easing:Easing.ease,
		          restSpeedThreshold: 1
		        }
			).start(()=>{
			  	this.setState({isShow:false,isShowVisiblity:false});
			})
		}

	}

	bkPress(){
		this.props.onBackLayerClick&&this.props.onBackLayerClick();
	}

	render(){
		const {
		  openValue
		} = this.state;
		let overlayOpacity = 0;
		if(this.state.isShowVisiblity){
		}else{
			overlayOpacity = openValue.interpolate({
		      inputRange: [0, 1],
		      outputRange: [0.1, 0.4],
		      extrapolate: 'clamp',
		    });
		}
	    const animatedOverlayStyles = { opacity: overlayOpacity };
		const wrapperStyle = this.state.isShow?styles.wrapper_show:styles.wrapper_hide;
		return (<View style={{...styles.wrapper,...wrapperStyle}}>
				<TouchableWithoutFeedback onPress={this.bkPress.bind(this)}>
					<Animated.View style={{...styles.bkLayer,...animatedOverlayStyles}}></Animated.View>
				</TouchableWithoutFeedback>
			</View>);
	}
}

export default Popover;