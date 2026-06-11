import { useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";
import ScreensPage from "../ScreensPage/ScreensPage";
import css from "./HomePage.module.css";

const HomePage = () => {
  const { boardId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={css.layout}>
      {isSidebarOpen && (
        <div
          className={css.backdrop}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`${css.sidebar} ${isSidebarOpen ? css.sidebarOpen : ""}`}
      >
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </aside>

      <div className={css.content}>
        <Header onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className={css.main}>
          {boardId ? (
            <ScreensPage key={boardId} />
          ) : (
            <p className={css.placeholder}>
              Select or create a board to get started.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
