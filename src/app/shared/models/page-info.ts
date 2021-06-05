import { Info } from './response-search';

export interface PageInfo {
    isFirstPage: boolean;
    isLastPage: boolean;
    numberOfPage: number;
    info: Info;
}
