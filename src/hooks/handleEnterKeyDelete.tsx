import { useCallback } from "react";

const useEnterKeyDelete = (onDelete: (id: string) => void, id: string) => {
  return useCallback(
    (event: React.KeyboardEvent<HTMLImageElement>) => {
      if (event.key === "Enter") {
        onDelete(id);
      }
    },
    [onDelete, id]
  );
};

export default useEnterKeyDelete;
