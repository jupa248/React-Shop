export type Items = {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  isWished: boolean;
};

export type ListItems = {
  id: string;
  image: string;
  title: string;
  price: number;
  isWished: boolean;
  category: string;
};

export type BtnPropsType = {
  quantity: number | string;
  title: string;
  onClick: () => void;
  classes: string;
  classIcon: string;
  action: string;
};

export type CartItems = {
  id: string;
  items: Items[];
  image: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  totalQuantity: number;
  changed: boolean;
};

export type WishItems = {
  id: string;
  items: Items[];
  image: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  totalQuantity: number;
  changed: boolean;
  isWished: boolean;
};

export type Notif = {
  status: string;
  title: string;
  message: string;
};

export type ShortCartItem = {
  items: Items[];
  totalQuantity: number;
};

export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};
