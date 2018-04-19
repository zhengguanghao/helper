import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ScrollView,
    TextInput,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { WhiteSpace, WingBlank, Tag } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { getHotwords, getAutoComplete, getFuzzySearch,getBookDetail } from '../../../actions/read';
import BookList from '../components/BookList';
import isArray from '../../../utils/isArray';
import isEmpty from '../../../utils/isEmpty';

import Icon from 'react-native-vector-icons/FontAwesome';
import { staticPath } from '../../../utils/staticConfig';
// import { getLocalStroageData, setLocalStroageData } from '../../../utils/stroage';
@connect(
    state => ({ ...state.read }),
    dispatch => bindActionCreators({ getHotwords, getAutoComplete, getFuzzySearch,getBookDetail }, dispatch)
)

class SearchScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <TextInput
            clearButtonMode={'while-editing'}
            placeholder="想要搜索些什么呢!"
            underlineColorAndroid='transparent'
            style={styles.searchInput}
            onChangeText={(text) => navigation.state.params.onChangeText(text)}
            //onKeyPress={(event) => { navigation.state.params.fuzzySearch(event.nativeEvent.key) }}
            //value={this.state.text}
            onSubmitEditing={(event) => navigation.state.params.onSubmitEditing(event.nativeEvent.text)}
        />
    })

    constructor(props) {
        super(props);
        this.state = {
            out_hotwords: [],
            showAutoComplete: false,
            animating: true
        }
    }

    componentDidMount() {
        //在static中使用this方法
        this.props.navigation.setParams({
            onChangeText: (text) => this.props.getAutoComplete(text).then(() => {
                this.setState({ showAutoComplete: true })
            }),
            onSubmitEditing: (text) => this.getFuzzySearch(text)
        });
    }

    getFuzzySearch(text){
        this.props.getFuzzySearch(text).then(() => {
            this.setState({ showAutoComplete: false, animating: false})
        })
    }


    itemRow(item) {
        return (
            <TouchableOpacity onPress={() => this._onPress(item)}>
                <View style={styles.auto_complete_view}>
                    <Text style={styles.auto_complete_text} >{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _onPress(item){
        this.getFuzzySearch(item)
    }

    onPressTopicItem(id){
        this.props.getBookDetail(id).then(()=>{
            const { book_detail } = this.props;
            this.props.navigation.navigate('BookDetail');
        })
    }

    render() {
        const { showAutoComplete, searchHistory } = this.state;
        const { auto_complete, fuzzy_search } = this.props;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <WingBlank style={styles.wrapper}>
                    {/* <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    /> */}
                    {/* <Text>{JSON.stringify(searchHistory)}</Text> */}
                    {
                        showAutoComplete &&
                        <FlatList
                            data={auto_complete}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => this.itemRow(item)}
                        />
                    }
                    {/* {
                        showAutoComplete && searchHistory.length > 0 &&
                        <FlatList
                            data={searchHistory}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => this.itemRow(item)}
                        />
                    } */}
                    {/* <View style={styles.tag_container}>
                        {
                            out_hotwords.map(el => {
                                return <Tag style={styles.tag} key={el}>{el}</Tag>
                            })
                        }
                    </View> */}
                    {
                        !isEmpty(fuzzy_search) && !showAutoComplete &&
                        fuzzy_search.map((v, i) => {
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
                                <View key={i}>
                                    <BookList
                                        BasicsData={BasicsData}
                                        onPressTopicItem={() => { this.onPressTopicItem(v._id); }}
                                    />
                                    <WhiteSpace size={'xs'} />
                                </View>
                            );
                        })
                    }
                </WingBlank >
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        minHeight: '100%',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    tag_container: {
        flex: 1,
        paddingTop: 9,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        marginRight: 5,
        marginBottom: 5
    },
    searchInput: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 0
    },
    auto_complete_view: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row'
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

export default SearchScreen;