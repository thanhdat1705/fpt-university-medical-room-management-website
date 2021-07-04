export class HeaderExcel {
    header: string;
    key: string;

    constructor(header: string, key: string) {
        this.header = header;
        this.key = key;
    }
}

export interface Header {
    headerName: string;
    key: string;
}