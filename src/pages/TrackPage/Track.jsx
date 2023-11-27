import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  OverlayView,
  OverlayViewF,
  Polyline,
} from "@react-google-maps/api";
import { API_BASE_URL } from "../../../constant";
import { useParams } from "react-router-dom";
import TripInfo from "../../components/TripInfo";
import "../../App.css";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import TRUCKSVG from "../../assets/truck_location.svg";

// Trip details including static information and route data
const CustomMarker = ({ lat, lng, label }) => (
  <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    {/* Your custom marker content */}
    <div
      style={{
        background: "red",
        color: "white",
        padding: "5px",
        borderRadius: "50%",
        textAlign: "center",
      }}
    >
      {label}
    </div>
  </div>
);

const Track = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [driverDirectionsResponse, setDriverDirectionsResponse] =
    useState(null);

  const [trip, setTrip] = useState(null);
  const [driverCurrentLocation, setDriverCurrentLocation] = useState(null);
  const [failedToFetch, setFailedToFetch] = useState(false);
  const { trip_id } = useParams();
  useEffect(() => {
    const getTrip = async () => {
      try {
        if (!trip_id) return;
        const response = await fetch(API_BASE_URL + "api/trip/" + trip_id, {
          method: "GET",
        });
        if (response.ok) {
          const trips = await response.json();
          console.log(trips);
          if (trips) {
            setTrip(trips[0]);
          } else {
            setFailedToFetch(true);
          }
        }
      } catch (error) {
        setFailedToFetch(true);
        console.error(error);
      }
    };
    console.log(trip?.destination?.location);
    console.log(trip?.origin?.location);

    getTrip();
  }, []);

  useEffect(() => {
    const getDriverLocation = async () => {
      console.log("getting driver");
      if (!trip_id) return;
      try {
        const docRef = doc(db, "driverLocation", trip_id);
        const data = await getDoc(docRef);
        console.log("this driver location " , data.data());
        if (data) setDriverCurrentLocation(data.data());
      } catch (error) {
        console.error(error);
        console.log(error);
      }
    };
    if (trip_id) getDriverLocation();
  }, []);

  useEffect(() => {
    if (trip && trip.status === "Active") {
      try {
        const unsub = onSnapshot(
          doc(db, "driverLocation", trip.trip_id),
          (doc) => {
            console.log("Current data: ", doc.data());
            const data = doc.data();
            if (data) {
              setDriverCurrentLocation({
                latitude: data.latitude,
                longitude: data.longitude,
              });
              console.log({
                latitude: data.latitude,
                longitude: data.longitude,
              });
            }
          }
        );
        return () => unsub();
      } catch (error) {
        setFailedToFetch(true);
        console.error("Error fetching driver location:", error);
      }
    }
  }, [trip]);

  if (failedToFetch)
    return (
      <div
        className=""
        style={{
          height: "100dvh",
          width: "100dvw",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          border: "1px solid",
        }}
      >
        something went wrong
      </div>
    );

  if (!trip || !driverCurrentLocation)
    return (
      <div
        className=""
        style={{
          height: "100dvh",
          width: "100dvw",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          border: "1px solid",
        }}
      >
        loading...
      </div>
    );
  return (
    <LoadScript googleMapsApiKey="google_map_api_key">
      <GoogleMap
        mapContainerStyle={{
          height: "100dvh",
          width: "100dvw",
        }}
        zoom={15}
      >
        <DirectionsService
          options={{
            destination: trip.destination?.location,
            origin: trip.origin?.location,
            travelMode: "DRIVING",
          }}
          callback={(res) => {
            if (res !== null) {
              setDirectionsResponse(res);
            }
          }}
        />

        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
            }}
          />
        )}

        <OverlayViewF
          position={{
            lat: driverCurrentLocation.latitude,
            lng: driverCurrentLocation.longitude,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(width, height) => ({
            x: -(width / 2),
            y: -height / 2,
          })}
        >
          <img src={TRUCKSVG} height={40} width={40} />
        </OverlayViewF>
        <TripInfo trip={trip} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Track;
