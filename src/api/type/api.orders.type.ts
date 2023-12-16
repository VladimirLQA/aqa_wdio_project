export interface IApiOrdersRequest {
  _id?: string;
  customer: string;
  products: string[];
}

export interface IApiCommentRequest {
  comments: {
    text: string;
  };
  _id: string;
}
