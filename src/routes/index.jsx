import { Suspense } from "react";
import { lazily } from "react-lazily";
import { createBrowserRouter } from "react-router-dom";
import IconLoading from "@/components/Loading";
import NewsDetail from "@/components/DetailNews";
import CategoryTable from "@/components/CategoryTable";
import AuthLogin from "@/pages/user/Auth.Login";
import AppLayout from "@/layouts/app/AppLayout";
import PartnershipList from "@/pages/admin/partnership/PartnershipList";
import NewsList from "@/pages/admin/news/NewsList";
import EditNews from "@/pages/admin/news/EditNews";
import CreateNews from "@/pages/admin/news/CreateNews";
import TuksList from "@/pages/admin/tuks/TuksList";
import CreateTuks from "@/pages/admin/tuks/CreateTuks";
import EditTuks from "@/pages/admin/tuks/EditTuks";

const { Home, Gallery, Tuks, Berita, Partnership, Tentang, Skema, Kontak } =
  lazily(() => import("@/pages/user"));
const { HomeDashboard } =
  lazily(() => import("@/pages/admin"));
 

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
    path: "/category/:id",
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
  element: <AppLayout />,
  children: [
    {
      path: "dashboard", // Removed leading slash
      element: (
        <Suspense fallback={<IconLoading />}>
          <HomeDashboard />
        </Suspense>
      ),
    },

    // partnership
    {
      path: "partnership",
      element: <PartnershipList />,
    },

    // news
    {
      path: "news",
      element: <NewsList />,
    },
    {
      path: "news/create",
      element: <CreateNews />,
    },
    {
      path: "news/:id/edit",
      element: <EditNews />,
    },

    // tuks
    {
      path: "tuks",
      element: <TuksList />,
    },
    {
      path: "tuks/create",
      element: <CreateTuks />,
    },
    {
      path: "tuks/:id/edit",
      element: <EditTuks />,
    },
  ],
},

]);

export default router;
