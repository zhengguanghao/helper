import React, { Component } from 'react';
import {
    Text, StyleSheet,
    ScrollView,
    View
} from 'react-native';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { WingBlank } from 'antd-mobile';

// import util from '../..//utils/util';
import styles from './components/BookStyle';
import DetailTop from './components/DetailTop';
import BookStatus from './components/BookStatus';
import BookTag from './components/BookTag';


@connect(
    state => ({ ...state.read }),
    dispatch => bindActionCreators({}, dispatch)
)

class BookDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '书籍详情',//设置标题内容
    })

    constructor(props) {
        super(props);
    }

    onRead(){
        const {navigation,book_detail} = this.props;
        // alert(book_detail._id)
        navigation.navigate('Read',{_id:book_detail._id});
        // alert(JSON.stringify(this.props.book_detail))
    }


    render() {
        const { book_detail } = this.props;
            return (
                <ScrollView contentContainerStyle={styless.contentContainer}>
                    <WingBlank style={styles.wrapper}>
                        {/* <Text style={styles.headerTitle}>{JSON.stringify(moment(updated).fromNow())}</Text> */}
                        <DetailTop
                            styles={styles}
                            //staticPath = {util.staticPath}
                            onRead={this.onRead.bind(this)}
                            BasicsData={book_detail}
                        />
                        <BookStatus
                            styles={styles}
                            BasicsData={book_detail}
                        />
                        {
                            book_detail.tags.lenght &&
                            <BookTag
                                styles={styles}
                                BasicsData={book_detail}
                            />
                        }
                        <Text style={[{ color: '#333333', marginTop: 10, lineHeight: 20 }]}>{book_detail.longIntro}</Text>
                    </WingBlank>
                </ScrollView>
            );
    }
}

const styless = StyleSheet.create({
    contentContainer: {
        minHeight: '100%',
        paddingVertical: 10,
        backgroundColor: '#fff'
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
        backgroundColor: '#fff',
    },
    centering: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 8
    }
});


export default BookDetailScreen;