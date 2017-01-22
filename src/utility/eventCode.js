import wilddog from 'wilddog';

const chars = 'abcdefghiklmnopqrstuvwxyz';
const rand = function (begin, end) {
  return Math.floor(Math.random() * (end - begin + 1) + begin);
};
const randomChar = function (count) {
  let charStr = '';
  for (var i = 0; i < count; i++) {
    charStr += chars.charAt(rand(0, chars.length - 1));
  }
  return charStr;
};

const config = {
  syncURL: 'https://toq.wilddogio.com',
  authDomain: 'toq.wilddog.com'
};

wilddog.initializeApp(config);
var rootRef = wilddog.sync().ref();

const setNewEventCode = (cb) => {
  const eventCode = randomChar(3);
  const onEventValue = rootRef.on('value', (snapshot) => {
    while (snapshot.child(eventCode).exists()) {
      setNewEventCode(cb);
    }
    rootRef.off('value', onEventValue);
    if (typeof (cb) === 'function') {
      cb(eventCode);
    }
    // return rootRef.child(eventCode);
  });
};

const getGivenEventRef = (eventCode) => {
  return rootRef.child(eventCode);
  //   const onEventValue = rootRef.on('value', (snapshot) => {
  //   if(snapshot.child(eventCode).exists()) {
  //     rootRef.off('value', onEventValue);
  //     return rootRef.child(eventCode);
  //   }
  //   return null;
  // });
};
// export default {
//   setNewEventCode: setNewEventCode,
//   getGivenEventRef: getGivenEventRef,
//   EVENT_REF: event_ref
// };
module.exports = {
  setNewEventCode: setNewEventCode,
  getGivenEventRef: getGivenEventRef
  // rootRef: rootRef
};
