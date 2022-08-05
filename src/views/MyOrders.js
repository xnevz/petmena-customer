import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Container, List, ListItem, Col, Tab, Tabs, TabHeading, Icon, Thumbnail } from 'native-base';
import { api_url, my_orders, tablet, img_url, font_title, font_description, no_appointment_lottie, no_orders_lottie } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import Moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button as Btn, Badge } from 'react-native-elements';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/MyOrdersActions';
import ProgressCircle from 'react-native-progress-circle';
import { fb } from '../config/firebaseConfig';
import LottieView from 'lottie-react-native';

function MyOrders(props) {

    const [state, msetState] = useState({
        current_status: '',
        isLoding: false,
        api_status: 0,
        orders: [],
        booking_requests: []
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    // useEffect(() => {
    //     booking_sync();
    //     const _unsubscribe = props.navigation.addListener('focus', () => {
    //         my_orders();
    //     });

    //     return _unsubscribe;
    // }, []);

    function booking_sync() {
        fb.ref('/customers/' + global.id).on('value', snapshot => {
            my_orders();
        });
    }

    myorders_details = (data) => {
        props.navigation.navigate('OrderDetails', { data: data });
    }

    mybooking_details = (data) => {
        props.navigation.navigate('MyBookingDetails', { data: data });
    }

    async function my_orders() {
        setState({ isLoding: true });
        props.serviceActionPending();
        await axios({
            method: 'post',
            url: api_url + my_orders,
            data: { customer_id: global.id }
        })
            .then(async response => {
                //alert(JSON.stringify(response));
                setState({ isLoding: false, api_status: 1, orders: response.data.result.orders, booking_requests: response.data.result.booking_requests });
                await props.serviceActionSuccess(response.data)
                if (response.data.result.length == 0) {
                    setState({ current_status: 'No data found' });
                } else {
                    setState({ current_status: '' })
                }
            })
            .catch(error => {
                setState({ isLoding: false });
                props.serviceActionError(error);
            });
    }

    update_rating = (data) => {
        props.navigation.navigate('Rating', { data: data });
    }

    function get_status(booking_status, booking_request_status, booking_status_name, booking_request_status_name) {
        if (booking_status) {
            return (
                <Badge badgeStyle={{ alignSelf: 'flex-start', padding: 10 }} status="success" value={booking_status_name} />
            )
        } else {
            if (booking_request_status == 1) {
                return (
                    <Badge badgeStyle={{ alignSelf: 'flex-start', padding: 10 }} status="warning" value={booking_request_status_name} />
                )
            } else if (booking_request_status == 2) {
                return (
                    <Badge badgeStyle={{ alignSelf: 'flex-start', padding: 10 }} status="success" value={booking_request_status_name} />
                )
            } else {
                return (
                    <Badge badgeStyle={{ alignSelf: 'flex-start', padding: 10 }} status="error" value={booking_request_status_name} />
                )
            }
        }
    }


    // Moment.locale('en');
    // const { isLoding, data, bookings, } = props;

    return <Text>HI</Text>;

    // return (
    //     <Container>
    //         <Tabs tabBarUnderlineStyle={styles.order_style1} >
    //             <Tab heading={<TabHeading style={styles.order_style2}><Icon style={styles.order_style3} name="pulse" /><Text style={styles.order_style4}>Appointments</Text></TabHeading>}>
    //                 <View>
    //                     <List>
    //                         <FlatList
    //                             data={bookings}
    //                             renderItem={({ item, index }) => (
    //                                 <Box onPress={() => mybooking_details(item)}>
    //                                     <Box style={styles.order_style5}>
    //                                         <Thumbnail square source={{ uri: img_url + item.profile_image }} />
    //                                     </Box>
    //                                     <Box style={styles.order_style6} >
    //                                         <Text style={styles.order_style7}>Dr.{item.doctor_name}</Text>
    //                                         <View style={styles.order_style8} />
    //                                         <Text style={styles.order_style9} numberOfLines={1} >{item.title}</Text>
    //                                         <View style={styles.order_style10} />
    //                                         {get_status(item.booking_status, item.booking_request_status, item.booking_status_name, item.booking_request_status_name)}
    //                                     </Box>
    //                                     <Box style={styles.order_style11}>
    //                                         <Text style={styles.order_style12} >{Moment(item.start_time).format('DD MMM')}</Text>
    //                                         <Text style={styles.order_style13} >{Moment(item.start_time).format('hh:mm A')}</Text>
    //                                     </Box>
    //                                 </Box>
    //                             )}
    //                             keyExtractor={item => item.id}
    //                         />
    //                     </List>
    //                     {bookings.length == 0 && state.api_status == 1 &&
    //                         <View>
    //                             <View style={styles.order_style14}>
    //                                 <LottieView source={no_appointment_lottie} autoPlay loop />
    //                             </View>
    //                             <Text style={styles.order_style15}>Sorry, no appointment found</Text>
    //                         </View>
    //                     }
    //                 </View>
    //             </Tab>
    //             <Tab heading={<TabHeading style={styles.order_style16}><Icon style={styles.order_style17} name="apps" /><Text style={styles.order_style18}> My Orders</Text></TabHeading>} >
    //                 <View>
    //                     <Loader visible={isLoding} />
    //                     <Loader visible={state.isLoding} />
    //                     <List>
    //                         {data.map((row, index) => (
    //                             <Box onPress={() => myorders_details(row)} >
    //                                 <Box style={styles.order_style19}>
    //                                     <ProgressCircle
    //                                         percent={row.status * 16.666}
    //                                         radius={30}
    //                                         borderWidth={3}
    //                                         color={colors.theme_fg}
    //                                         shadowColor="#e6e6e6"
    //                                         bgColor="#FFFFFF"
    //                                     >
    //                                         <View style={styles.order_style20} >
    //                                             <Image
    //                                                 style={styles.order_style21}
    //                                                 source={tablet}
    //                                             />
    //                                         </View>
    //                                     </ProgressCircle>
    //                                 </Box>
    //                                 <Box style={styles.order_style22} >

    //                                     <Text style={styles.order_style23}>Order Id : {row.order_id}</Text>
    //                                     <View style={styles.order_style24} />
    //                                     <Text style={styles.order_style25} >{Moment(row.created_at).format('DD MMM-YYYY hh:mm')}</Text>
    //                                     <Text style={styles.order_style26} >{row.label_name}</Text>
    //                                     <View style={styles.order_style27} />
    //                                     {row.status == 8 && row.rating_update_status == 0 &&
    //                                         <Btn
    //                                             title="Give Rating"
    //                                             buttonStyle={styles.order_style28}
    //                                             titleStyle={styles.order_style29}
    //                                             onPress={update_rating.bind(this, row)}
    //                                         />
    //                                     }
    //                                 </Box>
    //                                 <Box>
    //                                     <Text style={styles.order_style30} >{global.currency}{row.total}</Text>
    //                                 </Box>
    //                             </Box>
    //                         ))}
    //                     </List>
    //                     {data.length == 0 && state.api_status == 1 &&
    //                         <View>
    //                             <View style={styles.order_style31}>
    //                                 <LottieView source={no_orders_lottie} autoPlay loop />
    //                             </View>
    //                             <Text style={styles.order_style32}>We are waiting for your order</Text>
    //                         </View>
    //                     }
    //                 </View>
    //             </Tab>
    //         </Tabs>
    //         <Loader visible={isLoding} />
    //         <Loader visible={state.isLoding} />
    //     </Container>
    // );
}

function mapStateToProps(state) {
    return {
        isLoding: state.myorders.isLoding,
        error: state.myorders.error,
        data: state.myorders.data,
        bookings: state.myorders.bookings,
        message: state.myorders.message,
        status: state.myorders.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);

// const styles = StyleSheet.create({
//     order_style1: { backgroundColor: colors.theme_bg },
//     order_style2: { backgroundColor: colors.theme_bg_three },
//     order_style3: { color: colors.theme_fg },
//     order_style4: { color: colors.theme_fg, marginLeft: 10, fontFamily: font_title },
//     order_style5: { width: '20%' },
//     order_style6: { width: '60%' },
//     order_style7: { fontSize: 15, fontFamily: font_title, color: colors.theme_fg_two },
//     order_style8: { margin: 1 },
//     order_style9: { color: colors.grey, marginRight: 10, fontFamily: font_description },
//     order_style10: { margin: 3 },
//     order_style11: { width: '20%', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderColor: colors.theme_fg },
//     order_style12: { color: colors.theme_fg, fontFamily: font_title, fontSize: 18 },
//     order_style13: { color: colors.theme_fg, fontSize: 12, fontFamily: font_description },
//     order_style14: { height: 250, marginTop: '40%' },
//     order_style15: { alignSelf: 'center', fontFamily: font_title },
//     order_style16: { backgroundColor: colors.theme_bg_three },
//     order_style17: { color: colors.theme_fg },
//     order_style18: { color: colors.theme_fg, marginLeft: 10, fontFamily: font_title },
//     order_style19: { width: '30%' },
//     order_style20: { height: 30, width: 30 },
//     order_style21: { flex: 1, width: undefined, height: undefined },
//     order_style22: { width: '30%' },
//     order_style23: { width: '60%', justifyContent: 'center', alignItems: 'center', borderColor: colors.theme_fg },
//     order_style24: { margin: 1 },
//     order_style25: { fontSize: 10, fontFamily: font_description },
//     order_style26: { color: colors.theme_fg, fontFamily: font_description },
//     order_style27: { margin: 3 },
//     order_style28: { width: 100, height: 30, backgroundColor: colors.theme_bg, fontFamily: font_title },
//     order_style29: { fontSize: 12, fontFamily: font_title },
//     order_style30: { fontSize: 15, fontFamily: font_title, color: colors.theme_fg_two },
//     order_style31: { height: 250, marginTop: '40%' },
//     order_style32: { alignSelf: 'center', fontFamily: font_title },

// });
