// selectors
export const getAllStatuses = ({ statuses }) => statuses;

export const getSingleStatusById = ({ statuses }, statusId) =>
  statuses.find((status) => status.id === statusId);

const statusesReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};

export default statusesReducer;
