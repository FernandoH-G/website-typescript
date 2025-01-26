import React from "react";

// export const useIsOverflow = (ref: any, callback: any) => {
export const useIsOverflow = (ref: any) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(undefined);

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      console.log("current: ", current)
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