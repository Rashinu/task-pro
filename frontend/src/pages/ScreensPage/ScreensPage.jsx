import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HeaderDashboard } from "../../components/HeaderDashboard/HeaderDashboard";
import { MainDashboard } from "../../components/MainDashboard/MainDashboard";
import { Loader } from "../../components/Loader/Loader";
import { fetchBoardById } from "../../redux/boards/boardsOperations";
import {
  selectCurrentBoard,
  selectCurrentBoardLoading,
} from "../../redux/boards/boardsSelectors";
import { clearCurrentBoard } from "../../redux/boards/boardsSlice";
import { BOARD_BACKGROUND_IMAGES } from "../../constants/boardBackgrounds";
import css from "./ScreensPage.module.css";

const ScreensPage = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(selectCurrentBoard);
  const isLoading = useSelector(selectCurrentBoardLoading);
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchBoardById(boardId));
    return () => {
      dispatch(clearCurrentBoard());
    };
  }, [dispatch, boardId]);

  if (isLoading || !board) {
    return <Loader />;
  }

  const backgroundImage = BOARD_BACKGROUND_IMAGES[board.background];

  return (
    <div
      className={`${css.page} ${backgroundImage ? css.hasBackground : ""}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${backgroundImage})`,
            }
          : undefined
      }
    >
      <HeaderDashboard
        board={board}
        priorityFilter={priorityFilter}
        onFilterChange={setPriorityFilter}
      />
      <MainDashboard board={board} priorityFilter={priorityFilter} />
    </div>
  );
};

export default ScreensPage;
