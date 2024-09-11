
export interface Book {
  id: string;
  volumeInfo: { 
  title: string;
  authors: string[];
  imageLinks: {
    thumbnail?: string;
  }  
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
}
  saleInfo: {
  listPrice?: {
    amount?: number,
    currencyCode?: string,
  },
  retailPrice?: {
    amount?: number,
    currencyCode?: string,
  };

};
quantity: number;
};