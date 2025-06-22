import React from "react";

export function useViteKey({ key }: { key: string }) {
  const [ value, setValue ] = React.useState<any>(undefined);

  React.useEffect(() => {
    try {
      const rawValue = import.meta.env[key];
      setValue(rawValue ?? undefined);
    } catch (error) {
      console.error(`Error loading env key ${key}:`, error);
    }
  }, [key]);

  return value;
}
