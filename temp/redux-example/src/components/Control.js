import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
const propTypes = { 
    onPlus: PropTypes.func,
    onSubtract: PropTypes.func,
    onRandomizeColor: PropTypes.func,
    
};

function creatWarning(funcName) {
    return () => console.warn(funcName + ' is not defined')
}

const defaultProps = { 
    onPlus: creatWarning('onPlus'),
    onSubtract: creatWarning('onSubtract'),
    onRandomizeColor: creatWarning('onRandomizeColor'),
};
class Control extends Component { 
    render() {
        return(
            <div>
                <button onClick={this.props.onPlus}>+</button>
                <button onClick={this.props.onSubtract}>-</button>
                <button onClick={this.props.onRandomizeColor}>Randomize color</button>
            </div>
        );
    }
}
Control.propTypes = propTypes;
Control.defaultProps = defaultProps
export default Control;