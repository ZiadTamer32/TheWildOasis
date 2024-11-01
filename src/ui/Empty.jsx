import PropTypes from "prop-types";

function Empty({ resource }) {
  return <p>No {resource} could be found.</p>;
}

// Define the prop types for the Empty component
Empty.propTypes = {
  resource: PropTypes.string.isRequired // resource is a required string
};

export default Empty;
