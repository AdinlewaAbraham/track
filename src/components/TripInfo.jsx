import { useState } from "react";
import { formattedDate } from "../../utils/formatDate";
const TextPair = ({ header, content }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}>
      <div
        style={{
          color: "#aaa",
          fontSize: 12,
          fontWeight: 700,
          width: 100,
          overflowWrap: "break-word",
        }}
      >
        {header}:
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          flex: 1,
          wordWrap: "break-word",
        }}
      >
        {content}
      </div>
    </div>
  );
};
const TripInfo = ({ trip }) => {
  // Use static trip data
  //   const { arrivalTime, currentLocation, driver, tripID } = trip;
  const [showModal, setShowModal] = useState(true);
  return showModal ? (
    <div className="trip-info">
      <div className="trip-info-header">
        <h2>Trip Info</h2>
        <div onClick={() => setShowModal(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.6665 29.5236V10.476C6.6665 9.46568 7.06786 8.49671 7.78229 7.78229C8.49671 7.06786 9.46568 6.6665 10.476 6.6665H29.5236C30.534 6.6665 31.503 7.06786 32.2174 7.78229C32.9318 8.49671 33.3332 9.46568 33.3332 10.476V29.5236C33.3332 30.534 32.9318 31.503 32.2174 32.2174C31.503 32.9318 30.534 33.3332 29.5236 33.3332H10.476C9.46568 33.3332 8.49671 32.9318 7.78229 32.2174C7.06786 31.503 6.6665 30.534 6.6665 29.5236Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.5239 29.5236V10.476C29.5239 9.46568 29.1225 8.49671 28.4081 7.78229C27.6937 7.06786 26.7247 6.6665 25.7144 6.6665H29.5239C31.4286 6.6665 33.3334 8.37127 33.3334 10.476V29.5236C33.3334 31.6284 31.4286 33.3332 29.5239 33.3332H25.7144C26.7247 33.3332 27.6937 32.9318 28.4081 32.2174C29.1225 31.503 29.5239 30.534 29.5239 29.5236Z"
              fill="black"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.9999 25.7142L25.7142 19.9999M25.7142 19.9999L19.9999 14.2856M25.7142 19.9999H10.4761"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div style={{ padding: 8, }}>
        <TextPair header="Driver Name" content={trip.driverName} />
        <TextPair header="Receiver Mail" content={trip.receiverEmail} />
        <TextPair header="Receiver Mobile" content={trip.receiverMobile} />
        <TextPair header="From" content={trip.origin.address} />
        <TextPair header="To" content={trip.destination.address} />
        <TextPair header="Created At" content={formattedDate(trip.createdAt)} />
        <TextPair
          header="Started At"
          content={formattedDate(trip.started_at)}
        />
      </div>
    </div>
  ) : (
    <div onClick={() => setShowModal(true)} className="showModal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.6665 29.5236V10.476C6.6665 9.46568 7.06786 8.49671 7.78229 7.78229C8.49671 7.06786 9.46568 6.6665 10.476 6.6665H29.5236C30.534 6.6665 31.503 7.06786 32.2174 7.78229C32.9318 8.49671 33.3332 9.46568 33.3332 10.476V29.5236C33.3332 30.534 32.9318 31.503 32.2174 32.2174C31.503 32.9318 30.534 33.3332 29.5236 33.3332H10.476C9.46568 33.3332 8.49671 32.9318 7.78229 32.2174C7.06786 31.503 6.6665 30.534 6.6665 29.5236Z"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M29.5239 29.5236V10.476C29.5239 9.46568 29.1225 8.49671 28.4081 7.78229C27.6937 7.06786 26.7247 6.6665 25.7144 6.6665H29.5239C31.4286 6.6665 33.3334 8.37127 33.3334 10.476V29.5236C33.3334 31.6284 31.4286 33.3332 29.5239 33.3332H25.7144C26.7247 33.3332 27.6937 32.9318 28.4081 32.2174C29.1225 31.503 29.5239 30.534 29.5239 29.5236Z"
          fill="black"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.9999 25.7142L25.7142 19.9999M25.7142 19.9999L19.9999 14.2856M25.7142 19.9999H10.4761"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default TripInfo;
