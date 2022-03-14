import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {base, margin} from '../../constants';
import {
    Container,
    Content,
} from 'native-base';
import GlobalStyle from '../../constants/GlobalStyle';
import ProfileItemLink from './ProfileItemLink.js';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {authLogout} from '../../store/actions/auth';
import {connect} from 'react-redux';
import {RequestLoader} from '../../components/ui/loader/RequestLoader';

class Profile extends Component {
    state = {
        isLoading: false
    }
    onLogout(){
        this.setState({isLoading: true})
        this.props.onAuthLogout();
    }
    render() {
        return (
            <Container>
                <RequestLoader visible={this.state.isLoading}/>
                <Content style={GlobalStyle.containerStyle}>
                      <ProfileItemLink name="Log Out" icon="enter-outline" pressEvent={() =>   this.onLogout()}/>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthLogout: () => dispatch(authLogout()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    headerCard: {
        backgroundColor: base.secondColor,
        height: 200,
        position: 'absolute',
        zIndex: 10,
    },
    boxWithShadow: {
        shadowColor: base.mainColor,
        shadowOffset: {width: 0, height:1},
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: margin.xlarge+30,
        top: Platform.OS === 'ios' ? responsiveScreenHeight(3) : responsiveScreenHeight(7),
        position: 'relative',
        zIndex: 100,
        borderRadius: 30
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: margin.xlarge + 30,
    },
    centerImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },

});
