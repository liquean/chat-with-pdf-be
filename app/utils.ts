interface Passage {
  content: string;
}

export const wait = (ms = 500) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const formatPassages = (array: Passage[]) => {
  return array.map((item) => item.content).join(";;;;;;;");
};
