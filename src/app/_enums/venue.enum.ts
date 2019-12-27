export enum Venue {
  MSG = 'Madison Square Garden',
  ZIGGO_DOME = 'Ziggo Dome',
  HONDA_CENTER = 'Honda Center',
  MB_SUPERDOME = 'Mercedes-Benz Superdome',
  BKIA = 'Bukit Kiara Indoor Arena',
  KFC_YUM_CENTER = 'KFC Yum! Center',
  POPPODIUM_013 = '013 Poppodium',
  PARADISO = 'Paradiso',
  BRABANTHALLEN = 'Brabanthallen'
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
