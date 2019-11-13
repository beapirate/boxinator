

const reloadBoxesFromApi = () => {

  return (dispatch) => {
    return fetch('/api/box', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      const isJsonResponse = response.headers.get('content-type') &&
        response.headers.get('content-type').indexOf('application/json') >= 0;

      if (!isJsonResponse) {
        // XXX - this should result in a server-error status to user
        console.error("Expected to receive JSON data from API");
        return;
      }

      return response.json().then(json => {
        if (response.ok) {
          dispatch({ type: "LOAD_SUCCESS", response: json })
        }
        else {
          console.error(json);
          dispatch({ type: "LOAD_ERROR", response: json });
        }
      })
    });
  }
}


const saveBoxToApi = (box) => {

  return (dispatch) => {

    return fetch('/api/box', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(box)
    }).then(response => {
        const isJsonResponse = response.headers.get('content-type') &&
          response.headers.get('content-type').indexOf('application/json') >= 0;

        if (!isJsonResponse) {
          // XXX - this should result in a server-error status to user
          console.error("Expected to receive JSON data from API");
          return;
        }

        return response.json().then(json => {
          if (response.ok) {
            dispatch({ type: "SAVE_SUCCESS", response: json })
          }
          else {
            console.error(json);
            dispatch({ type: "SAVE_ERROR", response: json });
          }
        })
      });
  }
}


export { reloadBoxesFromApi, saveBoxToApi };