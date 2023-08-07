export default function Comments({ currentVan }) {
  console.log(currentVan.comments);
  return (
    <div className="comments-outer">
      <h3>Post a comment:</h3>
      <form action="">
        <textarea name="post-comment" id="post-comment"></textarea>
      </form>
      <h3>Comments:</h3>
      <div className="comments-inner"></div>
    </div>
  );
}
