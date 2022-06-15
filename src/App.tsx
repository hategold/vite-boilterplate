import { Provider } from 'react-redux'

import MainRouter from './MainRouter'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  )
}

export default App
