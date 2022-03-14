import {Button, Header, Icon, Left, Right,Body} from 'native-base';
import {base} from '../../constants';
import {Image} from 'react-native';
import clubImage from '../../../assets/person-thumb.png';
import HeadingText from '../../components/ui/headings/HeadingText';
import Logo from '../../../assets/login/logo.png';
import React from 'react';
import SubHeadingText from '../../components/ui/headings/SubHeadingText';
import GlobalStyle from '../../constants/GlobalStyle';
import LogoCard from '../../components/ui/cards/LogoCard';

export default function ImageTitleHeader ({scene, previous, navigation})  {
    const {name,photo}  =scene.route.params
    // const {options} = scene.descriptor;
    // const title =
    //     options.headerTitle !== undefined
    //         ? options.headerTitle
    //         : options.title !== undefined
    //         ? options.title
    //         : scene.route.name;
    return (
        <Header  transparent iosBarStyle={'dark-content'} androidStatusBarColor={base.secondColor}
                style={[{backgroundColor: 'white',marginBottom: 5},GlobalStyle.HeaderBoxShadow]}>
            <Left style={{
                flex: 2,
                paddingLeft: 0,
                paddingRight: 0,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                {previous ? (
                    <Button transparent onPress={navigation.goBack}>
                        <Icon style={{fontSize:25,color:base.mainColor}} name="arrow-back"/>
                    </Button>
                ) : (
                    undefined
                )}
                <LogoCard color={base.secondColor}  title={name} photo={photo} size={40}/>
                <SubHeadingText style={{marginLeft:10}}>{name}</SubHeadingText>
            </Left>
        </Header>
        // <Header iosBarStyle={'dark-content'} androidStatusBarColor={base.secondColor}
        //         style={[{backgroundColor: 'red',marginBottom: 5},GlobalStyle.globalBoxShadow]}>
        //     <Left style={{
        //         // flex: 3,
        //         paddingLeft: 0,
        //         paddingRight: 0,
        //         flexDirection: 'row',
        //         justifyContent: 'flex-start',
        //         alignItems: 'center',
        //     }}>
        //         <LogoCard  title='as dfasdf' photo='' size={40}/>
        //         <SubHeadingText style={{marginLeft:10}}>Group A</SubHeadingText>
        //     </Left>
        //     <Body></Body>
        //     <Right></Right>
        //
        // </Header>
    );
};
