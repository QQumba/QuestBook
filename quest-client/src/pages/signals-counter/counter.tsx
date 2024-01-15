import React from 'react';
import { Counter } from './counter.model';
import { useCounterState } from './counter-provider';

export default function Counter({ counter }: any) {
  const { increment } = useCounterState();

  return (
    <div className="border p-2 m-2">
      <div>{counter}</div>
      <button onClick={() => increment(counter.id)}>Increment</button>
    </div>
  );
}
