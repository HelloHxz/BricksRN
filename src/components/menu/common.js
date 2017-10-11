import React from 'react';
import View from '../view';
import TouchableHightlight from '../touchablehighlight'
import Text from '../text';
import StyleSheet from '../style';
import Theme from '../theme';

class Menu extends React.Component{
	render(){
		var child = [];
		for(var i=0,j=this.props.children.length;i<j;i++){
			var item = this.props.children[i];
			var nextItem = null;
			if(i+1<j){
				nextItem = this.props.children[i+1];
			}
			var type = item.type;
			if(type===MenuItem){
				child.push(item);
				if(nextItem&&nextItem.type===MenuItem){
					child.push(<Line key={i}/>);
				}
			}else if(type===MenuSpace){
				child.push(item);
			}
		}
		return <View style={{borderTopWidth:1,borderLeftWidth:0,borderRightWidth:0,borderBottomWidth:1,borderColor:"#bbb",borderStyle:"solid"}}>{child}</View>
	}
}

class MenuItem extends React.Component{
	static _menurole = "item";
	render(){
		return <TouchableHightlight
			style={{...StyleSheet.create({
				height:Theme.menu_item_height,
				backgroundColor:"#fff"
			}),...this.props.style||{}}}
		><Text>Menu</Text></TouchableHightlight>
	}
}

class MenuSpace extends React.Component{
	render(){
		return <View style={StyleSheet.create({height:30,borderTopWidth:1,borderLeftWidth:0,borderRightWidth:0,borderBottomWidth:1,borderColor:"#aaa",borderStyle:"solid",backgroundColor:"#f2f3f4"})}></View>
	}
}

class Line extends React.Component{
	render(){
		return <View style={StyleSheet.create({height:1,marginLeft:30,backgroundColor:"#aaa"})}></View>
	}
}

Menu.Item = MenuItem;
Menu.Space = MenuSpace;

export default Menu;