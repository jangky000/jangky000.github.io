import moment from 'moment';
import { runOnClientOnly } from './window';

const EXPERIMENTAL_VISIT = 'experimental_visit';
const INITIAL_COUNT = 1;

interface ExperimentalVisit {
  nextCount: number;
  timestamp: number;
}

function saveVisitCount(nextCount: number) {
  const visitLab = {
    nextCount,
    timestamp: moment().startOf('day').valueOf(),
  };
  runOnClientOnly(() =>
    localStorage.setItem(EXPERIMENTAL_VISIT, JSON.stringify(visitLab)),
  );
}

function isVisitLab(rawVisitLab: unknown): rawVisitLab is ExperimentalVisit {
  if (!rawVisitLab || typeof rawVisitLab !== 'object') return false;
  if (!('nextCount' in rawVisitLab && 'timestamp' in rawVisitLab)) return false;
  if (
    typeof (rawVisitLab as ExperimentalVisit).nextCount === 'number' &&
    typeof (rawVisitLab as ExperimentalVisit).timestamp === 'number'
  ) {
    return true;
  }
  return false;
}

function isExpired(visitLab: ExperimentalVisit): boolean {
  const diffDay = moment(visitLab.timestamp).diff(
    moment().startOf('day'),
    'day',
  );
  return diffDay > 1;
}

export function readVisitCount() {
  const item = runOnClientOnly(() => localStorage.getItem(EXPERIMENTAL_VISIT));
  if (!item) return INITIAL_COUNT;
  const visitLab = JSON.parse(item);
  if (!isVisitLab(visitLab)) return INITIAL_COUNT;
  if (isExpired(visitLab)) return INITIAL_COUNT;
  return visitLab.nextCount;
}

export function readAndUpdateVisitCount() {
  const visitCount = readVisitCount();
  saveVisitCount(visitCount + 1);
  return visitCount;
}

export function canVisitPopup(visitCount: number) {
  console.log('visitCount', visitCount);
  return visitCount % 5 === 0;
}
