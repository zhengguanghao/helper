import React, { Component } from 'react';
import { TouchableOpacity,View,Image,Text } from 'react-native';
import styles from './BookStyle';

class Book extends Component {
    
    render () {
        const { title ,cover, shortIntro ,author,majorCate,latelyFollower,retentionRatio} = this.props.BasicsData;
        return (
            <TouchableOpacity onPress={this.props.onPressTopicItem} activeOpacity={0.8}>
                <View style={styles.topicCard}>
                    <View style={styles.avatar}>
                        <Image
                            style={styles.avatarImg}
                            source={{ uri: cover }}
                            resizeMode={'cover'}
                        />
                    </View>
                    <View style={styles.titleMeta}>
                        <Text style={[styles.metainfo,styles.topicTitle,styles.titleColor]}>{title}</Text>
                        <View style={styles.metaarea}>
                            <Text style={[styles.metainfo,{color:'#555555'}]}>{author}</Text>
                            <Text style={[styles.metainfo,{color:'#555555'}]}>{majorCate}</Text>
                        </View>
                        <View style={styles.metaarea}>
                             <Text style={[styles.metainfo,{color:'#555555'}]}  numberOfLines={1}>{shortIntro}</Text> 
                        </View>
                        <View style={[styles.metaareatag]}>
                            <Text style={styles.nodename}>{`${latelyFollower} 人在追`}</Text>
                            <Text style={styles.nodename}>丨</Text>
                            <Text style={styles.nodename}>{`${retentionRatio}% 读者留存`}</Text> 
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default Book;