import endpoints from "./endpoints";
import axios from "axios";

const service = axios.create({ baseURL: endpoints.base });

export const getUser = async (phoneNo) => {
  try {
    const result = await service.get(endpoints.users, {
      params: { phone: phoneNo },
    });
    if (result.status === 200 && result.data) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
export const addUser = async (formValues) => {
  try {
    const result = await service.post(endpoints.users, formValues);
    console.log("res", result);
    if (result.status === 201 && result.data) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
export const searchPlaces = async (searchText) => {
  try {
    const result = await service.get(endpoints.places, {
      params: {
        name_like: searchText,
      },
    });
    if (result.status === 200 && result.data) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
export const searchSlots = async (placeId) => {
  try {
    const result = await service.get(endpoints.slots, {
      params: {
        place_id: placeId,
      },
    });
    if (result.status === 200 && result.data) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
export const updateUser = async (userId, data) => {
  try {
    const result = await service.patch(
      `${endpoints.users}/${userId}`,

      data
    );
    if (result.status === 200 && result.data) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
export const updateSlot = async (slotId, data) => {
  console.log("update slot", data);
  try {
    const result = await service.patch(`${endpoints.slots}/${slotId}`, data);
    if (result.status === 200 && result.data) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
