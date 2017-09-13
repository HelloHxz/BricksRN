import { StackNavigator,NavigationActions } from 'react-navigation';
import React from 'react'

export default (config)=>{
	var pages = {};
	for(var key in config.pages){
		var pageClass = config.pages[key];
		pages[key] = {screen:pageClass};
		if(pageClass.__role!=='pageview'){
			console.error("页面"+key+"没有使用@PageView装饰器进行声明装饰");
		}
		pageClass.__pagename = key;
	}
	var AppNavigator = StackNavigator(pages);

	const defaultGetStateForAction = AppNavigator.router.getStateForAction;

	AppNavigator.router.getStateForAction = (action, state) => {
	  // if (
	  //   state &&
	  //   action.type === NavigationActions.BACK &&
	  //   state.routes[state.index].params.isEditing
	  // ) {
	  //   // Returning null from getStateForAction means that the action
	  //   // has been handled/blocked, but there is not a new state
	  //   return null;
	  // }
	  var Re = defaultGetStateForAction(action, state);
	  // Re.routes[Re.routes.length-1].routeName = "chat";
	  return Re;
	};


	class App extends React.Component {

	  render() {
		return (
		  <AppNavigator 
			  ref={nav => { this.navigator = nav; }} />
			);
	   }
	}
	return App;
}