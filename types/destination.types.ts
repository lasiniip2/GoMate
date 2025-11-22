export interface Destination {
  id: string;
  name: string;
  category: 'landmark' | 'museum' | 'religious' | 'nature' | 'beach' | 'city' | 'adventure';
  description: string;
  longDescription?: string;
  image: string;
  latitude: number;
  longitude: number;
  rating: number;
  popular: boolean;
  entryFee?: string;
  openingHours?: string;
  bestTimeToVisit?: string;
  facilities?: string[];
  activities?: string[];
  routes?: string[];
}

export interface DestinationsResponse {
  destinations: Destination[];
}
