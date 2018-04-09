import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    // TouchableHighlight,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    ToastAndroid
} from 'react-native';
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { getRankingDetail, getBookDetail } from '../../../actions/read';
import isEmpty from '../../../utils/isEmpty'
import BookList from '../../../components/BookList';

import { staticPath } from '../../../utils/staticConfig';

@connect(
    state => ({ ...state.read }),
    dispatch => bindActionCreators({ getRankingDetail, getBookDetail }, dispatch)
)
class RankingDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,//设置标题内容
    })

    constructor(props) {
        super(props);
        this.state = {
            ranking_detail: [],
            isRefreshing: false,
            animating: true
        };
        // const {navigation} = props;
        // const {gender,major} = navigation.state.params;
        // const type = navigation.state.key.toLocaleLowerCase();
        // // alert(JSON.stringify(props.navigation))
        // this.getNovelListByCat(gender,type,major);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.state.params.id;
        this.getRankingDetail(id).then(() => {
            const { ranking_detail } = this.props;
            this.setState({ ranking_detail })
        })
    }

    getRankingDetail(id) {
        return this.props.getRankingDetail(id);
    }

    onPressTopicItem(id) {
        this.props.getBookDetail(id).then(() => {
            this.props.navigation.navigate('BookDetail');
        })
    }

    _onRefresh(event) {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            // prepend 10 items
            const { navigation } = this.props;
            const id = navigation.state.params.id;
            this.getRankingDetail(id).then(() => {
                const { ranking_detail } = this.props;
                this.setState({ ranking_detail, isRefreshing: false })
            })
        }, 5000);
    }

    render() {
        const { isRefreshing, ranking_detail } = this.state;
        if (!isEmpty(ranking_detail)) {
            return (
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    scrollEventThrottle={50}
                >
                    {/* <Text style={styles.categoryType}>{JSON.stringify(ranking_detail)}</Text> */}
                    {
                        ranking_detail.books.map((v, i) => {
                            let BasicsData = {
                                title: v.title,
                                cover: staticPath + v.cover,
                                //lastChapter:v.lastChapter,
                                shortIntro: v.shortIntro,
                                author: v.author,
                                majorCate: v.majorCate,
                                latelyFollower: v.latelyFollower,
                                retentionRatio: v.retentionRatio
                            };
                            return (
                                <WingBlank key={i} style={styles.wrapper}>
                                    <BookList
                                        BasicsData={BasicsData}
                                        onPressTopicItem={() => { this.onPressTopicItem(v._id); }}
                                    />
                                    <WhiteSpace size={'xs'} />
                                </WingBlank >
                            );
                        })
                    }
                </ScrollView>
            );
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
        backgroundColor: '#ffffff',
    },
    headerTitle: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
});


export default RankingDetailScreen;