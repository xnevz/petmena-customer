import { Doctor } from "../serverResponses/doctors";

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
    doctorList: undefined;
    doctorDetail: {
        doctor: Doctor;
    },
    appointmentDetail: {

    },
    doctorMap: {
        categories: any,
    }
};