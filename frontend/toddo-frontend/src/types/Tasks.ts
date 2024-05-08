export interface ITaskResponse {
    _id?:         string;
    title?:       string;
    todos?:       ITask[];
    user?:        string;
    createdDate?: Date;
    __v?:         number;
}

export interface ITask {
    _id?:         string;
    description?: string;
    status?:      string;
    createdDate?: Date;
    updatedDate?: Date;
    __v?:         number;
}
