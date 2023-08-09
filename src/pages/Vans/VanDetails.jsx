import { useContext, useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { VanApiContext } from "../../App";
import Ratings from "../../components/Ratings";
import Comments from "../../components/Comments";
import { getExcludedDates, postComment } from "../../api";
import RentVanPopup from "../../components/RentVanPopup";

export default function VanDetails() {
  const params = useParams();
  const [commentBody, setCommentBody] = useState("");
  const [commentObj, setCommentObj] = useState({});
  const [rentVanOpen, setRentVanOpen] = useState(false);

  const location = useLocation();

  const { vanData, currentUser, setPopupOpen, setPopupText } =
    useContext(VanApiContext);

  const currentVanArr = vanData.filter((item) => item.id == params.id);
  const currentVan = currentVanArr[0];
  const ratingsObj = currentVan.ratings;

  const commentElements = currentVan.comments.map((item, index) => {
    return <Comments key={index} comment={item} />;
  });

  useEffect(() => {
    const testDate = new Date();
    let month = testDate.getMonth() + 1;
    let day = testDate.getDate();
    let year = testDate.getFullYear();
    let newDate = `${day}/${month}/${year}`;

    setCommentObj({
      body: commentBody,
      name: currentUser?.displayName,
      uid: currentUser?.uid,
      imgUrl: currentUser?.photoURL,
      dateUTC: testDate.getTime(),
      dateFormated: newDate,
    });
  }, [commentBody]);

  function submitComment(e) {
    e.preventDefault();

    setPopupText("Comment added!");
    setPopupOpen(true);
    postComment(currentVan.id, commentObj);
  }
  const [excludedDates, setExcludedDates] = useState([]);

  useEffect(() => {
    async function fetchExcludedDates() {
      try {
        const datesArray = await getExcludedDates(currentVan.id); // Assuming getExcludedDates returns a promise
        setExcludedDates(datesArray);
      } catch (error) {
        console.error("Error fetching excluded dates:", error);
      }
    }

    fetchExcludedDates();
  }, [currentVan.id]);
  return (
    <div className="van-detail-container">
      {currentVan ? (
        <>
          {rentVanOpen && (
            <RentVanPopup
              currentVan={currentVan}
              setRentVanOpen={setRentVanOpen}
              excludedDates={excludedDates}
            />
          )}
          <Link
            relative="path"
            to={location.state?.search ? `..${location.state.search}` : ".."}
            className="back-button"
            style={{ margin: 0 }}
          >
            &larr; <span>Back to all vans</span>
          </Link>
          <div className="van-detail">
            <img src={currentVan.imageUrl} className="van-details-img" />
            <div className="van-details-text">
              <div className="van-details-title">
                <div className={`van-type ${currentVan.type} selected`}>
                  {currentVan.type[0].toUpperCase() + currentVan.type.slice(1)}
                </div>
                <div className="van-details-rating">
                  <Ratings ratingsObj={ratingsObj} currentVan={currentVan} />{" "}
                </div>
              </div>

              <h2>{currentVan.name}</h2>
              <p className="van-price">
                <span>${currentVan.price}</span>/day
              </p>
              <p className="van-description">{currentVan.description}</p>
              <div>
                <button
                  className="confirm-button big"
                  onClick={() => {
                    setRentVanOpen(true);
                  }}
                >
                  Rent this van
                </button>
              </div>

              <div className="comments-outer">
                <h3>Post a comment:</h3>
                <form action="" onSubmit={submitComment}>
                  <textarea
                    name="post-comment"
                    id="post-comment"
                    minLength={3}
                    maxLength={300}
                    required
                    onChange={(e) => setCommentBody(e.target.value)}
                    disabled={!currentUser}
                    placeholder={
                      !currentUser
                        ? "You must login to post a comment!"
                        : "Write your comment up to 300 characters."
                    }
                  ></textarea>
                  <button disabled={!currentUser}>Send</button>
                </form>

                {commentElements}
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>Van doesn't exist!</h2>
      )}
    </div>
  );
}
