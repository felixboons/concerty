export enum Venue {
  ZIGGO_DOME = 'Ziggo Dome',
  BRABANTHALLEN = 'Brabanthallen',
  POPPODIUM_013 = '013 Poppodium',
  PARADISO = 'Paradiso'
}

export namespace Venue {

  export function keys(): Array<string> {
    const keys = Object.keys(Venue);
    const keysTrimmed = keys.slice(0, keys.length - 1); // Remove this function (keys()) from keys array.
    return keysTrimmed.filter(val => {
      return val.length !== 1; // Filter out number values, while keeping the actual keys.
    });
  }
}
