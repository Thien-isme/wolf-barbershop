import api from "./axios";

export const getVoucherOfUser = async () => {
    // try{
    let accessToken = localStorage.getItem("accessToken");


    const response = await api.get('/UserVoucher/get-vouchers-of-user', {
    headers: {
        Authorization: `Bearer ${accessToken}`
        }
    });


    if (response.status === 401) {
    // thử refresh token
    const refreshToken = localStorage.getItem("refreshToken");
    const refreshResponse = await fetch("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      localStorage.setItem("accessToken", data.accessToken);

      // gọi lại request cũ
      return await await api.get('/UserVoucher/get-vouchers-of-user', {
    headers: {
        Authorization: `Bearer ${accessToken}`
        }
    });
;
    } else {
      // hết hạn refresh token => bắt login lại
      window.location.href = "/login";
    }
  }

  return response;
}

    


