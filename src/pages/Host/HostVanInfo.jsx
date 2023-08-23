import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { removeVan, storeVanData } from "../../api";
import { VanApiContext } from "../../App";
import ConfirmPopup from "../../components/ConfirmPopup";

export default function HostVanInfo() {
  const { setPopupOpen, setPopupText } = useContext(VanApiContext);
  const { vanDetail, newVanData, setNewVanData } = useOutletContext();
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(vanDetail.name);
  const [img, setImg] = useState(vanDetail.imageUrl);
  const [price, setPrice] = useState(vanDetail.price);
  const [description, setDescription] = useState(vanDetail.description);
  const [type, setType] = useState(vanDetail.type);
  const [visibility, setVisibility] = useState(vanDetail.visibility);
  const [vanData, setVanData] = useState(vanDetail);

  useEffect(() => {
    if (vanData !== vanDetail) {
      setLoading(true);
      console.log(vanData);
      try {
        setPopupOpen(true);
        setPopupText("Van data updated!");
        storeVanData(vanDetail.id, vanData);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  }, [vanData]);

  function handleSubmit(e) {
    e.preventDefault();

    setVanData((prev) => {
      return {
        ...prev,
        name: name,
        description: description,
        type: type,
        visibility: visibility,
        price: price,
        imageUrl: img,
      };
    });
  }

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
      <div className="host-van-details-content">
        <form
          action=""
          className="host-van-details-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="van-name">Name: </label>
          <input
            type="text"
            id="van-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="van-price">Price: </label>
          <input
            type="number"
            name="price"
            id="van-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="van-type">Type:</label>
          <select
            name="van-type"
            id="van-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="simple">Simple</option>
            <option value="rugged">Rugged</option>
            <option value="luxury">Luxury</option>
          </select>
          <label htmlFor="van-description">Description: </label>
          <textarea
            type="text"
            id="van-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="van-img">Van Image: </label>
          <input
            type="text"
            id="van-img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <label htmlFor="visibility">Visibility: </label>
          <select
            name="visibility"
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <div className="host-button-holder">
            <button className="confirm-button big">Save changes</button>
            <button
              type="button"
              className="confirm-button big delete-van"
              onClick={confirmDelete}
            >
              Delete Van
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
