import React, { Component } from 'react';
import { Text, View } from 'react-native';

class BookTag extends Component {
    md() {
        const arrs = ['burlywood', 'cadetblue', 'coral', 'cornflowerblue'];
        const tag = arrs[parseInt(Math.random() * arrs.length)];
        return tag;
    }

    render() {
        const { styles } = this.props;
        const { tags } = this.props.BasicsData;
        return (
            <View style={styles.booktag}>
                {
                    tags.map((v, i) => {
                        const str = this.md();
                        return (<Text key={i} style={[styles.tag, { backgroundColor: str }]}>{v}</Text>);
                    })
                }
            </View>
        );
    }
}

export default BookTag;