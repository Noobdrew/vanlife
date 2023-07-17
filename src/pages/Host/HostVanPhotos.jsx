import { useOutletContext } from "react-router-dom";
export default function HostVanPhotos() {
  const { vanDetail } = useOutletContext();
  return (
    <div className="host-van-details-content">
      <img src={vanDetail.imageUrl} alt="van" width="120px" />
    </div>
  );
}
