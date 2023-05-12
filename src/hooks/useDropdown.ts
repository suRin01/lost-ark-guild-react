import { useState } from "react";

const useDropdown = (initialDropdown: boolean) => {
  const [dropdown, setDropdownValue] = useState(initialDropdown);

  console.log(dropdown);
  console.log(setDropdownValue);

  return [dropdown];

}

export default useDropdown;