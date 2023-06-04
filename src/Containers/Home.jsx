import Button from "Components/Button/Button";
import { UserContext } from "Components/Contexts/UserContext";
import DropDownFilterLoader from "Components/Utils/DropDownFilterLoader";
import {
  getUser,
  searchPlaces,
  searchSlots,
  updateSlot,
  updateUser,
} from "Service/methods";
import { setIsButtonDisable } from "Utils/helper";
import { getFormattedTime } from "Utils/momentService";
import { getCurrentTime } from "Utils/momentService";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import SplitPane from "react-split-pane";
import styled from "styled-components";

const Container = styled.div``;

const LeftNavBar = styled.div`
  background-color: lightblue;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const RightNavBar = styled.div`
  height: 100%;
  width: 100%;
  margin: 15px 0px 0px 15px;
  .slot-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    gap: 15px;
  }
  .slot-box {
    width: 200px;
    height: 200px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    transition: 400ms all;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

const fetchPlaces = async (changedText, setData, setLoading) => {
  try {
    const places = await searchPlaces(changedText);
    if (places && places.length > 0) {
      setData(places);
    }
  } catch {}
};

function Home() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log({ user });
  }, [user]);
  const [
    searchTerm,
    setSearchTerm,
    isPlaceListLoading,
    placeList,
    setPlaceList,
  ] = DropDownFilterLoader({
    call: (changedText, setData, setLoading) =>
      fetchPlaces(changedText, setData, setLoading),
    delay: 500,
  });

  const onSelectedPlace = (place) => {
    setSelectedPlace(place);
    place?.id && fetchSlots(place.id);
  };

  /* Slots */
  const [slots, setSlots] = useState([]);
  const fetchSlots = async (placeId) => {
    try {
      const slots = await searchSlots(placeId);
      if (slots && slots.length > 0) {
        console.log({ slots });
        setSlots(slots);
      }
    } catch {}
  };

  const bookSlot = async (slotId, buttonId) => {
    setIsButtonDisable(buttonId, true);
    const userPhone = user.phone;
    if (userPhone && slotId) {
      const userData = await getUser(userPhone);
      if (userData) {
        const cuser = userData[0];
        if (cuser && cuser.id && cuser.slotId === 0) {
          // updateUser(userData.id);
          const res = await updateSlot(slotId, {
            status: 1,
            booked_at: getCurrentTime(),
            booked_by: cuser.id,
          });
          const resUser = await updateUser(cuser.id, { slotId: slotId });
          if (res && res.status === 1) {
            selectedPlace?.id && fetchSlots(selectedPlace.id);
          }
        }
      }
    }
    setIsButtonDisable(buttonId, false);
  };

  const unBookSlot = async (slotId, buttonId) => {
    setIsButtonDisable(buttonId, true);
    const userPhone = user.phone;
    if (userPhone && slotId) {
      const userData = await getUser(userPhone);
      if (userData) {
        const cuser = userData[0];
        if (cuser && cuser.id && cuser.slotId === slotId) {
          const res = await updateSlot(slotId, {
            status: 0,
            booked_at: getCurrentTime(),
            booked_by: 0,
          });
          const resUser = await updateUser(cuser.id, { slotId: 0 });
          if (res && res.status === 0) {
            selectedPlace?.id && fetchSlots(selectedPlace.id);
          }
        }
      }
    }
    setIsButtonDisable(buttonId, false);
  };

  return (
    <Container>
      <SplitPane
        minSize={270}
        maxSize={800}
        defaultSize={270}
        split="vertical"
        style={{
          height: "90%",
          width: "100%",
        }}
      >
        <LeftNavBar>
          <div style={{ minWidth: "250px", margin: "10px" }}>
            <Select
              value={selectedPlace}
              onChange={onSelectedPlace}
              options={placeList}
              getOptionLabel={(val) => val.name || ""}
              onInputChange={(val) => setSearchTerm(val)}
              inputValue={searchTerm}
            />
          </div>
          <div style={{ margin: "25px 10px" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              {user.car}
            </div>
          </div>
        </LeftNavBar>
        <RightNavBar>
          {/* <div style={{ fontSize: "24px", fontWeight: "500" }}>Slots</div> */}
          <div className="slot-container">
            {slots &&
              slots.length > 0 &&
              slots.map((val, index) => {
                return (
                  <div key={index} className="slot-box">
                    <div style={{ margin: "5px" }}>
                      <span>Slot : </span>
                      <span style={{ fontWeight: "500" }}>
                        {val.name || ""}
                      </span>
                    </div>
                    <div style={{ margin: "5px" }}>
                      <br />
                      <div>{val.status === 0 ? "Unbooked" : "Booked"} at :</div>
                      <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {getFormattedTime(val.booked_at).format("HH:mm")}
                        <br />
                        {getFormattedTime(val.booked_at).format("DD-MM-YYYY")}
                      </span>
                    </div>
                    <Button
                      id="book-button"
                      text={
                        val.status === 0
                          ? "Book"
                          : val.booked_by === user.id
                          ? "Unbook"
                          : "Booked"
                      }
                      disabled={val.status === 1 && val.booked_by !== user.id}
                      onClick={(e) => {
                        if (val.status === 0) {
                          bookSlot(val.id, e.target.id);
                        } else {
                          if (val.booked_by === user.id) {
                            unBookSlot(val.id, e.target.id);
                          }
                        }
                      }}
                      style={{
                        backgroundColor:
                          val.booked_by === user.id ? "lightgreen" : "white",
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </RightNavBar>
      </SplitPane>
    </Container>
  );
}

export default Home;
