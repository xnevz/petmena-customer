import * as ActionTypes from './ActionTypes';

export const orderServicePending = () => ({
    type: ActionTypes.ORDER_SERVICE_PENDING
})

export const orderServiceError = (error) => ({
    type: ActionTypes.ORDER_SERVICE_ERROR,
    error: error
})

export const orderServiceSuccess = (data) => ({
    type: ActionTypes.ORDER_SERVICE_SUCCESS,
    data: data
})

export const paymentListPending = () => ({
    type: ActionTypes.PAYMENT_LIST_PENDING
})

export const paymentListError = (error) => ({
    type: ActionTypes.PAYMENT_LIST_ERROR,
    error: error
})

export const paymentListSuccess = (data) => ({
    type: ActionTypes.PAYMENT_LIST_SUCCESS,
    data: data
})