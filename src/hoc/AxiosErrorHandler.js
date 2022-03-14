import React, {Component} from 'react';
import {Toast} from 'native-base';
// import {isConnectivity} from '../helper/CheckConnectivity';
import NetInfo from '@react-native-community/netinfo';
import {authLogout} from '../store/actions/auth';
import {connect} from 'react-redux';

// Subscribe
// const unsubscribe = NetInfo.addEventListener(state => {
//   console.warn("Connection type", state.type);
//   console.warn("Is connected?", state.isConnected);
// });

const AxiosErrorHandler = (WrappedComponent, axios) => {
    class Error extends Component {
        state = {
            error: null,
            errors:[],
            networkState: false,
        };

        UNSAFE_componentWillMount() {
            const unsubscribe = NetInfo.addEventListener(state => {
                if (!state.isConnected) {
                    Toast.show({
                        text: 'Check your internet connection',
                        // type: "warning",
                        duration: 30000 * 30000,
                        style: {backgroundColor: 'black'},
                        buttonTextStyle: {color: '#50A0FA'},
                    });
                    this.setState({networkState: true});
                } else {
                    if (this.state.networkState == true) {
                        Toast.show({
                            text: 'Back to online',
                            type: 'success',
                            buttonText: 'Okay',
                            duration: 5000,
                        });
                    }
                }
            });
            // isConnectivity()
            axios.interceptors.request.use((req) => {
                return req;
            });
            axios.interceptors.response.use(
                (response) => {
                    if (response.data.message != 'success' && response.data.message) {
                        Toast.show({
                            text: response.data.message,
                            // type: "warning",
                            buttonText: 'Okay',
                            duration: 3000,
                            style: {backgroundColor: 'black'},
                            buttonTextStyle: {color: '#50A0FA'},
                        });
                    }
                    return response;
                },
                (error) => {
                    // this.props.onAuthLogout()
                    if (error.response.data.message == 'Unauthenticated.') {
                        this.props.onAuthLogout()
                    }
                    //set error array
                    this.setState({errors:error.response.data.message})
                    Toast.show({
                        text: error.response.data.message,
                        // type: "warning",
                        buttonText: 'Okay',
                        duration: 30000 * 30000,
                        style: {backgroundColor: 'black'},
                        buttonTextStyle: {color: '#50A0FA'},
                    });
                    // return error;
                },
            );
        }

        render() {
            return (
                <>
                    <WrappedComponent errors={this.state.errors} {...this.props} />
                </>
            );
        }
    };

    const mapStateToProps = state => {
        return {
            user: state.auth,
        };
    };
    const mapDispatchToProps = dispatch => {
        return {
            onAuthLogout: () => dispatch(authLogout()),
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(Error);
};


export default AxiosErrorHandler;
