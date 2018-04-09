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
import { getCategoryDetail, getNovelListByCat,getBookDetail } from '../../../actions/read';
import isEmpty from '../../../utils/isEmpty'
import BookList from '../../../components/BookList';

import { staticPath } from '../../../utils/staticConfig';

@connect(
    state => ({ ...state.read }),
    dispatch => bindActionCreators({ getCategoryDetail, getNovelListByCat,getBookDetail }, dispatch)
)
class CategoryDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '书籍列表',//设置标题内容
    })

    constructor(props) {
        super(props);
        this.state = {
            detail_list: [],
            isRefreshing: false,
            animating:true
        };
        // const {navigation} = props;
        // const {gender,major} = navigation.state.params;
        // const type = navigation.state.key.toLocaleLowerCase();
        // // alert(JSON.stringify(props.navigation))
        // this.getNovelListByCat(gender,type,major);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const gender = navigation.state.params.gender;
        const major = navigation.state.params.name;
        const type = navigation.state.key.toLocaleLowerCase();
        // this.getNovelListByCat(gender, type, major)
        // if (isEmpty(cats_detail)) {
        //     Toast.loading('Loading...');
        // this.props.getCategoryDetail().then(() => {
        //     let data = [];
        //     const { cats_detail } = this.props;
        //     // alert(JSON.stringify(cats_detail))
        //     cats_detail[gender].map(el => {
        //         if (el.major === major) {
        //             data = el.mins;
        //         }
        //     });
        //     data.splice(0, 0, '全部');
        //     data.length > 0 &&
        this.getNovelListByCat(gender, type, major)
        // })
    }

    getNovelListByCat(gender, type, major) {
       return this.props.getNovelListByCat(gender, type, major).then(() => {
            const { listByCat } = this.props;
            this.setState({ detail_list: listByCat,animating:false });
        });
    }

    onPressTopicItem(id){
        this.props.getBookDetail(id).then(()=>{
            const { book_detail } = this.props;
            this.props.navigation.navigate('BookDetail');
        })
    }

    _onRefresh(event) {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            // prepend 10 items
            const { navigation } = this.props;
            const gender = navigation.state.params.gender;
            const major = navigation.state.params.name;
            const type = navigation.state.key.toLocaleLowerCase();
            this.getNovelListByCat(gender, type, major).then(()=>{
                this.setState({
                    isRefreshing: false
                });
            })

        }, 5000);
    }

    render() {
        const {isRefreshing, detail_list } = this.state;
        if (detail_list.length > 0) {
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
                    {
                        detail_list.map((v, i) => {
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


export default CategoryDetailScreen;