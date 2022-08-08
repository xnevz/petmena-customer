import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
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
import { NativeBaseProvider, View } from 'native-base';
import Home from './src/views/Home';
import Header from './src/components/Header';
import { theme } from './src/assets/css/theme';
import { NavigatorRouteTypes } from './src/routing/NavigatorRouteTypes';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { api_url } from './src/config/Constants';
import BottomBar from './src/components/BottomBar';


export const AppNavigator = createStackNavigator();
export const useAppNavigation = () => useNavigation<NavigationProp<NavigatorRouteTypes>>();

const Tab = createBottomTabNavigator();

declare global {
    var currency: string;
    var currency_short_code: string;
    var application_name: string;
    var razorpay_key: string;
    var delivery_charge: string;
    var free_delivery_amount: number;
    var admin_phone: string;
    var admin_email: string;
    var admin_address: string;
    var fcm_token: string;
    var id: number;
    var customer_name: string;
    var phone_number: string;
    var email: string;
};

axios.defaults.baseURL = api_url;

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            sceneContainerStyle={{
                backgroundColor: 'transparent',
            }}
            tabBar={(props) => <BottomBar {...props} />}
            screenOptions={{
                headerShown: false
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='ios-home' color={focused ? 'gold' : color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Pharmacy"
                component={Pharmacy}
                options={{
                    title: 'Pharmacy',
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
                    title: 'My Orders',
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
                    title: 'Prescription',
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
                    title: 'More',
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
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <AppNavigator.Navigator initialRouteName="splash" screenOptions={{
                    header: (props) => <Header headerProps={props} />,
                    headerMode: 'screen',
                    headerTransparent: true
                }}>
                    <AppNavigator.Screen options={{ headerShown: false }} name="splash" component={Splash} />
                    <AppNavigator.Screen name="login" options={{
                        title: 'Login'
                    }} component={Login} />
                    <AppNavigator.Screen name="register" component={Register} options={{
                        title: 'Signup'
                    }} />

                    <AppNavigator.Screen name="homeScreen" component={MyTabs} options={{
                        title: 'Home'
                    }} />

                    {/* doctor */}
                    <AppNavigator.Screen name="doctorSubCategories" component={DoctorSubCategories} />
                    <AppNavigator.Screen name="doctorList" component={DoctorList} />
                    <AppNavigator.Screen name="doctorDetail" component={DoctorDetail} />
                    <AppNavigator.Screen name="appointmentDetail" component={AppointmentDetail} />

                    {/* 
                    <AppNavigator.Screen name="addPrescription" component={AddPrescription} />
                    <AppNavigator.Screen name="address" component={Address} />
                    <AppNavigator.Screen name="addressList" component={AddressList} />
                    <AppNavigator.Screen name="locationSearch" component={LocationSearch} />
                    <AppNavigator.Screen name="myBookingDetails" component={MyBookingDetails} />
                    <AppNavigator.Screen name="contactUs" component={ContactUs} />
                    <AppNavigator.Screen name="faq" component={Faq} />
                    <AppNavigator.Screen name="editProduct" component={EditProduct} />
                    <AppNavigator.Screen name="cart" component={Cart} />
                    <AppNavigator.Screen name="chat" component={Chat} />
                    <AppNavigator.Screen name="call" component={Call} />
                    <AppNavigator.Screen name="videoCall" component={VideoCall} />
                    <AppNavigator.Screen name="faqDetails" component={FaqDetails} />
                    <AppNavigator.Screen name="forgot" component={Forgot} />
                    <AppNavigator.Screen name="rating" component={Rating} />
                    <AppNavigator.Screen name="logout" component={Logout} />
                    <AppNavigator.Screen name="orderDetails" component={OrderDetails} />
                    <AppNavigator.Screen name="otp" component={Otp} />
                    <AppNavigator.Screen name="payment" component={Payment} />
                    <AppNavigator.Screen name="privacyPolicy" component={PrivacyPolicy} />
                    <AppNavigator.Screen name="product" component={Product} />
                    <AppNavigator.Screen name="productDetails" component={ProductDetails} />
                    <AppNavigator.Screen name="promo" component={Promo} />
                    <AppNavigator.Screen name="reset" component={Reset} />
                    <AppNavigator.Screen name="wallet" component={Wallet} />
                    <AppNavigator.Screen name="subCategory" component={SubCategory} />
                    <AppNavigator.Screen name="viewPrescription" component={ViewPrescription} />
                    <AppNavigator.Screen name="profile" component={Profile} />
                    <AppNavigator.Screen name="category" component={Category} />
                    <AppNavigator.Screen name="vendorDetails" component={VendorDetails} />
                    <AppNavigator.Screen name="search" component={Search} />
                    <AppNavigator.Screen name="createAppointment" component={CreateAppointment} />
                    */}
                </AppNavigator.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;
