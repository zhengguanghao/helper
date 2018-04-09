import React from 'react';
import { Text, StyleSheet, ScrollView, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Grid, WhiteSpace, WingBlank, Toast, SegmentedControl } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { getCategory } from '../../../actions/read';
import isEmpty from '../../../utils/isEmpty'

import Icon from 'react-native-vector-icons/FontAwesome';

@connect(
    state => ({ ...state.read }),
    dispatch => bindActionCreators({ getCategory }, dispatch)
)

class CategoryScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '追书神器',
        headerRight:
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <View style={{ marginRight: 20 }}><Icon name="search" size={20} color="#fff" /></View>
            </TouchableOpacity>

    })

    constructor(props) {
        super(props);
        this.state = {
            animating: true,
            type: '男生'
        }
    }

    componentDidMount() {
        //在static中使用this方法
        // this.props.navigation.setParams({ navigate: () => this.props.navigation.navigate('Search') });
        const { cats } = this.props;
        if (isEmpty(cats)) {
            this.props.getCategory().then(() => {
                this.setState({ animating: false });
            })
        }
    }

    onValueChange(value) {
        this.setState({ type: value })
    }

    linkDetail(name, type) {
        this.props.navigation.navigate('CategoryDetail', { name: name, gender: type });
    }

    render() {
        const { cats } = this.props;
        const { type } = this.state;
        let type_en = '';
        if (type === '男生') { type_en = 'male' } else if (type === '女生') { type_en = 'female' } else { type_en = 'press' };
        if (!isEmpty(cats)) {
            return (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <WingBlank style={styles.wrapper}>
                        <SegmentedControl tintColor="#900" values={['男生', '女生', '出版']} onValueChange={(el) => this.onValueChange(el)} />
                    </WingBlank>
                    <WhiteSpace />
                    <WingBlank style={styles.wrapper}>
                        <Grid
                            data={cats[type_en]}
                            columnNum={3}
                            // onClick={(el, index) => { this.linkDetail(el, type_en); }}
                            renderItem={dataItem => (
                                <View style={styles.category}>
                                    <TouchableOpacity onPress={() => this.linkDetail(dataItem.name, type_en)}>
                                        <Text style={styles.categoryName}>{dataItem.name}</Text>
                                        <Text style={styles.bookCount}>{dataItem.bookCount}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </WingBlank >
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
        //paddingTop:10,
        //paddingRight:5,
        //paddingBottom:10,
        //paddingLeft:5
    },
    category: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryName: {
        alignSelf: 'center'
    },
    bookCount:{
        alignSelf: 'center'
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
    }
});

export default CategoryScreen;