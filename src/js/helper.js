const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(20)]);
    const data = await res.json();
    console.log(res, data);

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
