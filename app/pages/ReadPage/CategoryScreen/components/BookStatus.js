import React, { Component } from 'react';
import { Text, View } from 'react-native';

class BookStatus extends Component {
    render() {
        const {styles } = this.props;
        const { latelyFollower, retentionRatio,serializeWordCount } = this.props.BasicsData;
        return (
            <View style={styles.bookstatus}>
                <View style={styles.listitem}>
                    <Text style={styles.item}>追书人气</Text>
                    <Text>{latelyFollower}</Text>
                </View>
                <View style={styles.listitem}>
                    <Text style={styles.item}>读者留存率</Text>
                    <Text>{retentionRatio}%</Text>
                </View>
                <View style={styles.listitem}>
                    <Text style={styles.item}>日更新字数</Text>
                    <Text>{serializeWordCount}</Text>
                </View>
            </View>
        );
    }
}

export default BookStatus;