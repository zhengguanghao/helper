import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';

class FavoritesPage extends React.Component {

    static navigationOptions = ({navigation})=>({
        headerTitle: '收藏夹',//设置标题内容
    })

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ padding: 10 }}>收藏夹页面</Text>
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

export default FavoritesPage;