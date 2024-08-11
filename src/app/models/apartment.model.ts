// export interface Apartment {
//   apartment_ID: string;
//   apartment_Name: string;
//   apartment_Image: string;
//   apartment_No_Bedrooms: number;
//   apartment_Persons_No: number;
//   apartment_Area_Square: number;
//   apartment_Location: string;
//   apartment_Lat: number;
//   apartment_Long: number;
//   apartment_Type: string;
//   apartment_RentDesc: string | null;
//   is_Wish: boolean;
//   apartment_Price: number;
//   amenities: string[];
//   reviews: number;
//   rating: number;
//   status: string;
// }

export interface Apartment {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: Array<{
    apartment_ID: string;
    apartment_Name: string;
    apartment_Image: string;
    apartment_No_Bedrooms: number;
    apartment_Persons_No: number;
    available_Beds: number;
    apartment_Area_Square: number;
    apartment_Location: string;
    apartment_Lat: number;
    apartment_Long: number;
    apartment_Type: string;
    apartment_RentDesc: string;
    is_Wish: boolean;
    apartment_Price: number;
    apartment_RentBy_Bed: boolean;
    apartment_SharedType: string;
    statusString: string;
  }>;
}

