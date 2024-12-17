import { Suspense, lazy } from "react";
import { lazily } from "react-lazily";
import { createBrowserRouter } from "react-router-dom";
import IconLoading from "@/components/Loading";
import NewsDetail from "@/components/DetailNews";
import CategoryTable from "@/components/CategoryTable";
import AuthLogin from "@/pages/user/Auth.Login";
import AdminLayout from "@/components/Sidebar/Layout";

const { Home, Gallery, Tuks, Berita, Partnership, Tentang, Skema, Kontak } =
  lazily(() => import("@/pages/user"));
  const AdminSkema = lazy(() => import("@/pages/admin/AdminSkema"));
  const AdminGalery = lazy(() => import("@/pages/admin/AdminGalery"));
  const AdminBerita = lazy(() => import("@/pages/admin/AdminBerita"));

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
// admin route
{
  path: "/admin", // Corrected path
  element: <AdminLayout />,
  children: [
    {
      path: "skema", // Removed leading slash
      element: (
        <Suspense fallback={<IconLoading />}>
          <AdminSkema />
        </Suspense>
      ),
    },
    {
      path: "galeri", // Removed leading slash
      element: (
        <Suspense fallback={<IconLoading />}>
          <AdminGalery />
        </Suspense>
      ),
    },
    {
      path: "berita", // Removed leading slash
      element: (
        <Suspense fallback={<IconLoading />}>
          <AdminBerita />
        </Suspense>
      ),
    },
  ],
},

]);

export default router;
