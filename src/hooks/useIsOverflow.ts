import React from "react";

// Shoutout SO & https://www.robinwieruch.de/react-custom-hook-check-if-overflow/
// export const useIsOverflow = (ref: any, callback: any) => {
export const useIsOverflow = (ref: any) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(undefined);

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;
      setIsOverflow(hasOverflow);
      // if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
    // }, [callback, ref]);
  }, [ref]);

  return isOverflow;
};