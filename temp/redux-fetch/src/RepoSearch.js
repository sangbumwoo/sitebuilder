import React from "react";
import { connect } from "react-redux";
import Api from "./Api";
console.log("Api?", Api);

class RepoSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doingAjaxCall : false
    }
  }
  render() {
    return <div>
        <h1>Repo Search</h1>
        <form onSubmit={evt => this.props.handleSubmit(evt, this.props.inputValue, this.state)}>
          <input className="w3-margin" value={this.props.inputValue} onChange={this.props.handleInputChange} type="text" />
        </form>
      {this.state.doingAjaxCall && <img style={{ width: 50 + 'px' }} src="http://www.seemypersonality.com/images/block-loading.gif" alt="" />}
        
        <ul className="w3-ul w3-white">
          {this.props.repos.map((repo, index) => <li key={repo.id}>
              <a href={repo.html_url} target="blank">
                {repo.name}
              </a>
            </li>)}
        </ul>
      </div>;
  }
}

// function RepoSearch(props) {
//   return (
//     <div>
//       <h1>Repo Search</h1>
//       <form onSubmit={(evt)=>props.handleSubmit(evt, props.inputValue)}>
//         <input
//           className="w3-margin"
          
//           value={props.inputValue}
//           onChange={props.handleInputChange}
//           type="text"
//         />
//       </form>
//       <ul className="w3-ul w3-white">
//         {props.repos.map((repo, index) => <li key={repo.id}><a href={repo.html_url} target="blank">{repo.name}</a></li>)}
//       </ul>
//     </div>
//   );
// }

const mapStateToProps = state => {
  return {
    inputValue: state.searchInputValue,
    repos: state.repos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleInputChange: evt => {
      console.log("handle input change");
      dispatch({ type: "SEARCH_INPUT_CHANGE", value: evt.target.value });
    },
    handleSubmit: (evt, query, state) => {
      console.log('submit....', state);
      evt.preventDefault();
    //   Api.getRepos(dispatch, query);
      Api.getReposAxios(dispatch, query, state);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoSearch);
// export default RepoSearch;
