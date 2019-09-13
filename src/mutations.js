import { loaded, errored } from "./strings";

export const requestBuilder = slug =>
  function(state) {
    state[loaded(slug)] = false;
    state[errored(slug)] = {};
  };

export const receiveBuilder = (slug, getKey) =>
  function(state, data) {
    if (Array.isArray(data)) {
      const dataById = data.reduce((byId, datum) => {
        byId[getKey(datum)] = datum;
        return byId;
      }, {});
      state.byId = Object.assign({}, state.byId, dataById);
    } else {
      state.byId = Object.assign({}, state.byId, {
        [getKey(data)]: data
      });
    }
    state[loaded(slug)] = true;
  };

export const failBuilder = slug =>
  function(state, error) {
    state[errored(slug)] = error;
  };

export default {
  requestBuilder,
  receiveBuilder,
  failBuilder
};
