import userIcon from "../assets/user-circle.png";
export default function Comments({ comment }) {
  return (
    <>
      <hr />
      <div className="comments-inner">
        <img src={userIcon} alt="profile img" className="comment-img" />

        <h4 className="comment-name">{comment.name}</h4>
        <p className="comment-body">{comment.body}</p>

        <small className="comment-date">{comment.dateFormated}</small>
      </div>
    </>
  );
}
