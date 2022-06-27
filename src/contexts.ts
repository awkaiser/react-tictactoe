import React from 'react';

import type { Dispatch } from 'react';

export const TicTacToeStore = React.createContext<
  Dispatch<{
    type: string;
    x: number;
    y: number;
  }>
>(() => ({}));
