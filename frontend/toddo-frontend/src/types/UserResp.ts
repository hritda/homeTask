export interface UserResp {
    user?: UserClass;
}

export interface UserClass {
    username?: string;
    email?:    string;
    projects?: any[];
    _id?:      string;
}