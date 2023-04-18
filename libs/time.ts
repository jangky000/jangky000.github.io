import moment from 'moment';

export function getMoment(timestamp: number) {
  return moment(timestamp).zone('+09:00');
}

function getMomentNow() {
  return moment().zone('+09:00');
}

export function getStartOfToday() {
  return getMomentNow().startOf('day');
}
