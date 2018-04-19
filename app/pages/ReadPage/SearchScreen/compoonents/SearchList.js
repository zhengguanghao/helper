
import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import BookList from '../../components/BookList';
import { staticPath } from '../../../../utils/staticConfig';
class SearchList extends Component {
    render() {
        const { fuzzy_search } = this.props;
        return (
            <View>
                {
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
                            <WingBlank key={i} style={styles.wrapper}>
                                <BookList
                                    BasicsData={BasicsData}
                                //onPressTopicItem={() => { this.onPressTopicItem(v._id); }}
                                />
                                <WhiteSpace size={'xs'} />
                            </WingBlank >
                        );
                    })
                }
            </View>
        );
    }
}

export default SearchList;