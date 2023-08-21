import { useContext, useEffect, useState } from "react";
import {
  Outlet,
  useParams,
  NavLink,
  Link,
  useOutletContext,
} from "react-router-dom";
import { VanApiContext } from "../../App";
import Comments from "../../components/Comments";
import { removeCommentAt, removeVan, toggleCommentVisibility } from "../../api";
import ConfirmPopup from "../../components/ConfirmPopup";

export default function HostVansDetails() {
  const { currentUser } = useContext(VanApiContext);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const hostId = currentUser.uid;
  const params = useParams();
  const [hostVansData, error] = useOutletContext();
  const vanDetail = hostVansData?.find((item) => item.id == params.id);

  if (error?.message) return <h1>There was an error: {error.message}</h1>;

  if (vanDetail?.hostId != hostId) {
    return <h1>Van not found in current user's vans!</h1>;
  }

  async function deleteComment(index, vanId) {
    try {
      await removeCommentAt(index, vanId);
    } catch (err) {
      console.log(err);
    }
  }

  async function hideComment(index, vanId) {
    try {
      await toggleCommentVisibility(index, vanId);
    } catch (err) {
      console.log(err);
    }
  }

  const commentElements = vanDetail.comments.map((item, index) => {
    return (
      <div key={index} className="">
        <Comments comment={item} />
        <button
          className="comment-hide"
          onClick={(e) => hideComment(index, vanDetail.id)}
        >
          {item.visible ? "Hide" : "Show"}
        </button>
        <button
          className="comment-delete"
          onClick={(e) => deleteComment(index, vanDetail.id)}
        >
          Delete
        </button>
      </div>
    );
  });

  function deleteVan() {
    try {
      removeVan(vanDetail.id);
    } catch (err) {
      console.log(err);
    }
  }

  function confirmDelete() {
    setConfirmPopupOpen(true);
  }

  return (
    <>
      {confirmPopupOpen && (
        <ConfirmPopup
          callback={deleteVan}
          confirmPopupOpen={confirmPopupOpen}
          setConfirmPopupOpen={setConfirmPopupOpen}
        >
          Are you shure you want to delete {vanDetail.name}?
        </ConfirmPopup>
      )}
      <Link relative="path" to=".." className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-details-container">
        <img
          src={vanDetail.imageUrl}
          alt="van"
          className="host-van-details-img"
        />

        <div className="host-van-details-text">
          <div className={`van-type ${vanDetail.type} host-details`}>
            {vanDetail.type[0].toUpperCase() + vanDetail.type.slice(1)}
          </div>
          <h3 className="host-van-details-name">{vanDetail.name}</h3>
          <p className="host-van-details-price">
            <strong>${vanDetail.price}</strong>/day
          </p>
        </div>

        <Outlet context={{ vanDetail }} />
        <button
          className="confirm-button big delete-van"
          onClick={confirmDelete}
        >
          Delete Van
        </button>
        <div className="host-comments"> {commentElements}</div>
      </div>
    </>
  );
}
