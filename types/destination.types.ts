export interface Destination {
  id: string;
  name: string;
  category: 'landmark' | 'museum' | 'religious' | 'nature' | 'beach' | 'city';
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  rating: number;
  popular: boolean;
}

export interface DestinationsResponse {
  destinations: Destination[];
}
