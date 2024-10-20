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
            (
              { path, component: Component, children, ...route }: any,
              idx: any
            ) =>
              children ? (
                <ReactRoute
                  key={`${index}-${idx}`}
                  path={path}
                  element={<Component />}
                  {...route}
                >
                  {children.map(
                    (
                      {
                        path: childPath,
                        component: ChildComponent,
                        ...childRoute
                      }: any,
                      childIdx: any
                    ) => (
                      <ReactRoute
                        key={`${index}-${idx}-${childIdx}`}
                        path={childPath}
                        element={<ChildComponent />}
                        {...childRoute}
                      />
                    )
                  )}
                </ReactRoute>
              ) : (
                <ReactRoute
                  key={`${index}-${idx}`}
                  path={path}
                  element={<Component />}
                  {...route}
                />
              )
          )}
        </ReactRoute>
      ))}
    </Routes>
  )
}

export default Route
