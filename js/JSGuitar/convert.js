const notes = {
  '0E': 'E5',
  '1E': 'F5',
  '2E': 'Fis5',
  '3E': 'G5',
  '4E': 'Gis5',
  '5E': 'A5',
  '6E': 'Ais5',
  '7E': 'B5',
  '8E': 'C6',
  '9E': 'Cis6',
  '10E': 'D6',
  '11E': 'Dis6',
  '12E': 'E6',
  '0A': 'A5',
  '1A': 'Ais5',
  '2A': 'B5',
  '3A': 'C6',
  '4A': 'Cis6',
  '5A': 'D6',
  '6A': 'Dis6',
  '7A': 'E6',
  '8A': 'F6',
  '9A': 'Fis6',
  '10A': 'G6',
  '11A': 'Gis6',
  '12A': 'A6',
  '0D': 'D6',
  '1D': 'Dis6',
  '2D': 'E6',
  '3D': 'F6',
  '4D': 'Fis6',
  '5D': 'G6',
  '6D': 'Gis6',
  '7D': 'A6',
  '8D': 'Ais6',
  '9D': 'B6',
  '10D': 'C7',
  '11D': 'Cis7',
  '12D': 'D7',
  '0G': 'G6',
  '1G': 'Gis6',
  '2G': 'A6',
  '3G': 'Ais6',
  '4G': 'B6',
  '5G': 'C7',
  '6G': 'Cis7',
  '7G': 'D7',
  '8G': 'Dis7',
  '9G': 'E7',
  '10G': 'F7',
  '11G': 'Fis7',
  '12G': 'G7',
};

export const convert = (input) => {
  let result = '';

  Object.keys(notes).forEach((key) => {
    if (key === input) {
      result = notes[key];
    }
  });

  return result;
};
