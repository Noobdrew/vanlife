import { useContext, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import HostVanElement from "../../components/HostVanElement";
import { VanApiContext } from "../../App";
import { addNewVan } from "../../api";

export default function HostVans() {
  const [hostVans, setHostVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(VanApiContext);
  const [hostVansData, error] = useOutletContext();
  const navigate = useNavigate();
  const hostVanElements = hostVansData?.map((van) => {
    return (
      <Link
        key={van.id}
        className="host-van-element"
        to={`/host/vans/${van.id}`}
      >
        <HostVanElement
          img={van.imageUrl}
          name={van.name}
          price={van.price}
          type={van.type}
        />
      </Link>
    );
  });

  const addVanAndRedirect = async (newVanData) => {
    setLoading(true);
    try {
      const newVanDocRef = await addNewVan(newVanData);

      // Redirect to the new van's page using useNavigate
      navigate(`/host/vans/${newVanDocRef.id}`);
    } catch (error) {
      console.error("Error adding new van:", error);
      // Handle the error or redirect to an error page
    } finally {
      setLoading(false);
    }
  };

  const handleAddVanButtonClick = () => {
    // Example van data
    const newVanData = {
      comments: [],
      description: "New van description",
      hostId: currentUser.uid,
      imageUrl:
        "https://bigskycampers.co.uk/wp-content/uploads/2023/07/classic-VW-campervan-hire-Scotland-Flora-field-1.jpg",
      name: "New Van",
      price: 10,
      ratings: {},
      rented: [],
      type: "simple",
      visibility: "public",
      deletable: true,
    };

    // Call the function to add a new van and redirect to its page
    addVanAndRedirect(newVanData);
  };

  if (error?.message) return <h1>There was an error: {error.message}</h1>;
  if (loading)
    return (
      <div className="loader-conteiner">
        <h1>Creating New Van</h1>
        <span className="loader"></span>
      </div>
    );

  return (
    <>
      <h1 className="host-van-title host-title">Your listed vans</h1>
      <div className="host-van-container">
        {" "}
        {hostVansData?.length > 0 ? (
          hostVanElements
        ) : (
          <div>
            <h2>You have no vans!</h2>
          </div>
        )}
        <div className="new-van-outer">
          <div className="host-van-element new-van">
            <HostVanElement
              img={
                "https://bigskycampers.co.uk/wp-content/uploads/2023/07/classic-VW-campervan-hire-Scotland-Flora-field-1.jpg"
              }
              name={"Sample Van"}
              price={0}
              type={"simple"}
            />
          </div>
          <div className="add-new-van">
            <button
              className="confirm-button add-new-van-button"
              onClick={handleAddVanButtonClick}
            >
              Add New Van +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
