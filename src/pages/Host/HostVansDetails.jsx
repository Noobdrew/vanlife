import { useContext } from "react";
import { Outlet, useParams, Link, useOutletContext } from "react-router-dom";
import { VanApiContext } from "../../App";
import Comments from "../../components/Comments";
import { removeCommentAt, toggleCommentVisibility } from "../../api";

export default function HostVansDetails() {
  const { currentUser } = useContext(VanApiContext);

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

  return (
    <>
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

        <div className="host-comments"> {commentElements}</div>
      </div>
    </>
  );
}
