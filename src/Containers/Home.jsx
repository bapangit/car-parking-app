import Button from "Components/Button/Button";
import DropDownFilterLoader from "Components/Utils/DropDownFilterLoader";
import { searchPlaces, searchSlots } from "Service/methods";
import moment from "moment";
import { useState } from "react";
import Select from "react-select";
import SplitPane from "react-split-pane";
import styled from "styled-components";

const Container = styled.div``;

const LeftNavBar = styled.div`
  background-color: lightblue;
  height: 100%;
  width: 100%;
  display: flex;
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
        setSlots(slots);
      }
    } catch {}
  };

  const bookSlot = (index) => {};

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
                      <div>Booked at :</div>
                      <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {moment.unix(val.booked_at).format("HH:MM")}
                        <br />
                        {moment.unix(val.booked_at).format("l")}
                      </span>
                    </div>
                    <Button
                      text={val.status === 0 ? "Book" : "Booked"}
                      disabled={val.status === 1}
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
