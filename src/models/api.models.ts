export class ApiResponse<CustomParam> {
	code: number;
	result: CustomParam;
	message: string;
}

export class signupResponse {
    username: String;
    firstname: String;
    lastname: String;
    phoneNo: String;
    emailId: String;
    password:String
}

export class feedResponse {
	createdAt: String;
    feedbody: String;
    image_url: String;
    isdeleted: Boolean;
    likes: Number;
    shares: Number
}



export class loginResponse {
	token: String;
}