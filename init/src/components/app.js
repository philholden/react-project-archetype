// @flow

import React from 'react'
import Counter from './counter'
import Fetcher from './fetcher'
import { getGreeting } from '../api'
import man from '../../img/man.png'

export const HelloWorld = () => <div>Hello World.</div>
export const NotUsed = () => <div>Not Used.</div>

const App = () => (
  <div>
    <Counter increment={5} color="red" />
    <Counter increment={5} />
    <HelloWorld />
    <img src={man} alt="man" />
    <Fetcher getGreeting={getGreeting} />
  </div>
)

export default App
