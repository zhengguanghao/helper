import React, { Component } from 'react';
import { Text, View, Image, Button,StatusBar,StyleSheet,Modal,FlatList,ScrollView,Alert,TouchableOpacity,ActivityIndicator} from 'react-native';
import { WhiteSpace } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { getChapter,getChapterContent,getSource } from '../../../actions/read';
import isEmpty from '../../../utils/isEmpty'
import { setSpText } from '../../../utils/adaptation'
import Icon from 'react-native-vector-icons/FontAwesome';

@connect(
    state => ({ ...state.read }),
    dispatch => bindActionCreators({getChapter,getChapterContent,getSource}, dispatch)
)

class ReadScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        // headerTitle: navigation.state.params.title,//设置标题内容
        headerRight: ([
            <Text key="book" style={{ marginRight: 20,color:'#fff' }} onPress={() => navigation.state.params.showSourceModal(true)}>源</Text>,
            <Text key="book" style={{ marginRight: 20 }} onPress={() => navigation.state.params.showChapter(true)}><Icon name="book" size={20} color="#fff" /></Text>,
            <Text key="cog" style={{ marginRight: 20 }} onPress={() => navigation.state.params.showCog()}><Icon name="cog" size={20} color="#fff" /></Text>
        ])
    })

    constructor(props) {
        super(props);
        this.state = {
            isShowChapter: false,
            animating: true,
            chapterModalVisible:false,
            sourceModalVisible:false,
            screenReaderEnabled:false,
            chapter_content:{},
            defauleSource:'',
            showFlip:false
        }
        this.currentChapter = 0,
        this.currentSource = {}
    }

    componentDidMount() {
        this.props.navigation.setParams({ 
            showSourceModal:this._showSourceModal.bind(this),
            showChapter:this._showChapterModal.bind(this),
            showCog:this._showCog.bind(this)
         });
         this.initRead();
    }

    initRead(){
        const {params} = this.props.navigation.state;
        this.props.getSource(params._id).then(()=>{
            const { source } = this.props;
            this.setState({defauleSource:source[0].source,animating:true});
            this.currentSource = {
                source:source[0].source,_id:source[0]._id
            }
            const sourceId = source[0]._id;
            this.props.getChapter(sourceId).then(()=>{
                const { chapters } = this.props;
                let lastChapter = this.currentChapter >= chapters.length - 1 ? chapters.length - 1 : this.currentChapter
                this.props.getChapterContent(chapters[lastChapter].link).then(()=>{
                    const {chapter_content } = this.props;
                    this.setState({chapter_content,animating:false})
                })
            })
        })
    }

    _showSourceModal(){
        this.setState({sourceModalVisible:!this.state.sourceModalVisible});
    }

    _showChapterModal(visible){
        this.setState({chapterModalVisible: !this.state.chapterModalVisible});
    }

    _showCog(){
        alert(2);
    }

    _renderChapterItem(item,index) {
        if(!item.isVip){
            return (
                <TouchableOpacity onPress={() => this.onChangeChapter(item,index)}>
                    <View >
                        <Text >{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    onChangeChapter(item,index){
        this.setState({animating:true});
        alert(index)
        this.currentChapter = index - 1;
        this.props.getChapterContent(item.link).then(()=>{
            const {chapter_content } = this.props;
            this.setState({chapter_content,animating:false})
        })
        this._showChapterModal();
    }

    _renderSourceItem(item){
        return (
            <TouchableOpacity onPress={() => this.onChangeSource(item)}>
                <View >
                    <Text >{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    onChangeSource(item){
        this.setState({defauleSource:item.source,animating:true});
        this.props.getChapter(item._id).then(()=>{
            const { chapters } = this.props;
            let lastChapter = this.currentChapter >= chapters.length - 1 ? chapters.length - 1 : this.currentChapter
            this.props.getChapterContent(chapters[lastChapter].link).then(()=>{
                const { chapter_content,error } = this.props;
                if(error && error.includes('500')){
                    this.initRead();
                    Alert.alert(
                        '提示',
                        '当前源暂不可用，将切回优质书源'
                      )
                }else{
                    this.setState({chapter_content,animating:false})
                }
            })
            this._showSourceModal();
        })
    }

    // _contentViewScroll(e){
    //     var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    //     var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    //     var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    //     if (offsetY + oriageScrollHeight >= contentSizeHeight){
    //         // alert('上传滑动到底部事件')
    //         this.setState({showFlip:true})
    //     }
    // }

    previousPage(){
        const { chapters } = this.props;
        if(this.currentChapter - 1 >= 1){
            this.setState({animating:true})
            this.props.getChapterContent(chapters[this.currentChapter - 1].link).then(()=>{
                const { chapter_content } = this.props;
                this.setState({chapter_content,animating:false})
                this.currentChapter = this.currentChapter - 1;
            });
        }else{
            Alert.alert(
                '提示',
                '已经是第一章了'
              )
        }
    }

    nextPage(){
        const { chapters } = this.props;
        if(this.currentChapter + 1 <= chapters.length - 1){
            if(chapters[this.currentChapter + 1].isVip === false){
                this.setState({animating:true})
                this.props.getChapterContent(chapters[this.currentChapter + 1].link).then(()=>{
                    const { chapter_content } = this.props;
                    this.setState({chapter_content,animating:false})
                    this.currentChapter = this.currentChapter + 1;
                });
            }else{
                Alert.alert(
                    '提示',
                    'vip章节,请换源'
                )
            }
        }else{
            Alert.alert(
                '提示',
                '已经是最后一章了'
            )
        }
    }

    componentWillUnmount(){
        // alert(1)
    }
    
    render() {
        const { chapter_content,defauleSource,animating,showFlip } = this.state;
        const { chapters,source} = this.props;
        if (!isEmpty(chapter_content) && !animating) {
        return (
            <ScrollView contentContainerStyle={styles.scrollview}
                // onMomentumScrollEnd = {this._contentViewScroll.bind(this)}
            >
                <View>
                    <View style={{padding: 10}}>
                        <Text >{chapter_content.title}</Text>
                        <WhiteSpace size={'lg'} />
                        <Text style={{fontSize: setSpText(10)}}>{defauleSource === 'zhuishuvip' ?  chapter_content.cpContent : chapter_content.body}</Text>
                    </View>
                    {/* <WhiteSpace size={'lg'} /> */}
                    <View style={{flexDirection: 'row',backgroundColor:'#900',height:setSpText(26)}}>
                            <TouchableOpacity style={ {flex:6,alignSelf:'center'}}
                             onPress={() => this.previousPage()}>
                                <Text style={{backgroundColor:'#900',color:'#fff',textAlign: 'center'}}>上一章</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={ {flex:6,alignSelf:'center'}} 
                            onPress={() => this.nextPage()}>
                                <Text style={{backgroundColor:'#900',color:'#fff',textAlign: 'center'}}>下一章</Text>
                            </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.sourceModalVisible}
                    onRequestClose={this._showSourceModal.bind(this)}
                >
                    <View style={{padding: 22}}>
                        <ScrollView 
                            contentContainerStyle={styles.scrollview}
                        >
                            <FlatList
                                data={source}
                                keyExtractor={(item,i) => i.toString()}
                                renderItem={({ item,index }) => this._renderSourceItem(item,index)}
                            />
                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.chapterModalVisible}
                    onRequestClose={this._showChapterModal.bind(this)}
                >
                    <View style={{padding: 22}}>
                        <ScrollView contentContainerStyle={styles.scrollview}>
                            <FlatList
                                data={chapters}
                                keyExtractor={(item,i) => i.toString()}
                                renderItem={({ item,index}) => this._renderChapterItem(item,index)}
                            />
                        </ScrollView>
                    </View>
                </Modal>
            </ScrollView>);
        }else{
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
    scrollview:{
        // padding:10,
        backgroundColor: '#ffffff',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#ffffff',
    }
  });

export default ReadScreen;