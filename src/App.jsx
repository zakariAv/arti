import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadWebsite from "./components/LoadWebsite";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import RootLayout from "./pages/root/RootLayout";
import Home from "./pages/root/Home";
import Register from "./pages/root/Register";
import Login from "./pages/root/Login";
import PublicArticles from "./pages/root/PublicArticles";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./pages/loggedIn/AuthLayout";
import { ThemeProvider } from "./context/ThemeProvider";
import Dashboard from "./pages/loggedIn/Dashboard";
import RequireAuth from "./auth/RequireAuth";
import Unauthorized from "./pages/loggedIn/shared/Unauthorized";
import PersistLogin from "./auth/PersistLogin";
import NotFound from "./pages/root/NotFound";

import ProfilePage from "./pages/loggedIn/shared/ProfilePage";
import UsersPage from "./pages/loggedIn/features/users/UsersPage";
import SingleUserPage from "./pages/loggedIn/features/users/SingleUserPage";
import CategoriesPage from "./pages/loggedIn/features/categories/CategoriesPage";
import AddArticle from "./pages/loggedIn/features/articles/AddArticle";
import ArticlesPage from "./pages/loggedIn/features/articles/ArticlesPage";
import SingleArticlePage from "./pages/loggedIn/features/articles/SingleArticlePage";
import SavedArticlesList from "./pages/loggedIn/features/articles/SavedArticlesList";
import { useEffect, useState } from "react";
import SearchArticlesPage from "./pages/loggedIn/features/articles/SearchArticlesPage";
import ReportsPage from "./pages/loggedIn/features/ReportsPage";

const queryClient = new QueryClient();
// Fc
const App = () => {


  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // adjust the timeout to your liking
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadWebsite />
  }

  const ROLES_LIST = {
    Super: 6000,
    Admin: 5150,
    Editor: 1984,
    User: 2001
  }


  return (
    <main className="App">
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              {/* public routes  */}
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="public-articles" element={<PublicArticles />} />
              </Route>
              {/* end public routes  */}

              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Super, ROLES_LIST.Editor, ROLES_LIST.User]} />}>
                  {/* all roles paSSED route  */}
                  <Route path="/main" element={<AuthLayout />}>
                    {/* admin routes  */}
                    <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Super, ROLES_LIST.Admin]} />}>
                      <Route index element={<Dashboard />} />
                      <Route path="users">
                        <Route index element={<UsersPage />} />
                      </Route>
                    </Route>
                    {/* end admin routes  */}
                    {/* editor admin routes  */}
                    <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Super, ROLES_LIST.Admin, ROLES_LIST.Editor]} />}>
                      <Route path="categories">
                        <Route index element={<CategoriesPage />} />
                      </Route>
                    </Route>
                    {/* end editor roles  */}
                    {/* admin editor user routes  */}
                    <Route path="member/:id" element={<SingleUserPage />} />

                    <Route path="articles">
                      <Route index element={<ArticlesPage />} />
                      <Route path=":id" element={<SingleArticlePage />} />
                      <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Super, ROLES_LIST.Admin, ROLES_LIST.Editor]} />}>
                        <Route path='add-article' element={<AddArticle />} />
                        <Route path="reports" element={<ReportsPage />} />
                      </Route>
                      <Route path='search' element={<SearchArticlesPage />} />
                      <Route path="saved-articles" element={<SavedArticlesList />} />
                    </Route>

                    <Route path="profile" element={<ProfilePage />} />
                  </Route>
                  {/* end of all roles passed here  */}
                </Route>

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              {/* end  */}
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </main>
  );
};

export default App;
