import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class HomePage extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <Text style={{ fontSize: 20, justifyContent: 'center', marginLeft: 100, color: '#ffffff' }}>首页</Text>,//设置标题内容
        headerLeft: <Text style={{ marginLeft: 20 }} onPress={() => navigation.state.params.navigate()}><Icon name="navicon" size={20} color="#fff" /></Text>,
        headerRight: <Text style={{ marginRight: 20 }} onPress={() => navigation.state.params.navigate()}><Icon name="ellipsis-h" size={20} color="#fff" /></Text>,
    })

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //在static中使用this方法
        this.props.navigation.setParams({ navigate: () => this.props.navigation.navigate('DrawerOpen') })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar hidden={false}
                    backgroundColor="#900"
                    barStyle="light-content"
                />
                {/* <Text style={{ padding: 10 }}>{JSON.stringify(this.props.navigation)}</Text>
                <Icon name="map-o" size={30} color="#900" />
                <Button
                    onPress={() => navigate('Chat', { user: 'Sybil' })}
                    title="点击跳转" /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    }
});

export default HomePage;