import instance from "../utils/instance";

export const getAddress = async (jamsaiId) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/send-address?jamsai_id=${jamsaiId}`;

  return instance.get(url);
};

export const saveAddress = async (jamsai_id, address) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/send-address`;
  const body = {
    jamsai_id,
    ...address,
  };

  return instance.post(url, body);
};

export const getSummary = async (jamsaiId) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/summary?jamsai_id=${jamsaiId}`;

  return instance.get(url);
};

export const login = async (jamsaiId, token) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + `/login`;
    const body = {
      user: jamsaiId,
      token: token,
    };
    const { data } = await instance.post(url, body);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const checkLogin = async (token) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + `/check-login`;
    const body = {
      token: token,
    };
    return (await instance.post(url, body)).data;
  } catch (error) {
    return error.response.data;
  }
};

export const redeemCode = async (jamsaiId, codes) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + `/submit-code`;
    const body = {
      jamsai_id: jamsaiId,
      codes: codes,
    };
    return (await instance.post(url, body)).data;
  } catch (error) {
    return error.response.data;
  }
};

export const failCount = async (jamsaiId) => {
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL + `/fail-submit?jamsai_id=${jamsaiId}`;
    return (await instance.get(url)).data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getDashboard = async (jamsaiId) => {
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL +
      `/scoreboard?limit=5&jamsai_id=${jamsaiId}`;
    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getHistory = async (jamsaiId) => {
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL +
      `/history?limit=5&jamsai_id=${jamsaiId}`;
    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

const getJamsaiToken = () => {
  const url = import.meta.env.VITE_JAMSAI_API_URL + "/oauth2/token";

  let params = new URLSearchParams();
  params.append("grant_type", import.meta.env.VITE_GRANT_TYPE);
  params.append("client_id", import.meta.env.VITE_CLIENT_ID);
  params.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);

  return instance.post(url, params);
};

export const loginWithEmail = async (email) => {
  const {
    data: { access_token },
  } = await getJamsaiToken();

  const url = import.meta.env.VITE_JAMSAI_API_URL + `/user?email=${email}`;

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const { data } = instance.get(url, config);

  return Promise.resolve(data);
};

export const loginWithJamsaiId = async (jamsaiId) => {
  const {
    data: { access_token },
  } = await getJamsaiToken();

  const url =
    import.meta.env.VITE_JAMSAI_API_URL +
    "/line_api/users/me?including_wallet=true";

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const { data } = instance.get(url, config);

  return Promise.resolve(data);
};

export const submitScore = async (
  jamsaiId,
  time,
  deviceType,
  keyPattern,
  historyFlip
) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + `/submit-score`;
    const body = {
      jamsai_id: jamsaiId,
      time: time,
      device_type: deviceType,
      key: keyPattern,
      flip_history: historyFlip,
    };

    return (await instance.post(url, body)).data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRewardType = async (deviceType, count) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    `/reward-type?device_type=${deviceType}&count=${count}`;
  return instance.get(url);
};

export const randomReward = async (deviceType, choice, scoreId, profile) => {
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL +
      `/random-reward?device_type=${deviceType}`;

    const body = {
      choice_no: choice,
      score_id: scoreId,
      profile: profile
    };

    const response = await instance.post(url, body);
    const responseData = response.data?.result || response.data?.data || response.data;

    return {
      data: responseData,
      isSuccess: response.data?.isSuccess !== false
    };
  } catch (error) {
    return {
      data: null,
      isSuccess: false
    };
  }
};

export const getGamePattern = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/game-pattern`;
  const { data } = await instance.get(url);
  return data;
};
