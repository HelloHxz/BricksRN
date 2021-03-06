import {View,Text,React,StyleSheet,PageView,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Grid,Space} from "react-bricks"




@PageView
export default class GridDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }


  goBack(){
    this.props.navigation.goBack();
  }

  renderItem(params){
    return [<Icon key='1' colorful={true} style={StyleSheet.create({fontSize:89})} icon={Icon.DemoIcons.cookie_colorful}/>,<Text key='2'>{params.index}</Text>]
  }

  render() {
    return (
       <View style={{flex:1,backgroundColor:"#f2f3f4"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={Icon.DemoIcons.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={{flex:1}}>
        <Space/>
          <Grid data={[{},{},{},{},{},{},{},{},{},{},{}]} column={4} renderItem={this.renderItem.bind(this)}/>
          <Space/>

          <Grid bordernone={true} data={[{},{},{},{},{}]} 
          style={ StyleSheet.create({width:600}) }
          column={3} renderItem={this.renderItem.bind(this)}/>

            <Space/>
          <Grid bordernone={true} data={[{},{},{}]} 
          style={ StyleSheet.create({width:500}) }
          itemStyle = {StyleSheet.create({paddingTop:20,paddingBottom:20,height:"auto"})}
          column={2} renderItem={this.renderItem.bind(this)}/>
        </ScrollView>
      </View>
    );
  }
}

