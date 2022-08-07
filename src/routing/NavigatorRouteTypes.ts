import { Doctor } from "../serverResponses";

export type NavigatorRouteTypes = {
    login: undefined;
    splash: undefined;
    register: undefined;
    homeScreen: undefined;
    doctorSubCategories: {
        id: number;
        type: number;
        category_name: string;
    };
    doctorList: {
        id: number;
        type: number;
    };
    doctorDetail: {
        doctor: Doctor;
    },
    appointmentDetail: {

    },
    doctorMap: {
        categories: any,
    }
};