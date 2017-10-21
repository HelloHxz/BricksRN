
import React from 'react';
import SvgUri from './react-native-svg-uri/index';
import StyleSheet from '../style';
import View from '../view';
import Animated from '../animated'
import Easing from '../easing'
const Theme =require("../theme").default;
import Common from './common';

class AnView extends React.Component{
  render() {
    var style = this.props.style;
      if(style.transform){
        for(var i=0,j=style.transform.length;i<j;i++){
          var item = style.transform[i];
          for(var key in item){
            if(key==="rotate"){
              item[key] = parseInt(item[key])+"deg";
            }
          }
        }
      }
     return (<View {...this.props} style={style}></View>);
  }
}

const MyAnView = Animated.createAnimatedComponent(AnView);

export default class Icon extends React.Component {
constructor(props){
    super(props);
    this.preRotate = parseInt(props.rotate||0);
    this.state = {
      rotate:new Animated.Value(parseInt(props.rotate||0))
    };
  }

componentWillReceiveProps(nextProps){

    if(nextProps.rotate||nextProps.rotate===0){
      if(nextProps.rotate!==this.state.rotate){
      var to = nextProps.rotate||0;
         Animated.spring(
                  this.state.rotate,
                  {
                    toValue: parseInt(to),
                    duration:50
                  }
                ).start(
                  ()=>{
                     this.preRotate = this.state.rotate._value;
                  }
                )
    }
    }
    
  }
  render() {
    var isAnimateView = false;
    if (!this.props.icon) {
      return null;
    }
    var Wrapper = View;
    if(this.props.rotate||this.props.rotate===0){
      Wrapper = MyAnView;
      isAnimateView = true;
    }


    var StyleConfig = Common.getStyle(this.props,{
      rotate:this.state.rotate,
      isAnimateView:isAnimateView
    });



    var fill = {};
    if(!this.props.colorful){
     fill = {fill:StyleConfig.color};
    }
   
    return (
      <Wrapper style={{...{justifyContent:"center",alignItems:"center"},...StyleConfig.wrapperStyle}}>
        <SvgUri
          style={StyleConfig.iconStyle}
          width={StyleConfig.iconStyle.width}
          height={StyleConfig.iconStyle.width}
          svgXmlData={this.props.icon}
          {...fill}
        />
        </Wrapper>
    );
  }
}

