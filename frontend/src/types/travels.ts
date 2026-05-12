export interface Place {
  id: number;
  name: string;
  country: string;
  lat: number;
  lng: number;
  type: 'lived' | 'visited';
  note: string;
}

export interface TravelsResponse {
  places: Place[];
}
