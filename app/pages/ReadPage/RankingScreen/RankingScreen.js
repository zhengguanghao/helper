import React from 'react';
import { Text, StyleSheet, ScrollView, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { Grid, WhiteSpace, WingBlank, Toast, SegmentedControl } from 'antd-mobile';
import { TabNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { getRanking } from '../../../actions/read';
import isEmpty from '../../../utils/isEmpty'
import { staticPath } from '../../../utils/staticConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

@connect(
    state => ({ ...state.read }),
    dispatch => bindActionCreators({ getRanking }, dispatch)
)

class RankingScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '追书神器',
    })

    constructor(props) {
        super(props);
        this.state = {
            animating: true,
            gender: '男生',
            show_ohterRanking: false
        }
    }

    componentDidMount() {
        const { ranking } = this.props;
        if (isEmpty(ranking)) {
            this.props.getRanking().then(() => {
                this.setState({ animating: false });
            })
        }
    }

    _onPress(item) {
        this.props.navigation.navigate('RankingDetail', { id: item._id, title: item.title });
    }
    onValueChange(value) {
        this.setState({ gender: value })
    }

    itemRow(item) {
        if (!item.collapse) {
            return (
                <TouchableOpacity onPress={() => this._onPress(item)}>
                    <View style={styles.item} >
                        <View style={styles.itemImg}>
                            <Image
                                style={styles.img}
                                source={{ uri: `${staticPath}${item.cover}` }}
                            />
                        </View>
                        <View style={styles.titleMeta}>
                            <Text style={styles.title} >{item.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    _onPressShow() {
        this.setState({
            show_ohterRanking: !this.state.show_ohterRanking
        })
    }

    render() {
        const { ranking } = this.props;
        const { gender, show_ohterRanking } = this.state;
        let icon = !show_ohterRanking ? 'chevron-down' : 'chevron-up'
        let gender_en = '';
        if (gender === '男生') { gender_en = 'male' } else { gender_en = 'female' };
        if (!isEmpty(ranking)) {
            let ohterRanking = [];
            ranking[gender_en].map(el => {
                if (el.collapse) {
                    ohterRanking.push({
                        _id: el._id,
                        title: el.title
                    })
                }
            })
            return (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <WingBlank style={styles.wrapper}>
                        <SegmentedControl tintColor="#900" values={['男生', '女生']} onValueChange={(el) => this.onValueChange(el)} />
                    </WingBlank>
                    <WingBlank style={styles.wrapper}>
                        <WhiteSpace />
                        <FlatList
                            data={ranking[gender_en]}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => this.itemRow(item)}
                        />
                        <TouchableOpacity onPress={() => this._onPressShow()}>
                            <View style={styles.item} >
                                <View style={styles.itemImg}>
                                    <Icon name={icon} size={28} color="#FF9900" />
                                </View>
                                <View style={styles.titleMeta}>
                                    <Text style={styles.title} >别人家的排行榜</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {
                            show_ohterRanking &&
                            <FlatList
                                data={ohterRanking}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => this.itemRow(item)}
                            />
                        }
                    </WingBlank >
                    <WhiteSpace />
                </ScrollView>
            )
        } else {
            return (
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[styles.centering, { transform: [{ scale: 1.5 }] }]}
                        size="small"
                        color="#900"
                    />
                </View>);
        }
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        minHeight: '100%',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    wrapper: {
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        // marginBottom: 10,
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    img: {
        width: 28,
        height: 28
    },
    itemImg: {
        flex: 2,
        justifyContent: 'center'
    },
    titleMeta: {
        flex: 9,
        justifyContent: 'center'
    }
});

export default RankingScreen;