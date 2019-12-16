export enum Genre {
  HIP_HOP = 'Hip-Hop',
  R_B = 'R&B',
  POP = 'Pop',
  COUNTRY = 'Country',
  DANCEHALL = 'Dancehall',
  REGGAE = 'Reggae',
}

export namespace Genre {

  export function keys(): Array<string> {
    const keys = Object.keys(Genre);
    const keysTrimmed = keys.slice(0, keys.length - 1); // Remove this function (keys()) from keys array.
    return keysTrimmed.filter(val => {
      return val.length !== 1; // Filter out number values, while keeping the actual keys (UP, RIGHT).
    });
  }
}
