export interface ProductsDetailsResponse {
  data: ProductDetails;
}

export interface ProductDetails {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;

  _id: string;
  id: string;

  title: string;
  slug: string;
  description: string;

  quantity: number;
  price: number;

  imageCover: string;

  category: Category;
  brand: Brand;

  ratingsAverage: number;

  createdAt: string;
  updatedAt: string;

  __v: number;

  reviews: Review[];
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
}