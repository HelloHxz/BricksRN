import {View,Text,React,Button,Theme,StyleSheet,Header,TouchableOpacity,Icon,PageView,PageContainer} from "react-bricks"

@PageView
class MessagePage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
          <Header style={StyleSheet.create({justifyContent:"space-between"})}>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",marginLeft:10,justifyContent:"center",alignItems:"center"})}><
              Icon  icon={Icon.DemoIcons.profile}/></TouchableOpacity>
            <Text>消息</Text>
            <TouchableOpacity 
              style={StyleSheet.create({width:60,height:"100%",marginRight:10,justifyContent:"center",alignItems:"center"})}>
              <Icon  icon={Icon.DemoIcons.saoyisao}/></TouchableOpacity>
        </Header>
      </View>
    );
  }
}

export default MessagePage;

