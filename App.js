import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from './src/assets/css/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Screens */
import Splash from './src/views/Splash';
import Pharmacy from './src/views/Pharmacy';
import EditProduct from './src/views/EditProduct';
import Call from './src/views/Call';
import VideoCall from './src/views/VideoCall';
import VendorDetails from './src/views/VendorDetails';
import LocationSearch from './src/views/LocationSearch';
import SubCategory from './src/views/SubCategory';
import Product from './src/views/Product';
import Category from './src/views/Category';
import DoctorSubCategories from './src/views/DoctorSubCategories';
import ProductDetails from './src/views/ProductDetails';
import Promo from './src/views/Promo';
import MyOrders from './src/views/MyOrders';
import OrderDetails from './src/views/OrderDetails';
import Cart from './src/views/Cart';
import Profile from './src/views/Profile';
import More from './src/views/More';
import Prescription from './src/views/Prescription';
import AddPrescription from './src/views/AddPrescription';
import ViewPrescription from './src/views/ViewPrescription';
import Address from './src/views/Address';
import AddressList from './src/views/AddressList';
import Payment from './src/views/Payment';
import Login from './src/views/Login';
import Register from './src/views/Register';
import Faq from './src/views/Faq';
import FaqDetails from './src/views/FaqDetails';
import PrivacyPolicy from './src/views/PrivacyPolicy';
import Forgot from './src/views/Forgot';
import Otp from './src/views/Otp';
import Rating from './src/views/Rating';
import Reset from './src/views/Reset';
import ContactUs from './src/views/ContactUs';
import Logout from './src/views/Logout';
import Search from './src/views/Search';
import Wallet from './src/views/Wallet';
import DoctorList from './src/views/DoctorList';
import DoctorDetail from './src/views/DoctorDetail';
import AppointmentDetail from './src/views/AppointmentDetail';
import CreateAppointment from './src/views/CreateAppointment';
import MyBookingDetails from './src/views/MyBookingDetails';
import Chat from './src/views/Chat';
import { NativeBaseProvider } from 'native-base';
import Home from './src/views/Home';
import Header from './src/components/Header';
import { Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colors.theme_bg_dark,
                    fontFamily: 'GoogleSans-Medium'
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#bfbfbf'
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='ios-home' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Pharmacy"
                component={Pharmacy}
                options={{
                    tabBarLabel: 'Pharmacy',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='ios-medkit' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    tabBarLabel: 'MyOrders',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='ios-list' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Prescription"
                component={Prescription}
                options={{
                    tabBarLabel: 'Prescription',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='ios-document' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="More"
                component={More}
                options={{
                    tabBarLabel: 'More',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='ios-list' color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash" screenOptions={{
                    header: (props) => <Header {...props} />,
                    headerMode: 'screen',
                    headerTransparent: true
                }}>
                    <Stack.Screen name="AddPrescription" component={AddPrescription} />
                    <Stack.Screen name="Address" component={Address} />
                    <Stack.Screen name="AddressList" component={AddressList} />
                    <Stack.Screen name="LocationSearch" component={LocationSearch} />
                    <Stack.Screen name="MyBookingDetails" component={MyBookingDetails} />
                    <Stack.Screen name="ContactUs" component={ContactUs} />
                    <Stack.Screen name="Faq" component={Faq} />
                    <Stack.Screen name="EditProduct" component={EditProduct} />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="Chat" component={Chat} />
                    <Stack.Screen name="Call" component={Call} />
                    <Stack.Screen name="VideoCall" component={VideoCall} />
                    <Stack.Screen name="FaqDetails" component={FaqDetails} />
                    <Stack.Screen name="Forgot" component={Forgot} />
                    <Stack.Screen name="Rating" component={Rating} />
                    <Stack.Screen name="HomeScreen" component={MyTabs} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Logout" component={Logout} />
                    <Stack.Screen name="OrderDetails" component={OrderDetails} />
                    <Stack.Screen name="Otp" component={Otp} />
                    <Stack.Screen name="Payment" component={Payment} />
                    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                    <Stack.Screen name="Product" component={Product} />
                    <Stack.Screen name="ProductDetails" component={ProductDetails} />
                    <Stack.Screen name="Promo" component={Promo} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Reset" component={Reset} />
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Wallet" component={Wallet} />
                    <Stack.Screen name="SubCategory" component={SubCategory} />
                    <Stack.Screen name="ViewPrescription" component={ViewPrescription} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Category" component={Category} />
                    <Stack.Screen name="VendorDetails" component={VendorDetails} />
                    <Stack.Screen name="Search" component={Search} />
                    <Stack.Screen name="DoctorList" component={DoctorList} />
                    <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
                    <Stack.Screen name="AppointmentDetail" component={AppointmentDetail} />
                    <Stack.Screen name="CreateAppointment" component={CreateAppointment} />
                    <Stack.Screen name="DoctorSubCategories" component={DoctorSubCategories} />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;
