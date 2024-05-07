export interface IProjectResponse {
    projects?: IProject[];
}

export interface IProject {
    _id?:         string;
    title?:       string;
    todos?:       any[];
    user?:        string;
    createdDate?: Date;
    __v?:         number;
}
