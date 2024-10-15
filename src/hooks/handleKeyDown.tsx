import { useCallback } from "react";

const useEnterKey = (onEnter: () => void) => {
  return useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onEnter();
      }
    },
    [onEnter]
  );
};

export default useEnterKey;
