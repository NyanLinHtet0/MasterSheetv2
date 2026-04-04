// backend/utils/idMapper.js
function createIdMapper() {
  const idMap = {};
  
  return {
    mapId: (oldId, newId) => {
      if (oldId < 0) idMap[oldId] = newId;
    },
    resolveId: (id) => {
      // If it's a negative ID, replace it.
      // Otherwise, keep it.
      return idMap[id] !== undefined ? idMap[id] : id;
    },
    getMap: () => idMap
  };
}

module.exports = { createIdMapper };