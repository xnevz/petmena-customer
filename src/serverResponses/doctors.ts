export interface Doctor {
    profile_image: string;
    doctor_name: string;
    qualification: string;
    specialist: string;
    experience: number;
    overall_rating: number;
    phone_number: string;
};


export interface GetDoctorsResponse {
    result: {
        doctors: Doctor[]
    }
}
