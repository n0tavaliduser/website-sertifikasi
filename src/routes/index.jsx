import { Suspense } from "react";
import { lazily } from "react-lazily";
import { createBrowserRouter } from "react-router-dom";
import IconLoading from "@/components/Loading";
import NewsDetail from "@/components/DetailNews";
import CategoryTable from "@/components/CategoryTable";
import AuthLogin from "@/pages/user/Auth.Login";
import AuthRegister from "@/pages/user/Auth.Register";
import AppLayout from "@/layouts/app/AppLayout";
import PartnershipList from "@/pages/admin/partnership/PartnershipList";
import NewsList from "@/pages/admin/news/NewsList";
import EditNews from "@/pages/admin/news/EditNews";
import CreateNews from "@/pages/admin/news/CreateNews";
import TuksList from "@/pages/admin/tuks/TuksList";
import CreateTuks from "@/pages/admin/tuks/CreateTuks";
import EditTuks from "@/pages/admin/tuks/EditTuks";
import GalleryList from "@/pages/admin/gallery/GalleryList";
import InstanceList from "@/pages/admin/instance/InstanceList";
import SchemaList from "@/pages/admin/schema/SchemaList";
import SchemaUnitList from "@/pages/admin/schema/SchemaUnitList";
import Profile from "@/pages/app/user/Profile";
import AssessmentRegisterForm from "@/pages/user/assessment/AssessmentRegisterForm";
import AssessmentList from "@/pages/app/assessment/AssessmentList";
import EditAssessment from "@/pages/app/assessment/EditAssessment";
import CertificateList from "@/pages/app/certificate/CertificateList";
import AssignAssesseeCertificate from "@/pages/app/certificate/AssignAssesseeCertificate";
import UserList from "@/pages/app/user/UserList";
import CreateUser from "@/pages/app/user/CreateUser";
import EditUser from "@/pages/app/user/EditUser";
import AssessorList from "@/pages/app/assossor/AssessorList";
import CreateAssessor from "@/pages/app/assossor/CreateAssessor";
import EditAssessor from "@/pages/app/assossor/EditAssessor";

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
    path: "/berita/:slug",
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
  {
    path: "/auth/register",
    element: (
      <Suspense fallback={<IconLoading />}>
        <AuthRegister />
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

    // profile
    {
      path: "profile",
      element: <Profile />,
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

    // gallery
    {
      path: "gallery",
      element: <GalleryList />,
    },

    // instance
    {
      path: "instance",
      element: <InstanceList />,
    },

    // schema
    {
      path: "schema",
      element: <SchemaList />,
    },
    {
      path: "schema/:schemaId/units",
      element: <SchemaUnitList />,
    },
  ],
},

// user route
{
  path: "/user",
  element: <AppLayout />,
  children: [
    {
      path: "assessment",
      element: <AssessmentRegisterForm />,
    },
  ],
},

// admin route
{
  path: "/app",
  element: <AppLayout />,
  children: [
    {
      path: "assessee",
      element: <AssessmentList />,
    },
    {
      path: "assessee/:id/edit",
      element: <EditAssessment />,
    },
    {
      path: "certificate",
      element: <CertificateList />,
    },
    {
      path: "certificate/assign/:id",
      element: <AssignAssesseeCertificate />,
    },
    {
      path: "users",
      element: <UserList />,
    },
    {
      path: "users/create",
      element: <CreateUser />,
    },
    {
      path: "users/:id/edit",
      element: <EditUser />,
    },
    {
      path: "assessor",
      element: <AssessorList />,
    },
    {
      path: "assessor/create",
      element: <CreateAssessor />,
    },
    {
      path: "assessor/:id/edit",
      element: <EditAssessor />,
    },
  ],
},
]);

export default router;
