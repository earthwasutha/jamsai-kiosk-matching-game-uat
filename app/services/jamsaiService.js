import axios from "axios";

const getJamsaiToken = () => {
  const url = import.meta.env.VITE_JAMSAI_API_URL + "/oauth2/token";

  let params = new URLSearchParams();
  params.append("grant_type", import.meta.env.VITE_GRANT_TYPE);
  params.append("client_id", import.meta.env.VITE_CLIENT_ID);
  params.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);

  return axios.post(url, params);
};

export const loginWithEmail = async (email) => {
  const {
    data: { access_token },
  } = await getJamsaiToken();

  const url = process.env.NEXT_PUBLIC_API_URL + `/user?email=${email}`;

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const { data } = axios.get(url, config);

  return Promise.resolve(data);
};

export const loginWithJamsaiId = async (jamsaiId) => {
  const {
    data: { access_token },
  } = await getJamsaiToken();

  const url =
    process.env.NEXT_PUBLIC_API_URL +
    "/line_api/users/me?including_wallet=true";

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const { data } = axios.get(url, config);

  return Promise.resolve(data);
};
