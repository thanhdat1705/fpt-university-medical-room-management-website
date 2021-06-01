export interface Info{
    limit: number;
    page: number;
    totalRecord: number;
}

export interface ResponseSearch {
    data: [];
    info: Info;
    
}