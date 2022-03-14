import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    View,
    StatusBar,
} from 'react-native';
import {base} from '../../constants';
import Person from '../../../assets/person-thumb.png';
import {
    Icon,
    Button,
    Container
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ParagraphText from '../../components/ui/headings/ParagraphText';
import SubTitleText from '../../components/ui/headings/SubTitleText';

export default class GetStarted extends Component {
    render() {
        return (
            <>
                <StatusBar iosBarStyle="light-content" backgroundColor={base.secondColor}/>

                <LinearGradient style={styles.container}
                                start={{x: 0, y: 0}}
                                end={{x: 0, y: 1}}
                                colors={[base.secondColor, base.gradientEnd]}>
                    <View>
                        <Image style={styles.personImage} source={Person}/>
                    </View>
                    <SubTitleText style={{color: 'white', fontWeight: '600', marginBottom: 20}}>
                        Account Name
                    </SubTitleText>
                    <View style={{marginBottom: 100, paddingLeft: 30, paddingRight: 30}}>
                        <ParagraphText style={{color: 'white', textAlign: 'center'}}>Your Account is ready! Tap on get
                            started to proceed
                        </ParagraphText>
                    </View>
                    <View>
                        <Button rounded iconRight style={{backgroundColor: 'white', paddingLeft: 20}}>
                            <ParagraphText second>Get Started</ParagraphText>
                            <Icon style={{color: base.secondColor, paddingRight: 4}} name='arrow-forward'/>
                        </Button>
                    </View>

                </LinearGradient>

            </>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
        , alignItems: 'center',
    },
    personImage: {
        borderColor: 'white',
        borderRadius: 150,
        borderWidth: 5,
        height: 150,
        width: 150,
        resizeMode: 'cover',
        marginBottom: 100,
    },
});
