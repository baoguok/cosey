import { withInstall } from '../utils';
import WeekRangePicker from './week-range-picker';

export * from './week-range-picker';

const _WeekRangePicker = withInstall(WeekRangePicker);

export { _WeekRangePicker as WeekRangePicker };
export default _WeekRangePicker;
