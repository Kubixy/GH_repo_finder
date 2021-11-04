export const pretifyRowName = (nameArr) => {
  nameArr = nameArr.split(/(?=[A-Z])/).join(" ");
  nameArr = nameArr.charAt(0).toUpperCase() + nameArr.slice(1);

  return nameArr;
};

const swapNames = (name) => {
  switch (name) {
    case "totalCount":
      return "Commits";
    case "commitedDate":
      return "Last commit";
  }
};
