export interface FytaGarden {
  id: number;
  garden_name: string;
  origin_path: string | null;
  thumb_path: string | null;
  mac_address: string | null;
}

export interface FytaSensor {
  id: string;
  has_sensor: boolean;
  status: number;
  uuid_android: string | null;
  uuid_ios: string | null;
  version: string;
  is_battery_low: boolean;
  received_data_at: string;
}

export interface FytaHub {
  id: number;
  hub_id: string;
  status: number;
  received_data_at: string;
  reached_hub_at: string;
}

export interface FytaPlant {
  id: number;
  nickname: string;
  scientific_name: string;
  status: number;
  plant_id: number;
  family_id: number | null;
  wifi_status: number | null;
  thumb_path: string | null;
  origin_path: string | null;
  plant_thumb_path: string | null;
  plant_origin_path: string | null;
  received_data_at: string;
  temperature_optimal_hours: number;
  light_optimal_hours: number;
  temperature_status: number;
  light_status: number;
  moisture_status: number;
  salinity_status: number;
  garden: { id: number };
  sensor: FytaSensor;
  hub: FytaHub;
}

export interface FytaUserPlantsResponse {
  gardens: FytaGarden[];
  plants: FytaPlant[];
}
