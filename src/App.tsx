import { Provider } from 'react-redux'

import CoreApp from './CoreApp'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <CoreApp />
    </Provider>
  )
}

export default App
