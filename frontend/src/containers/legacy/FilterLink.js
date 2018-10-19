import { connect } from 'redux';
import { setVisibilityFilter } from "../../Redux/legacy/action";
import Link from '../../components/Link';

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchProps = (dispatch, ownProps) =>{
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
};

const FilterLink = connect(
    mapStateToProps,
    mapDispatchProps,

)(Link);

export default FilterLink;