import './style.css'
import { setupTicTacToe } from './tictactoe.js'

// Mount the TicTacToe Classic main container into #app
const appDiv = document.querySelector('#app');
setupTicTacToe(appDiv);
