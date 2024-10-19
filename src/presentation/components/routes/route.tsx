import { Suspense } from 'react'
import { Route as ReactRoute, Routes } from 'react-router-dom'
import SimpleLoading from '../loadings/simple'

const Route = ({ data }: any) => {
  return (
    <Routes>
      {data.map(({ layout: Layout, data: item }: any, index: any) => (
        <ReactRoute
          key={index}
          element={
            <Suspense fallback={<SimpleLoading />}>
              <Layout />
            </Suspense>
          }
        >
          {item.map(
            ({ path, component: Component, ...route }: any, idx: any) => (
              <ReactRoute
                key={`${index}-${idx}`}
                path={path}
                element={<Component />}
                {...route}
                exact={route.exact || true}
              />
            )
          )}
        </ReactRoute>
      ))}
    </Routes>
  )
}

export default Route
