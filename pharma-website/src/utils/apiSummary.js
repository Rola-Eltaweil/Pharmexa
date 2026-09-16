import axios from "axios";

export const postData = async (url, data) => {
  try {
    const created = await axios.post(url, data, {
      withCredentials: true,
    });

    return created;
  } catch (error) {
    throw error;
  }
};

export const getData = async (url) => {
  try {
    const getdata = await axios.get(url, {
      withCredentials: true,
    });

    return getdata;
  } catch (error) {
    throw error;
  }
};

export const editData = async (url, data) => {
  try {
    const response = await axios.put(url, data, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const deletedOne = await axios.delete(url, {
      withCredentials: true,
    });

    return deletedOne;
  } catch (error) {
    throw error;
  }
};
