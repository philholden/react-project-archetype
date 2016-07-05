// @flow

import React from 'react'
import Counter from './counter'
import man from '../../img/man.png'

export const HelloWorld = () => <div>Hello World.</div>
export const NotUsed = () => <div>Not Used.</div>

const App = () => (
  <div>
    <Counter increment={1} />
    <Counter increment={5} />
    <HelloWorld />
    <img src={man} alt="man" />
  </div>
)

export default App
