
export interface ResultResponse {
    result: any,
    message: string,
    status: Number,
}

export interface Doctor {
    profile_image: string,
    doctor_name: string,
    specialist: string,
    overall_rating: number;
};

export interface Category {
    id: number;
    category_name: string;
    category_image: string;
}

export interface Symptom {
    id: number;
    service_image: string;
    service_name: string;
}

export interface Banner {
    url: string;
    status: number;
}

export interface HomeDetailsResponse {
    result: {
        banners: Banner[],
        category: Category[],
        symptoms_first: Symptom[],
        symptoms_second: Symptom[],
        doctors: Doctor[];
    };
}