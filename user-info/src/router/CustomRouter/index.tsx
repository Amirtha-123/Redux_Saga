import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "../../utils/constants/router.constants";
import PageNotFound from "../../components/Shared/PageNotFound";
const ListPage = lazy(() => import("../../pages/ListPage"));
const EditPage = lazy(() => import("../../pages/EditPage"));
const CreatePage = lazy(() => import("../../pages/CreatePage"));

const CustomRouter = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <h2>Loading...</h2>
          </div>
        }
      >
        <Routes>
          <Route path={ROUTERS.landing} element={<ListPage />} />
          <Route path={ROUTERS.home} element={<ListPage />} />
          <Route path={ROUTERS.create} element={<CreatePage />} />
          <Route path={ROUTERS.edit} element={<EditPage />} />
          <Route path={ROUTERS.pageNotFound} element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default CustomRouter;
