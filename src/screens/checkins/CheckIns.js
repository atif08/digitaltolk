import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    Animated,
    TouchableOpacity,
    TouchableHighlight,
    View,
    RefreshControl,
    ScrollView
} from 'react-native';
import { FAB } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import axios from '../../helper/axios';
import GetLocation from 'react-native-get-location';
import { useSelector } from 'react-redux';
import { RequestLoader } from '../../components/ui/loader/RequestLoader';

export default function Actions({ navigation }) {
    const [listData, setListData] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const user = useSelector(state => state.auth);
    updateListRequest =()=>{
        setRefreshing(true);
        // axios.defaults.headers.common.Authorization = 'Bearer 108|PIwAb8S4Mj4zAjZIn0ynPPWSRFU8JynAIZOBjbg8';
        axios.defaults.headers.common.Authorization = 'Bearer ' +user.token;
        axios.get('locations')
        .then((response) => {
            setListData(response.data.locations
                .map((item, i) => ({
                    key: item.id,
                    text: item.location,
                    location: item.location,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    initialLeftActionState: i % 2 !== 0
                })));
                setRefreshing(false)
        }).catch((err) => {
            alert('Server Error ' + err);
        }).finally(e=>setRefreshing(false));
    }

    useEffect(() => {
        let isMounted = true;
         updateListRequest();
        return () => { isMounted = false }; 
    }, []);


    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
        // Call delete task api
        axios.delete('locations/' + rowKey)
            .then((response) => {
            })
            .catch((err) => {
                alert('Server Error ' + err);
                this.isLoader();
            });

    };

    const insertLocation = () => {
        setRefreshing(true);
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.latitude + ',' + location.longitude + '&key=AIzaSyDLTspp612BPk6P668hOjZEIAvWgKvNZNg')
                .then((response) => response.json())
                .then((responseJson) => {
                    axios.post('locations', {
                        latitude:location.latitude,
                        longitude:location.longitude,
                        location:responseJson.results[0].formatted_address
                    })
                    .then((response) => {
                        updateListRequest();
                    })
                    .catch((err) => {
                        alert('Server Error ' + err);
                    }).finally(e=>setRefreshing(false));
                })
        }).catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });
    };

    const VisibleItem = props => {
        const {
            rowHeightAnimatedValue,
            rightActionState,
            leftActionState,
            data,
            removeRow,
        } = props;

        if (rightActionState) {
            Animated.timing(rowHeightAnimatedValue, {
                toValue: 0,
                duration: 200,
            }).start(() => {
                removeRow();
            });
        }
        return (
            <Animated.View
                style={[
                    styles.rowFront,
                    { height: rowHeightAnimatedValue },
                    leftActionState && { backgroundColor: 'lightgreen' },
                ]}>

                <TouchableHighlight
                    style={[
                        styles.rowFront,
                        leftActionState && {
                            backgroundColor: 'lightgreen',
                        },
                    ]}
                    underlayColor={'#AAA'}>
                    <View>
                        <Text>{data.item.text} </Text>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        );
    };

    const renderItem = (data, rowMap) => {
        const rowHeightAnimatedValue = new Animated.Value(50);
        return (
            <VisibleItem
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                data={data}
                removeRow={() => deleteRow(rowMap, data.item.key)}
            />
        );
    };

    const HiddenItemWithActions = props => {
        const {
            data,
            leftActionActivated,
            rightActionActivated,
            swipeAnimatedValue,
            rowActionAnimatedValue,
            rowHeightAnimatedValue,
            onClose,
            onDelete,
        } = props;

        if (rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 500,
            }).start();
        } else {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 75,
            }).start();
        }
        return (
            <Animated.View
                style={[
                    styles.rowBack,
                    { height: rowHeightAnimatedValue },
                    leftActionActivated && { backgroundColor: 'lightgreen' },
                ]}>

                <TouchableOpacity onPress={() => navigation.navigate('AddTaskScreen', props.data.item)}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                {!leftActionActivated && (
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={onClose}
                    >
                        <Text style={styles.backTextWhite}>Close</Text>
                    </TouchableOpacity>
                )}
                {!leftActionActivated && (
                    <Animated.View
                        style={[
                            styles.backRightBtn,
                            styles.backRightBtnRight,
                            { flex: 1, width: rowActionAnimatedValue },
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                styles.backRightBtn,
                                styles.backRightBtnRight,
                            ]}
                            onPress={onDelete}
                        >
                            <Animated.View
                                style={[
                                    styles.trash,
                                    {
                                        transform: [
                                            {
                                                scale: swipeAnimatedValue.interpolate(
                                                    {
                                                        inputRange: [-90, -45],
                                                        outputRange: [1, 0],
                                                        extrapolate: 'clamp',
                                                    }
                                                ),
                                            },
                                        ],
                                    },
                                ]}
                            >
                                <Image
                                    source={require('./images/trash.png')}
                                    style={styles.trash}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </Animated.View>
        );
    };
    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(50);
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        );
    };

    return (
        <>
        {/* <RequestLoader visible={refreshing} /> */}
            <ScrollView style={styles.container}  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={updateListRequest}
          />
        }>
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    leftActivationValue={100}
                    rightActivationValue={-200}
                    leftActionValue={0}
                    rightActionValue={-500}
                />
            </ScrollView>
            <FAB
                visible={true}
                onPress={() => insertLocation(navigation)}
                icon={{ name: 'add', color: 'white' }}
                placement="right"
                color="#3675b9"
            />
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
        width: '100%',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    },
});
