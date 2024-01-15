import { computed } from '@preact/signals-react';
import { useCounterState } from './counter-provider';

export default function CounterNestedChild() {
  const { countersSignal: counters } = useCounterState();

  return <div></div>;
}
