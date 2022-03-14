import {Button, Header, Icon, Left, Right} from 'native-base';
import {base} from '../../constants';
import {Image,Animated} from 'react-native';
import clubImage from '../../../assets/clubImage.png';
import HeadingText from '../../components/ui/headings/HeadingText';
import Logo from '../../../assets/login/logo.png';
import React from 'react';
import LogoCard from '../../components/ui/cards/LogoCard';
import SubHeadingText from '../../components/ui/headings/SubHeadingText';

export default function CustomHeader ({scene, previous, navigation,club})  {
    const progress = Animated.add(scene.progress.current, scene.progress.next || 0);

    const opacity = progress.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });


    const {name,photo} = club;
    const {options} = scene.descriptor;
    const title =
        options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
            ? options.title
            : scene.route.name;
    return (
        <Animated.View style={{ opacity }}>
        <Header hasTabs transparent androidStatusBarColor={base.secondColor}
                style={[{backgroundColor: 'white', margin: 20, marginBottom: 5}]}>
            <Left style={{
                flex: 2,
                paddingLeft: 0,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <LogoCard color='orange'  title={name} photo={photo} size={50}/>
                <SubHeadingText style={{marginLeft:10}}>{name}</SubHeadingText>
                {previous ? (
                    <Button transparent onPress={navigation.goBack}>
                        <Icon name="arrow-back"/>
                    </Button>
                ) : (
                    undefined
                )}
            </Left>
            <Right style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 10,
            }}>
                <Image style={{width: 80, height: 60, resizeMode: 'contain'}} source={Logo}/>
            </Right>
        </Header>
        </Animated.View>
    );
};
