import { Signal, signal } from '@preact/signals-react';
import { createContext, useContext, useMemo } from 'react';
import { Counter } from './counter.model';

// type CounterState = {
//   countersSignal: Signal<Counter[]>;
//   selectedCounterIdSignal: Signal<number>;
//   setCounters: (counters: Counter[]) => void;
//   increment: (id: number) => void;
// };

const counterState = createCounterState();
const CountersContext = createContext(counterState);

export function useCounterState() {
  return useContext(CountersContext);
}

export default function CountersProvider({ children }: any) {
  return (
    <CountersContext.Provider value={counterState}>
      {children}
    </CountersContext.Provider>
  );
}

function createCounterState() {
  const countersSignal = signal<Counter[]>([]);
  const selectedCounterIdSignal = signal(0);

  const setCounters = (counters: Counter[]) => {
    countersSignal.value = counters;

    console.log(countersSignal.value);
  };

  const increment = (id: number) => {
    console.log(countersSignal.value);
    countersSignal.value = countersSignal.value.map((x) => {
      if (x.id != id) {
        return x;
      }

      return { ...x, value: x.value++ };
    });
  };

  return { countersSignal, selectedCounterIdSignal, setCounters, increment };
}
