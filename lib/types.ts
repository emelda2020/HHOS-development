export type Observation = {
  id: string;
  observation_type: string;
  value_numeric: number | null;
  value_text: string | null;
  unit: string | null;
  observed_at: string;
  source_type: string;
  source_name: string | null;
  status: string;
};

export type DeviceConnection = {
  id: string;
  connection_name: string;
  connection_type: string;
  provider_name: string | null;
  connection_status: string;
  last_synced_at: string | null;
};

export type TimelineEvent = {
  id: string;
  event_type: string;
  title: string;
  description: string | null;
  event_at: string;
  source_type: string;
  source_name: string | null;
};

export type CarePlanItem = {
  id: string;
  title: string;
  description: string | null;
  item_status: string;
  due_at: string | null;
  created_by_type: string;
};
