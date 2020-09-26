const now = new Date();

const currentLocalTime = ()=> {
  return now.toLocaleTimeString('fi-FI');
};

const currentLocalDateTime = ()=> {
  return `--[ ${now} ]--`;
};
//return `--[ ${} ${now.toLocaleTimeString('fi-FI')} ]--`

/**
 *
 * I don't need this function, getAllPropertyNames.
 *  But in a moment of confusion when I wanted to know what the properties of 'error' are, I found out that you
 * can enumerate and see on the enumerable properties of an object. And in the case of error, error.name is not enumerable. I found out 
 * about that on this stack overflow Q/A,
 * https://stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object/8024294#8024294,
 *  which answered my question very well.
 *
 *
 * This function shows all the properties of an obj --> console.log(getAllPropertyNames(obj));
 */
function getAllPropertyNames( obj ) {
  var props = [];

  do {
    Object.getOwnPropertyNames( obj ).forEach(function ( prop ) {
      if ( props.indexOf( prop ) === -1 ) {
        props.push( prop );
      }
    });
  } while ( obj = Object.getPrototypeOf( obj ) );

  return props;
}
module.exports = { currentLocalTime, currentLocalDateTime, getAllPropertyNames };