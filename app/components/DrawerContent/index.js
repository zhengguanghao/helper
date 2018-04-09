import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    ScrollView,
    View,
    StatusBar
} from 'react-native';
import { DrawerItems } from 'react-navigation';
const DrawerContent = (props) => {
    return (
        <ScrollView>
            <StatusBar hidden={false}
                backgroundColor="#900"
                barStyle="light-content"
            />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcome}>欢迎</Text>
                    {/* <Text >{JSON.stringify(props)}</Text> */}
                </View>
                <DrawerItems {...props} />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 200,
        width: '100%'
    },
    welcome: {
        fontSize: 20,
        height: 80,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});

export default DrawerContent;