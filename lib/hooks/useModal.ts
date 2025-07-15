import { useCallback, useState } from "react";

export const useModalAddProduct = () => {
  const [open, setOpen] = useState(false);

  return {
    open,
    openModal: useCallback(() => setOpen(true), []),
    closeModal: useCallback(() => setOpen(false), []),
  };
};
