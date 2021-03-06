'use strict';

import React from 'react'
import Platform from '../platform';
import TouchableNativeFeedback from '../touchablenativefeedback';
import View from '../view';
import Text from '../text';
import TouchableOpacity from '../touchableopacity';
import ActivityIndicator from '../activityindicator';
import PropTypes from 'prop-types';
import StyleSheet from '../style';
import Theme from '../theme'

class Button extends React.Component {
  
  _renderChildren() {
    let childElements = [];
    React.Children.forEach(this.props.children, (item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        const element = (
          <Text
            style={StyleSheet.create({...styles.textButton,...this.textStyle ,...this.props.textStyle})}
            allowFontScaling={this.props.allowFontScaling}
            key={item}>
            {item}
          </Text>
        );
        childElements.push(element);
      } else if (React.isValidElement(item)) {
        childElements.push(item);
      }
    });
    return (childElements);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!isEqual(nextProps, this.props)) {
  //     return true;
  //   }
  //   return false;
  // }

  _renderInnerText() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size='small'
          style={styles.spinner}
          color={this.props.activityIndicatorColor || 'black'}
        ></ActivityIndicator>
      );
    }
    return this._renderChildren();
  }

  onPress(e){
    if(this.props.onPress){
      this.props.onPress(e)
    }
  }


  render() {

    var type = this.props.type||"hollow";
    if(["primary","text","hollow","flat"].indexOf(type)<0){
      type = "hollow";
    }
    var size = this.props.size||"default";
    if(["default","lg","sm"].indexOf(size)<0){
      size = "default";
    }
    var sizeStyle = Object.assign({},Theme["btn_"+size]||Theme["btn_default"]);
    var typeStyle = Object.assign({},Theme["btn_"+type]||Theme["btn_primary"]);
    this.textStyle = {
      fontSize:sizeStyle.fontSize||24,
      color:typeStyle.color||"#fff"
    };
    delete sizeStyle.fontSize;
    delete typeStyle.color;

    var buttonStyle = {...StyleSheet.create({...styles.button,...sizeStyle,...typeStyle,}),...this.props.style};
    if(this.props.circle){
      buttonStyle.width = buttonStyle.height;
      if(StyleSheet.isWeb){
        buttonStyle.borderRadius ="100%";
      }else{
        buttonStyle.borderRadius =buttonStyle.width/2;
      }
    }
    if(this.props.disabled === true){
       return (
        <View 
          style={buttonStyle}>
          {this._renderInnerText()}
        </View>
      );
    }

    let touchableProps = {
      accessibilityLabel: this.props.accessibilityLabel,
      onPress: this.onPress.bind(this),
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress,
      delayLongPress: this.props.delayLongPress,
      delayPressIn: this.props.delayPressIn,
      delayPressOut: this.props.delayPressOut,
    };
    return (
      <TouchableOpacity {...touchableProps} activeOpacity={this.props.activeOpacity||.6}
        style={buttonStyle}>
        {this._renderInnerText()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
});

export default Button;