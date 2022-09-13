import React, {useEffect} from 'react'

// get access token
const SpotifyAuthParams = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};


const Redirect = (props) => {
  const { setCurrentRoute } = props;

  console.log("hash:", window.location.hash)

    //get the access token, put into local storage
  useEffect(() => {
    console.log("Hash", window.location.hash)
    if (window.location.hash) {

      
      const { access_token, expires_in, token_type } = SpotifyAuthParams(window.location.hash);
      window.location.hash = "";
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      
      setCurrentRoute("home")
    }

    
  }, []);

  return (
    <div>
      <h1
        style={{
          color: "white"
        }}
      >Loading bitch</h1>
    </div>
  )
}

export default Redirect