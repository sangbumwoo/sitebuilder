import axios from "axios";

function getRepos(dispatch, query) {
    //"repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
    // let query = 'steak';
    fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then(response => response.json())
        .then(data => {
            console.log('do we have data? ', data);
            dispatch({ type: 'SET_REPOS', repos: data.items });
        })
}

function getReposAxios(dispatch, query, state) {
    state.doingAjaxCall = true;
    axios
        .get(`https://api.github.com/search/repositories?q=${query}`)
        .then(function (response) {
            setTimeout(() => {
                dispatch({ type: 'SET_REPOS', repos: response.data.items });
                dispatch({
                  type: "SEARCH_INPUT_CHANGE",
                  value: ''
                });

                state.doingAjaxCall = false;
                
            }, 3000);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default {
  getRepos,
  getReposAxios
};