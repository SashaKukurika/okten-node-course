export interface IMessage {
  message: string;
}

export interface ICommonResponse<T> extends IMessage {
  data: T;
}

export interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  itemsFound: number;

  data: T[];
}

export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string;
}
