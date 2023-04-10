import React from 'react';
import {Image, Text, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {card, conversation, memories} from '../assets/images';

const OnBoarding = (props:any) => {
  return (
    <Onboarding
      onSkip={() => props.navigation.replace("Login")}
      onDone={() => props.navigation.navigate("SignUp")}
      pages={[
        {
          backgroundColor: '#E56B6F',
          image: <Image source={card} style={{width: 170, height: 155, marginBottom: 30}}/>,
          title: 'The easiest way to split expenses with friends',
          subtitle: '',
        },
        {
          backgroundColor: '#B56576',
          image: <Image source={conversation} style={{width: 170, height: 170, marginBottom: 30}}/>,
          title: 'Say goodbye to awkward money conversations',
          subtitle: '',
        },
        {
          backgroundColor: '#6D597A',
          image: <Image source={memories} style={{width: 170, height: 170, marginBottom: 30}}/>,
          title: 'Share expenses, share memories',
          subtitle: "",
        },
      ]}
    />
  );
};

export default OnBoarding;
