import { StackNavigator,NavigationActions } from 'react-navigation';
import React from 'react';
import StyleSheet from '../style';
import Common from './common'



function isTabRouteChange(pageArr,state){
	var curRoute = state.routes[state.routes.length-1];
	return pageArr[0]===curRoute.routeName&&curRoute.params&&curRoute.params.__childpage;
}


let preTime =null;

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
	global.__bricks__ = {
		config:config,
		pageDict:{}
	};

	var initialRouteParams = {};
	if(!config.root){
		console.error("未设置启动页root配置");
	}
	var rootArr = config.root.split("/");
	if(rootArr.length===2){
		initialRouteParams.__childpage = rootArr[1];
	}
	var AppNavigator = StackNavigator(pages,{
		initialRouteName:rootArr[0],
		initialRouteParams:initialRouteParams
	});

	const defaultGetStateForAction = AppNavigator.router.getStateForAction;

	var prePageName = "";

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

	  //global.__bricks__.pageDict

	  var pageConfig = null;
	

	  if(state&&state.routes.length>0){
	  	pageConfig = state.routes[state.routes.length-1];
		var pageWrapperInstance = global.__bricks__.pageDict[pageConfig.key];
		
		//如果有表示tabbar子页面
		var tabChildPageInstance = null;
		
		var childPageName = pageConfig.params.__childpage;
		if(childPageName){
			tabChildPageInstance =  global.__bricks__.pageDict[pageConfig.key+"_"+childPageName];
		}
		var s = true;
	    if(pageWrapperInstance&&pageWrapperInstance.onPageBeforeLeave){
	    	s = pageWrapperInstance.onPageBeforeLeave(
	    		{
	    			action:action.type === NavigationActions.BACK?"后退":"前进"
	    		});
		}
		if(tabChildPageInstance&&tabChildPageInstance.onPageBeforeLeave){
			var s1 = tabChildPageInstance.onPageBeforeLeave(
	    		{
	    			action:action.type === NavigationActions.BACK?"后退":"前进"
				});
			if(!s1){
				s = false;
			}
		}

		if(s===false){
			if(state && state.index == 0 && action.type==="Navigation/BACK"){
			   return {
				...state,
				index: state.routes.length - 1,
			  };
			}
			return null;
		}
	  }


	  //在第一页的时候会退阻止 用于关闭首页的poppage
	  // if(state && state.index == 0 && action.type==="Navigation/BACK"){
	  // 	 return {
			// ...state,
			// index: state.routes.length - 1,
		 //  };
	  // }

	  var params = action.params || {};
	  var pageName =  action.routeName||"";
	  var pageArr = pageName.split("/");

	  params.__pagename = pageArr[0];

	  var now = new Date().valueOf();
	  if(prePageName==pageName&&now-preTime<1000&&action.type!=="Navigation/INIT"&&preTime){
	  	//解决快速点击跳出两个页面
	  	return null;
	  }

	  if(action.type!=="Navigation/INIT"){
	 	 preTime = now;
	  }

	  if(action.type==="Navigation/NAVIGATE"){
		var len = pageArr.length;
		if(len>2){
			console.error("页面层级最多两层");
		}
		if(len===2){
			action.routeName = pageArr[0];
			params.__childpage = pageArr[1];
			action.params = params;
			var lastKey = state.routes[state.routes.length-1].key;
			var pageInstance = global.__bricks__.pageDict[lastKey];
			if(isTabRouteChange(pageArr,state)){
				//页面内部进行状态改变 改变PageContainer  global.__bricks__.pageDict
				if(pageInstance){
					pageInstance.tabChange(action.params);
				}
				state.routes[state.routes.length-1].params = params;
				//call tabbar resume
				return null;
			}else{
				if(pageInstance){
				}
			}
		}
	  }
	  action.params = params;

	  if(action.action==="__replace__"){
	  	const routes = state.routes.slice(0, state.routes.length - 1);
	      routes.push(action);
	      return {
	        ...state,
	        routes,
	        index: routes.length - 1,
	      };
	  }

	  prePageName = pageName;
	  var Re = defaultGetStateForAction(action, state);
	  //call goback resume
	  return Re;
	};

	/*
		todo global popPage 
	*/
	class App extends React.Component {

	constructor(props) {
		super(props);
		global.Toast = this;
		this.Dict = {};
		this.instanceDict = {};
		this.state={
			seed:1
		}
	}

	show(config){
		seedkey+=1;
		var key = "toast_"+seedkey;
		this.Dict[key] = <ToastItem ref={(instance)=>{
		  this.instanceDict[key] = instance;
		}} pkey={key} parent={this} config={config} key={key}/>
		this.setState({seed:1});
		return key;
	}

	hide(key){
		var instance = this.instanceDict[key];
		if(instance){
		  instance.hide();
		}
	}

	renderChild(){
		var children = [];
	    for(var key in this.Dict){
	      children.push(this.Dict[key]);
	    }
	    return children;
	}

	  render() {
		return (
			<View style={{flex:1}}>
				 <AppNavigator />
				  {this.renderChild()}
			  </View>
			);
	   }
	}




	return Common(<AppNavigator />,config);
}