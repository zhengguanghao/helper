import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import moment from 'moment';
import { staticPath, dateDiff } from '../../../../utils/staticConfig';

class DetailTop extends Component {
    
    render() {
        const { styles,onRead } = this.props;
        const { title, cover, cat, wordCount, author, updated } = this.props.BasicsData;
        const time = moment(updated).format('X') * 1000;
        return (
            <View style={styles.topicCard}>
                <View style={styles.avatar}>
                    <Image
                        style={styles.avatarImg}
                        source={{ uri: staticPath + cover }}
                        resizeMode={'cover'}
                    />
                </View>
                <View style={styles.titleMeta}>
                    <Text style={[styles.metainfo, styles.topicTitle, styles.titleColor]}>{title}</Text>
                    <View style={styles.metaarea}>
                        <Text style={[styles.metainfo, { color: '#b34d24' }]}>{author}</Text>
                        <Text style={styles.nodename}>丨</Text>
                        <Text style={[styles.metainfo, { color: '#555555' }]}>{cat}</Text>
                        <Text style={styles.nodename}>丨</Text>
                        <Text style={[styles.metainfo, { color: '#555555' }]}>{`${parseInt(wordCount / 10000, 10)}万字`}</Text>
                    </View>
                    <View style={[styles.metaareatag]}>
                        <Text style={styles.nodename}>{dateDiff(time)}更新</Text>
                    </View>
                </View>
                <View style={styles.readInput}>
                    <Button
                        onPress={onRead}
                        title="开始阅读"
                        color="#900"
                    />
                </View>
            </View>
        );
    }
}

export default DetailTop;