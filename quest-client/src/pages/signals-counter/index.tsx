import { useEffect, useState } from 'react';
import Counter from './counter';
import { batch, computed, effect } from '@preact/signals-react';
import CountersProvider, { useCounterState } from './counter-provider';

export default function Index() {
  const { countersSignal, setCounters } = useCounterState();

  setCounters([
    {
      id: 1,
      value: 0,
    },
    {
      id: 2,
      value: 0,
    },
    {
      id: 3,
      value: 0,
    },
    {
      id: 4,
      value: 0,
    },
    {
      id: 5,
      value: 0,
    },
  ]);

  return (
    <CountersProvider>
      {countersSignal.value.map((x) => (
        <Counter key={x.id} counter={x.value}></Counter>
      ))}
    </CountersProvider>
  );
}
