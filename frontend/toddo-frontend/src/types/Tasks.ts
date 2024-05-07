export interface ITaskResponse {
    tasks?: ITask[];
}

export interface ITask {
    _id?:         string;
    description?: string;
    status?:      string;
    createdDate?: Date;
    updatedDate?: Date;
    __v?:         number;
}
