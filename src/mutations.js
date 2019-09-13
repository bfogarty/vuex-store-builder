import { loaded, errored } from "./strings";

export const requestBuilder = slug =>
  function(state) {
    state[loaded(slug)] = false;
    state[errored(slug)] = {};
  };

export const receiveBuilder = (slug, getKey) =>
  function(state, data) {
    if (Array.isArray(data)) {
      data.forEach(datum => Vue.set(state.byId, getKey(datum), datum));
    } else {
      Vue.set(state.byId, getKey(data), data);
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
