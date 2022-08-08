import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {
  api_url,
  get_profile,
  profile_update,
  profile_picture,
  font_description,
  font_title,
  get_blood_list,
} from '../config/Constants';
import {
  Button,
  Image as Thumbnail,
  Select as Picker,
  HStack,
  Avatar,
  Center,
  Flex,
} from 'native-base';
import {Input} from 'react-native-elements';
import {StatusBar, Loader} from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  editServiceActionPending,
  editServiceActionError,
  editServiceActionSuccess,
  updateServiceActionPending,
  updateServiceActionError,
  updateServiceActionSuccess,
  updateProfilePicture,
} from '../actions/ProfileActions';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import overlay from '../assets/img/backOverlay.png';
import Header from '../components/PageHeader';

const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
};

function Profile(props) {
  const [state, msetState] = useState({
    profile_picture: '',
    customer_name: '',
    phone_number: '',
    email: '',
    password: '',
    validation: true,
    data: '',
    blood_group: '',
    blood_group_list: [],
  });
  function setState(mstate) {
    msetState({...state, ...mstate});
  }

  useEffect(() => {
    get_blood_list();
    get_profile();
  }, []);

  function handleBackButtonClick() {
    props.navigation.goBack(null);
  }
  async function get_profile() {
    props.editServiceActionPending();
    await axios({
      method: 'post',
      url: api_url + get_profile,
      data: {customer_id: global.id},
    })
      .then(async response => {
        await props.editServiceActionSuccess(response.data);
        await setState({
          customer_name: props.data.customer_name,
          email: props.data.email,
          phone_number: props.data.phone_number,
          profile_picture: props.profile_picture,
          blood_group: props.data.blood_group,
        });
      })
      .catch(error => {
        showSnackbar('Sorry something went wrong!');
        props.editServiceActionError(error);
      });
  }

  async function update_profile() {
    Keyboard.dismiss();
    await checkValidate();
    if (state.validation) {
      props.updateServiceActionPending();
      await axios({
        method: 'post',
        url: api_url + profile_update,
        data: {
          id: global.id,
          customer_name: state.customer_name,
          phone_number: state.phone_number,
          email: state.email,
          password: state.password,
          blood_group: state.blood_group,
        },
      })
        .then(async response => {
          alert('Successfully updated');
          await props.updateServiceActionSuccess(response.data);
          await saveData();
        })
        .catch(error => {
          //   alert(error);
          //   props.updateServiceActionError(error);
          // TOTODO
        });
    }
  }

  async function saveData() {
    if (props.status == 1) {
      try {
        await AsyncStorage.setItem('user_id', props.data.id.toString());
        await AsyncStorage.setItem(
          'customer_name',
          props.data.customer_name.toString(),
        );
        global.id = await props.data.id;
        global.customer_name = await props.data.customer_name;
        await showSnackbar('Profile updated Successfully');
        await setState({password: ''});
      } catch (e) {}
    } else {
      alert(props.message);
    }
  }

  function checkValidate() {
    if (
      state.email == '' ||
      state.phone_number == '' ||
      state.blood_group == '' ||
      state.customer_name == ''
    ) {
      state.validation = false;
      showSnackbar('Please fill all the fields.');
      return true;
    }
  }

  function select_photo() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setState({
          data: response.data,
        });
        props.updateProfilePicture(source);
        profileimageupdate();
      }
    });
  }

  async function profileimageupdate() {
    // TODO
    // RNFetchBlob.fetch(
    //     "POST",
    //     api_url + profile_picture,
    //     {
    //         "Content-Type": "multipart/form-data",
    //     },
    //     [
    //         {
    //             name: "profile_picture",
    //             filename: "image.png",
    //             type: "image/png",
    //             data: state.data,
    //         },
    //         {
    //             name: "customer_id",
    //             data: global.id.toString(),
    //         },
    //     ]
    // )
    //     .then((resp) => {
    //         showSnackbar("Profile Picture Updated Successfully");
    //     })
    //     .catch((err) => {
    //         showSnackbar("Error on while uploading,Try again");
    //     });
  }

  async function get_blood_list() {
    await axios({
      method: 'get',
      url: api_url + get_blood_list,
    })
      .then(async response => {
        setState({blood_group_list: response.data.result});
      })
      .catch(error => {
        // alert('Sorry, something went wrong!');
        // TOTODO
      });
  }

  select_blood_group = value => {
    setState({blood_group: value});
  };

  function showSnackbar(msg) {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  const {isLoding, profile_picture, navigation} = props;

  let bl_list = state.blood_group_list.map((s, i) => {
    return <Picker.Item key={i} value={s.blood_group} label={s.blood_group} />;
  });

  return (
    <View style={styles.container}>
      {/* <StatusBar /> */}
      <StatusBar backgroundColor={colors.theme_bg} />

      {/* <Loader visible={isLoding} /> */}

      {/* header */}
      <Header
        onBackPress={handleBackButtonClick}
        label="PROFILE"
        avatar={profile_picture}
      />

      {/* bar */}
      <View style={styles.bar} />
      {/* overlay */}
      <Image
        source={overlay}
        style={{width: '100%', height: '100%', position: 'absolute'}}
      />
      {/* details */}
      <View style={styles.details}>
        {/* overlay */}
        <Image
          source={overlay}
          style={{width: '100%', height: '100%', position: 'absolute'}}
        />
        {/* user avatar && user name  */}
        <Center style={styles.avatar}>
          <Avatar
            bg="gray.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
            size={180}>
            PP
          </Avatar>
          <Text
            style={{
              color: '#000',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
              fontWeight: '400',
            }}>
            Khaled J Ahmed
          </Text>
        </Center>

        {/* inputs */}
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView
            style={{paddingHorizontal: 20}}
            contentContainerStyle={{paddingBottom: 20}}>
            {/* username */}

            <Input
              place
              variant="underlined"
              placeholder="Username"
              onChangeText={TextInputValue =>
                setState({customer_name: TextInputValue})
              }
              value="Khaled J Ahmed"
              placeholderTextColor="#000"
              leftIcon={<Icon name="person-outline" size={25} color="gray" />}
              rightIcon={
                <Icon name="arrow-forward-ios" color="gray" size={20} />
              }
            />
            {/* Email */}
            <Input
              variant="underlined"
              placeholder="Email"
              onChangeText={TextInputValue => setState({email: TextInputValue})}
              value="hlaa3me@gmail.com"
              leftIcon={<Icon name="alternate-email" size={25} color="gray" />}
              rightIcon={
                <Icon name="arrow-forward-ios" color="gray" size={20} />
              }
            />
            {/* Phone Number */}
            <Input
              variant="underlined"
              placeholder="Phone Number"
              onChangeText={TextInputValue =>
                setState({phone_number: TextInputValue})
              }
              leftIcon={<FeatherIcon name="phone" size={25} color="gray" />}
              rightIcon={
                <Icon name="arrow-forward-ios" color="gray" size={20} />
              }
            />
            {/* Password */}
            <Input
              variant="underlined"
              placeholder="Password"
              onChangeText={TextInputValue =>
                setState({password: TextInputValue})
              }
              leftIcon={<Icon name="lock-outline" size={25} color="gray" />}
              rightIcon={
                <Icon name="arrow-forward-ios" color="gray" size={20} />
              }
            />
            {/* Address */}
            <Input
              variant="underlined"
              placeholder="Address"
              onChangeText={TextInputValue => {
                // setState({address: TextInputValue})
                // TOTODO
              }}
              leftIcon={<FeatherIcon name="map-pin" size={25} color="gray" />}
              rightIcon={
                <Icon name="arrow-forward-ios" color="gray" size={20} />
              }
            />
            {/* Payment Information */}
            <Input
              variant="underlined"
              placeholder="Payment Information"
              onChangeText={TextInputValue => {
                // setState({payment_information: TextInputValue})
                // TOTODO
              }}
              leftIcon={<Icon name="person-outline" size={25} color="gray" />}
              rightIcon={
                <Icon name="arrow-forward-ios" color="gray" size={20} />
              }
            />

            {/* pets list */}
            <TouchableOpacity
              style={{width: '100%'}}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('pets_list');
              }}>
              <Flex
                align="center"
                justify="space-between"
                direction="row"
                backgroundColor={colors.theme_yellow}
                px={5}
                py={3}
                borderRadius={15}>
                <Flex align="center" direction="row">
                  <Icon name="pets" color="#000" size={25} />
                  <Text style={{color: '#000', marginLeft: 10}}>Pets List</Text>
                </Flex>
                <Icon name="arrow-forward-ios" color="#000" size={20} />
              </Flex>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {/* <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.pro_style6}>
          <View style={styles.pro_style7} />
          {/* <View style={styles.pro_style8}>
            <TouchableOpacity onPress={select_photo.bind(this)}>
              <Thumbnail large source={profile_picture} />
            </TouchableOpacity>
          </View> 
          <View style={styles.pro_style9} />

          <View style={styles.pro_style10}>
            <Input
              inputStyle={styles.pro_style11}
              label="User name"
              labelStyle={styles.pro_style12}
              placeholder="john"
              value={state.customer_name}
              onChangeText={TextInputValue =>
                setState({customer_name: TextInputValue})
              }
              leftIcon={
                <Icon
                  name="person"
                  size={20}
                  color="black"
                  style={styles.pro_style13}
                />
              }
            />
          </View>
          <View style={styles.pro_style14}>
            <Input
              inputStyle={styles.pro_style15}
              label="Phone Number"
              labelStyle={styles.pro_style16}
              placeholder="+91xxxxxxxxxx"
              keyboardType="phone-pad"
              value={state.phone_number}
              onChangeText={TextInputValue =>
                setState({phone_number: TextInputValue})
              }
              leftIcon={
                <Icon
                  name="call"
                  size={20}
                  color="black"
                  style={styles.pro_style17}
                />
              }
            />
          </View>
          <View style={styles.pro_style18}>
            <Input
              inputStyle={styles.pro_style19}
              label="Email"
              labelStyle={styles.pro_style20}
              placeholder="abcd@gmail.com"
              keyboardType="email-address"
              value={state.email}
              onChangeText={TextInputValue => setState({email: TextInputValue})}
              leftIcon={
                <Icon
                  name="mail"
                  size={20}
                  color="black"
                  style={styles.pro_style21}
                />
              }
            />
          </View>
          <View style={styles.pro_style22}>
            <Input
              inputStyle={styles.pro_style23}
              placeholder="**********"
              label="Password"
              labelStyle={styles.pro_style24}
              leftIcon={
                <Icon
                  name="key"
                  size={20}
                  color="black"
                  style={styles.pro_style25}
                />
              }
              secureTextEntry={true}
              value={state.password}
              onChangeText={TextInputValue =>
                setState({password: TextInputValue})
              }
            />
          </View>
          <View style={styles.pro_style26}>
            <Text style={styles.pro_style27}>Blood Group</Text>
            <Picker
              selectedValue={state.blood_group}
              style={styles.pro_style28}
              onValueChange={(itemValue, itemIndex) =>
                select_blood_group(itemValue)
              }>
              {bl_list}
            </Picker>
          </View>
          <View style={styles.pro_style29} />
          <View style={styles.pro_style30}>
            <Button block style={styles.pro_style31} onPress={update_profile}>
              <Text style={styles.pro_style32}>UPDATE</Text>
            </Button>
          </View>
        </View>
      </ScrollView> */}
    </View>
  );
}

