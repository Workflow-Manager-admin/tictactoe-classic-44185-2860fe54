#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-classic-44185-2860fe54/tic_tac_toe
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
 if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

