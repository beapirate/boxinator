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
        return response.text().then(text => {
          console.error("Expected to receive JSON data from API");
          dispatch({ type: "LOAD_ERROR", error: "Invalid data from server", response: text});
        })
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
    }).catch(err => {
      console.error(err);
      dispatch({ type: "LOAD_ERROR", error: err.message });
    })
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
          return response.text().then(text => {
            // XXX - this should result in a server-error status to user
            console.error("Expected to receive JSON data from API");
            dispatch({ type: "SAVE_ERROR", error: "Invalid data from server", response: text});
          })
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
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: "SAVE_ERROR", error: err.message });
      })
  }
}


export { reloadBoxesFromApi, saveBoxToApi };