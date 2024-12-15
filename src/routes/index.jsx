import { Suspense } from "react";
import { lazily } from "react-lazily";
import { createBrowserRouter } from "react-router-dom";
import IconLoading from "@/components/Loading";
import NewsDetail from "@/components/DetailNews";
import CategoryTable from "@/components/CategoryTable";
import AuthLogin from "@/pages/user/Auth.Login";

const { Home, Gallery, Tuks, Berita, Partnership, Tentang, Skema, Kontak } =
  lazily(() => import("@/pages/user"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<IconLoading />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/galeri",
    element: (
      <Suspense fallback={<IconLoading />}>
        <Gallery />
      </Suspense>
    ),
  },
  {
    path: "/tuks",
    element: (
      <Suspense fallback={<IconLoading />}>
        <Tuks />
      </Suspense>
    ),
  },
  {
    path: "/berita",
    element: (
      <Suspense fallback={<IconLoading />}>
        <Berita />
      </Suspense>
    ),
  },
  {
    path: "/berita/:id",
    element: (
      <Suspense fallback={<IconLoading />}>
        <NewsDetail />
      </Suspense>
    ),
  },
  {
    path: "/partnership",
    element: (
      <Suspense fallback={<IconLoading />}>
        <Partnership />
      </Suspense>
    ),
  },
  {
    path: "/tentang",
    element: (
      <Suspense fallback={<IconLoading />}>
        <Tentang />
      </Suspense>
    ),
  },
  {
    path: "/skema",
    element: (
      <Suspense fallback={<IconLoading />}>
        <Skema />
      </Suspense>
    ),
  },
  {
    path: "/category/:category",
    element: <CategoryTable />,
  },
  {
    path: "/kontak",
    element: (
      <Suspense fallback={<IconLoading />}>
        <Kontak />
      </Suspense>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <Suspense fallback={<IconLoading />}>
        <AuthLogin />
      </Suspense>
    ),
  },
]);

export default router;
