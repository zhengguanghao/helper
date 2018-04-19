import React, { Component } from 'react';

import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator
} from 'react-navigation';

// 自定义侧边导航栏
import DrawerContent from './components/DrawerContent';
//Home
import HomePage from './pages/HomePage/HomePage';
//Read
import CategoryScreen from './pages/ReadPage/CategoryScreen/CategoryScreen';
import CategoryDetailScreen from './pages/ReadPage/CategoryScreen/CategoryDetailScreen';
import BookDetailScreen from './pages/ReadPage/CategoryScreen/BookDetailScreen';
import RankingScreen from './pages/ReadPage/RankingScreen/RankingScreen';
import RankingDetailScreen from './pages/ReadPage/RankingScreen/RankingDetailScreen';
import SearchScreen from './pages/ReadPage/SearchScreen/SearchScreen';
import ReadScreen from './pages/ReadPage/ReadScreen/ReadScreen';
//Favorites
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

import Icon from 'react-native-vector-icons/FontAwesome';
//定义DrawerNavigator属性
const DrawerNavigatorOptions = {
    contentOptions: {
        //initialRouteName: 'CategoryDetail', // 默认页面组件
        activeTintColor: '#900',  // 选中文字颜色
        activeBackgroundColor: '#f5f5f5', // 选中背景颜色
        inactiveTintColor: '#000',  // 未选中文字颜色
        inactiveBackgroundColor: '#fff', // 未选中背景颜色
        style: {  // 样式
        }
    },
    contentComponent: props => <DrawerContent {...props} />
}

//定义StackNavigator属性
const StackNavigatorOptions = {
    headerMode: 'screen',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#900'
        },
        headerTitleStyle: {
            color: '#fff',
            fontSize: 20
        },
        headerTintColor: '#fff',
    },
}

const TabNavigatorOption = {
    lazy: true,
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'top', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#900', // 文字和图片选中颜色
        inactiveTintColor: '#000', // 文字和图片默认颜色
        showIcon: false, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            //height: 40,
            justifyContent: 'center',
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
    }
}

//ReadTab注册到 ReadStackNavigator
const ReadTab = TabNavigator({
    Hot: {
        screen: CategoryScreen,
        navigationOptions: {
            tabBarLabel: '追书'
        }
    },
    Category: {
        screen: CategoryScreen,
        navigationOptions: {
            tabBarLabel: '分类'
        }
    },
    Ranking: {
        screen: RankingScreen,
        navigationOptions: {
            tabBarLabel: '排行'
        }
    }
}, TabNavigatorOption);
//ReadDetailTab注册到 ReadStackNavigator
const ReadDetailTab = TabNavigator({
    Hot: {
        screen: CategoryDetailScreen,
        navigationOptions: {
            tabBarLabel: '热门'
        }
    },
    New: {
        screen: CategoryDetailScreen,
        navigationOptions: {
            tabBarLabel: '新书'
        }
    },
    Reputation: {
        screen: CategoryDetailScreen,
        navigationOptions: {
            tabBarLabel: '好评'
        }
    },
    Over: {
        screen: CategoryDetailScreen,
        navigationOptions: {
            tabBarLabel: '完结'
        }
    }
}, TabNavigatorOption);

//HomeStack
const HomeStackNavigator = StackNavigator({
    HomePage: { screen: HomePage }
}, StackNavigatorOptions);

//ReadStack
const ReadStackNavigator = StackNavigator({
    ReadPage: { screen: ReadTab },
    CategoryDetail: { screen: ReadDetailTab },
    BookDetail: { screen: BookDetailScreen },
    Ranking: { screen: RankingScreen },
    RankingDetail: { screen: RankingDetailScreen },
    Search: { screen: SearchScreen },
    Read: { screen: ReadScreen}
}, StackNavigatorOptions);

//各页面的Stack注册到Drawer
const MyDrawerNavigator = DrawerNavigator({
    Home: {
        screen: HomeStackNavigator,
        navigationOptions: {
            drawerLabel: '首页',
            drawerIcon: ({ tintColor }) => (
                <Icon name="home" size={20} color="#900" />
            )
        }
    },
    Read: {
        screen: ReadStackNavigator,
        navigationOptions: {
            drawerLabel: '追书',
            drawerIcon: ({ tintColor }) => (
                <Icon name="book" size={20} color="#900" />
            )
        }
    },
    FavoritesPage: {
        screen: FavoritesPage,
        navigationOptions: {
            drawerLabel: '收藏',
            drawerIcon: ({ tintColor }) => (
                <Icon name="folder" size={20} color="#900" />
            )
        }
    }
}, DrawerNavigatorOptions);

//最终渲染到页面Stack
const AppNavigator = StackNavigator({
    Drawer: { screen: MyDrawerNavigator },
}, {
        headerMode: 'none'
    });

export default AppNavigator;