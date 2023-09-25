interface GaugeDataEntry {
  status: string;
  color: string;
  ids: Array<string>;
}

type GaugeData = Array<GaugeDataEntry>;

export { GaugeData, GaugeDataEntry };
