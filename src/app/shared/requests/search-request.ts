export class ValueCompare {
  public value: string;
  public compare: string;
}

// export interface SearchRequest {
//   limit: number;
//   page: number;
//   sortField: string;
//   sortOrder: number;
//   searchValue: Record<string, ValueCompare>;
//   selectFields: string;
// }

export class SearchRequestWithGroupByAndInclude {
  limit: number;
  page: number;
  sortField: string;
  sortOrder: number;
  searchValue: Map<string, ValueCompare>;
  selectFields: string;
  includes: string[];
  groupBys: string[];

  constructor(limit: number,
    page: number,
    sortField: string,
    sortOrder: number,
    searchValue: Map<string, ValueCompare>,
    selectFields: string,
    includes: string[],
    groupBys: string[],
  ) {
    this.limit = limit;
    this.page = page;
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.searchValue = searchValue;
    this.selectFields = selectFields;
    this.includes = includes;
    this.groupBys = groupBys
  }

  //1: descending
  //0: ascending
  public getParamsString(): string {
    var includeString ="";
    if (this.includes != null) {
      for (let i = 0; i < this.includes.length; i++) {
        includeString += "&Includes[" + i + "]=" + this.includes[i];
      }
    }
    var groupBysString ="";
    if (this.groupBys != null) {
      for (let i = 0; i < this.includes.length; i++) {
        groupBysString += "&GroupBys[" + i + "]=" + this.groupBys[i];
      }
    }

    return "Limit=" + this.limit + "&Page=" + this.page + "&SortField=" +
      this.sortField + "&SortOrder=" + this.sortOrder + "&SelectFields=" + this.selectFields + includeString + groupBysString + this.getSearchValueString();
  }

  private getSearchValueString(): string {
    let result = '';
    if (this.searchValue == null) {
      return '';
    }
    this.searchValue.forEach((value: ValueCompare, key: string) => {
      if (this.searchValue.get(key) != null) {
        if (this.searchValue.get(key).value != null) {
          if (result == '') {
            result = "&SearchValue[" + key + "].value=" + this.searchValue.get(key).value +
              "&SearchValue[" + key + "].compare=" + this.searchValue.get(key).compare;
          } else {
            result = result + "&SearchValue[" + key + "].value=" + this.searchValue.get(key).value +
              "&SearchValue[" + key + "].compare=" + this.searchValue.get(key).compare;
          }
        }

      }
    });
    console.log(result);
    return result;
  }
}

export class SearchRequest {
  limit: number;
  page: number;
  sortField: string;
  sortOrder: number;
  searchValue: Map<string, ValueCompare>;
  selectFields: string;

  constructor(limit: number,
    page: number,
    sortField: string,
    sortOrder: number,
    searchValue: Map<string, ValueCompare>,
    selectFields: string,

  ) {
    this.limit = limit;
    this.page = page;
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.searchValue = searchValue;
    this.selectFields = selectFields;
  }

  //1: descending
  //0: ascending
  public getParamsString(): string {

    return "Limit=" + this.limit + "&Page=" + this.page + "&SortField=" +
      this.sortField + "&SortOrder=" + this.sortOrder + "&SelectFields=" + this.selectFields + this.getSearchValueString();
  }

  private getSearchValueString(): string {
    let result = '';
    if (this.searchValue == null) {
      return '';
    }
    this.searchValue.forEach((value: ValueCompare, key: string) => {
      if (this.searchValue.get(key) != null) {
        if (this.searchValue.get(key).value != null) {
          if (result == '') {
            result = "&SearchValue[" + key + "].value=" + this.searchValue.get(key).value +
              "&SearchValue[" + key + "].compare=" + this.searchValue.get(key).compare;
          } else {
            result = result + "&SearchValue[" + key + "].value=" + this.searchValue.get(key).value +
              "&SearchValue[" + key + "].compare=" + this.searchValue.get(key).compare;
          }
        }

      }
    });
    console.log(result);
    return result;
  }

}