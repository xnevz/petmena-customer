import React, { memo, useState } from 'react';
import { SafeAreaView, View, Text, Image, Animated } from 'react-native';
import { connect } from "react-redux";
import { Box, Button } from 'native-base';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

/**
 * 
 * @author [amr dar]
 * @version 1.0.0
 */
const BottomBar = memo(({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <>
            <SafeAreaView
                style={{
                    elevation: 0,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0
                }}>
                <Box shadow='9' style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 60,
                    marginHorizontal: 5,
                    borderTopEndRadius: 15,
                    borderTopStartRadius: 15,
                    backgroundColor: '#fff',
                }}>
                    {state.routes.map((route, index) => {

                        const { options } = descriptors[route.key];

                        const isFocused = state.index === index;

                        const onPress = () => {
                            navigation.navigate(route.name);
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });

                        };
                        if (route.name === 'MyOrders')
                            return (
                                <View
                                    key={route.key}
                                    style={[{
                                        height: 66,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: -55,
                                    }
                                    ]}
                                >
                                    <Button
                                        key={route.key}
                                        style={{
                                            height: 70,
                                            width: 70,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 66,
                                            borderWidth: 5,
                                            borderColor: 'white',
                                            zIndex: 1,
                                            backgroundColor: 'gold'
                                        }}
                                    >
                                        {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: 'white', size: 30 })}
                                    </Button>
                                </View>
                            );
                        return (
                            <Button
                                key={route.key}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{
                                    height: 66,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                    flex: 1,
                                }}

                            >
                                <Animated.View style={{
                                    alignItems: 'center',
                                    height: '100%',
                                    justifyContent: 'center'
                                }}
                                >
                                    {!!options?.tabBarBadge &&
                                        <View
                                            style={{
                                                width: 12, height: 12, borderRadius: 12,
                                                zIndex: 1,
                                                position: 'absolute',
                                                top: 5,
                                                left: 3
                                            }}
                                        />
                                    }
                                    {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: '#0009', size: 25 })}
                                </Animated.View>
                            </Button>
                        );
                    })}
                </Box>
            </SafeAreaView>
        </>
    );

});

const mapStateToProps = (state: any) => {
    const { reduxProps } = state;
    return { reduxProps };
};

export default connect(mapStateToProps)(BottomBar);