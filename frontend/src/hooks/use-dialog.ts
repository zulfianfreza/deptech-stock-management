import { TDialogMode } from "@/types/common.type";
import React from "react";

export default function useDialog<T>() {
  const [isShow, setIsShow] = React.useState(false);
  const [data, setData] = React.useState<T>();
  const [mode, setMode] = React.useState<TDialogMode>("add");

  const close = () => setIsShow(false);

  const open = (pMode: TDialogMode = "add", pData?: T) => {
    setData(pData);
    setIsShow(true);
    setMode(pMode);
  };

  const toggle = (pData?: T) => {
    setData(pData);
    setIsShow((prev) => !prev);
  };

  return {
    toggle,
    isShow,
    setIsShow,
    data,
    setData,
    close,
    open,
    mode,
    setMode,
  };
}
