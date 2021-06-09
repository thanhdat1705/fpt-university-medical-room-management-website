import { NumericLiteral } from "typescript"

export class showError{
    public showRequiredError(fieldName: string){
        return fieldName + " không được trống"
    }

    public showMinMaxLengthError(fieldName: string, minLength: number, maxLength: number){
        return fieldName + " có độ dài từ " + minLength + " đến " + maxLength + " kí tự"
    }
}