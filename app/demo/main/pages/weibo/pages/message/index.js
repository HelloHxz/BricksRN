import {View,Text,React,Button,Theme,StyleSheet,PageView,PageContainer} from "react-bricks"

@PageView
class MessagePage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
          <Text>Message</Text>
      </View>
    );
  }
}

export default MessagePage;
