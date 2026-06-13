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
import css from "./ScreensPage.module.css";

const ScreensPage = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(selectCurrentBoard);
  const isLoading = useSelector(selectCurrentBoardLoading);
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchBoardById(boardId));
    return () => {
      dispatch(clearCurrentBoard());
    };
  }, [dispatch, boardId]);

  if (isLoading || !board) {
    return <Loader />;
  }

  return (
    <div className={`${css.page} ${board.background ?? ""}`}>
      <HeaderDashboard
        board={board}
        dateFilter={dateFilter}
        onFilterChange={setDateFilter}
      />
      <MainDashboard board={board} dateFilter={dateFilter} />
    </div>
  );
};

export default ScreensPage;
