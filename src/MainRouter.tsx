import React, { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

const Testing = lazy(() => import('./containers/pages/Testing'))

const MainRouter = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Testing />
      </BrowserRouter>
    </Suspense>
  )
}

export default MainRouter
