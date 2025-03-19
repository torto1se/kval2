import { useEffect } from "react";

function RefreshToken() {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await fetch('http://127.0.0.1:5000/refresh', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({refresh_token: localStorage.getItem('refresh_token')})
      })

      const data = await response.json();
      if(response.ok){
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
      } else {
        console.log('ошибка')
      }

    }, 600000)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return ( <></> );
}

export default RefreshToken;
