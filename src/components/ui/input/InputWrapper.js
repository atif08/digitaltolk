import React from 'react';
import {View, TextInput, Text} from 'react-native';
import GlobalStyle from '../../../constants/GlobalStyle';
import {base} from '../../../constants';
import {Icon, Input, Item, Label} from 'native-base';
import {validate} from '../../../helper/validation/validation_wrapper';
import ParagraphText from '../headings/ParagraphText';
const InputWrapper = props => {
    return (
        <>
            <Item style={[GlobalStyle.inputMargin,{borderBottomColor:(props.error)? 'red': (props.value != '')?
                    'green'
                    :base.secondColor }]} floatingLabel placeholder={'asdfasdfasdf'} >
                <Label style={{color:base.secondColor}} >{props.lable}</Label>

                {props.children}

                {(props.error)?
                    <Icon style={{color:'red'}} name='close-circle' />
                    :(props.value != '')?
                        <Icon style={{color:'green'}} name='checkmark-circle' />
                        : null
                }
            </Item>
            {(props.error)? <ParagraphText style={{color:'red'}}>{props.error}</ParagraphText>:null}
        </>
    );
};
export default InputWrapper;
