const React = require('react-native');

const {
  StyleSheet
} = React;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingTip: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 12
  },
  topicListView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
    overflow: 'hidden'
  },
  topicCard: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom:10,
    backgroundColor: '#ffffff',
    // marginBottom: 1,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    //borderBottomRadius: 0
  },
  avatarImg: {
    width: 48,
    height: 58,
    borderRadius: 2
  },
  metainfo: {
    color: '#999999',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    marginRight: 5
  },
  avatar: {
    flex: 2,
    justifyContent: 'center'
  },
  titleMeta: {
    flex: 9,
    justifyContent: 'center'
  },
  replieCount: {
    fontSize: 12,
    lineHeight: 12,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  replieCountBg: {
    backgroundColor: '#e74c3c',
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 11
  },
  nodename: {
    color: '#999999',
    fontSize: 12,
    lineHeight: 16
  },
  metaarea: {
    flexDirection: 'row',
    // marginTop: 10,
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  metaareatag: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  topicTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '100',
    letterSpacing: 1,
    color: '#333333'
  }
});

module.exports = styles;