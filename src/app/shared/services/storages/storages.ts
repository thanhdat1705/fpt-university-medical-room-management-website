import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeneralStorage{
    public storage: Map<string,object> = new Map<string,object>();
    constructor(){
        console.log(this.storage);
    }
    
    
}