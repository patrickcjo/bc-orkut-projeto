import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { HomeRoute } from "./routes/HomeRoute";
import { CreatePostRoute } from "./routes/CreatepostRoute";
import { ViewPostRoute } from "./routes/ViewPostRoute";
import { NotFoundPage } from "./routes/NotFoundPage";
import { Footer } from "./components/FooterComponent";
import { EditPostRoute } from "./routes/EditPostRoute";
import { PostPageRoute } from "./routes/PostPageRoute";
import { ProfileRoute } from "./routes/ProfileRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/create-post" element={<CreatePostRoute />} />
          <Route path="/view-post/:id" element={<ViewPostRoute />} />
          <Route path="/edit-post/:id" element={<EditPostRoute />} />
          <Route path="/not-found-page" element={<NotFoundPage />} />
          <Route path="/posts/:page" element={<PostPageRoute />} />
          <Route path="/perfil/:id" element={<ProfileRoute />} />
        </Routes>
        <Footer
          className={"flex justify-end items-center gap-2  bg-[#67757c]"}
        />
      </div>
    </BrowserRouter>
  );
}