function mapStateToProps(state) {
  return {
    isLoding: state.profile.isLoding,
    message: state.profile.message,
    status: state.profile.status,
    data: state.profile.data,
    profile_picture: state.profile.profile_picture,
  };
}

const mapDispatchToProps = dispatch => ({
  editServiceActionPending: () => dispatch(editServiceActionPending()),
  editServiceActionError: error => dispatch(editServiceActionError(error)),
  editServiceActionSuccess: data => dispatch(editServiceActionSuccess(data)),
  updateServiceActionPending: () => dispatch(updateServiceActionPending()),
  updateServiceActionError: error => dispatch(updateServiceActionError(error)),
  updateServiceActionSuccess: data =>
    dispatch(updateServiceActionSuccess(data)),
  updateProfilePicture: data => dispatch(updateProfilePicture(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  details: {
    backgroundColor: '#fff',
    position: 'relative',
    borderTopRightRadius: 50,
    flex: 1,
  },
  container: {
    backgroundColor: colors.theme_bg,
    flex: 1,
    position: 'relative',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
  },
  bar: {
    height: 80,
  },
  avatar: {
    // marginTop: -80,
    // position: 'absolute',
    top: -80,
    marginBottom: -80,
  },
  pro_style1: {alignItems: 'flex-start', margin: 10},
  pro_style2: {width: 100, justifyContent: 'center'},
  pro_style3: {color: colors.theme_fg_two, fontSize: 30},
  pro_style4: {margin: 5},
  pro_style5: {fontSize: 25, color: colors.theme_fg_two, fontWeight: 'bold'},
  pro_style6: {height: '80%', justifyContent: 'center', alignItems: 'center'},
  pro_style7: {marginTop: '20%'},
  pro_style8: {
    alignSelf: 'center',
    borderColor: colors.theme_bg,
    borderWidth: 2,
    borderRadius: 45,
  },
  pro_style9: {marginTop: '5%'},
  pro_style10: {width: '80%', alignSelf: 'center'},
  pro_style11: {fontSize: 14},
  pro_style12: {fontFamily: font_title},
  pro_style13: {color: colors.theme_bg},
  pro_style14: {width: '80%', alignSelf: 'center'},
  pro_style15: {fontSize: 14, fontFamily: font_description},
  pro_style16: {fontFamily: font_title},
  pro_style17: {color: colors.theme_bg},
  pro_style18: {width: '80%', alignSelf: 'center'},
  pro_style19: {fontSize: 14, fontFamily: font_description},
  pro_style20: {fontFamily: font_title},
  pro_style21: {color: colors.theme_bg},
  pro_style22: {width: '80%', alignSelf: 'center'},
  pro_style23: {fontSize: 14, fontFamily: font_description},
  pro_style24: {fontFamily: font_title},
  pro_style25: {color: colors.theme_bg},
  pro_style26: {width: '80%', alignSelf: 'center'},
  pro_style27: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: '3%',
    fontFamily: font_description,
  },
  pro_style28: {height: 50, width: '100%'},
  pro_style29: {marginTop: '5%'},
  pro_style30: {width: '80%', alignSelf: 'center'},
  pro_style31: {
    backgroundColor: colors.theme_bg,
    borderRadius: 5,
    height: 40,
    fontFamily: font_title,
  },
  pro_style32: {
    color: colors.theme_fg_three,
    fontFamily: font_title,
    letterSpacing: 0.5,
  },
});
