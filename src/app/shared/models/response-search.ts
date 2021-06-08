export interface ResponseSearch {
    data: [];
    info: Info;
    
}
export interface Info{
    limit: number;
    page: number;
    totalRecord: number;
}