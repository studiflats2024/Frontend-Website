export interface Apartment {
  apartment_ID: string;
  apartment_Name: string;
  apartment_Image: string;
  apartment_No_Bedrooms: number;
  apartment_Persons_No: number;
  apartment_Area_Square: number;
  apartment_Location: string;
  apartment_Lat: number;
  apartment_Long: number;
  apartment_Type: string;
  apartment_RentDesc: string | null;
  is_Wish: boolean;
  apartment_Price: number;
  amenities: string[];
  reviews: number;
  rating: number;
}
