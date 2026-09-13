import axios from "axios";

export const postData = async (url, data) => {
  try {
    const created = await axios.post(url, data);
    return created;
  } catch (error) {
    throw error;
  }
};

export const getData = async (url) => {
  try {
    const getdata = await axios.get(url);
    return getdata;
  } catch (error) {
    throw error;
  }
};

export const editData = async (url, data) => {
  console.log("EDIT DATA FUNCTION START");

  try {
    const response = await axios.put(url, data);

    console.log("EDIT DATA RESPONSE:", response);

    return response;
  } catch (error) {
    console.log("EDIT DATA ERROR:", error);
    throw error;
  }
};
export const deleteData = async (url) => {
  try {
    const deletedOne = await axios.delete(url);
    return deletedOne;
  } catch (error) {
    throw error;
  }
};
