import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../components/Modal';
import EditableCell from '../components/EditableCell';


const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};


const Dashboard = withRouter(
  class Dashboard extends Component {
    constructor(props) {
      super(props);

      this.state = { isOpen: false };
    }

    toggleModal = (e) => {
      const { isOpen } = this.state;
      e.stopPropagation();
      this.setState({
        isOpen: !isOpen
      });
    };

    render() {
      const { isOpen } = this.state;
      return (
        // <div className="App">
        //   <div style={styles}>
        //     <h2>
        //       EditableCell
        //     </h2>
        //     <EditableCell value="100" modifyValue={value => console.log(value)} />
        //   </div>

        //   <button type="button" onClick={this.toggleModal}>
        //     Open the modal
        //   </button>

        //   <Modal show={isOpen} onClose={this.toggleModal}>
        //     <div>
        //       { "Here's some content for the modal" }
        //     </div>
        //     <button type="button" className="w3-button w3-blue">
        //       RUN
        //     </button>
        //   </Modal>
        // </div>
        <div>
          <h2>
            HOME
          </h2>
        </div>
      );
    }
  }
);

export default Dashboard;
