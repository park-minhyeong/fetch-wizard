import  { Fragment, ComponentType } from 'react'
import useRoute from '../hooks/useRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading';
export default function App() {
  const routes = useRoute();
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component, layout }) => {
          return (
            <Route
              key={path}
              path={path}
              element={RenderComponent(component, layout)}
            />
          );
        })}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center w-full min-h-screen">
              <Loading />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function RenderComponent(
  Component: ComponentType<any>,
  Layout: ComponentType<any> | null
) {
  if (Layout) return <Layout children={<Component />} />;
  return <Fragment children={<Component />} />;
}
