export interface TSchedule {
  address: string;
  dates: string;
  place: string;
}

export interface TPhysicalExhibition {
  title: string;
  description: string;
  schedules: TSchedule[];
}
