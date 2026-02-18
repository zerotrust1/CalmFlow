import React from "react";
import Selector, { Option } from "./Selector";

const musicOptions: Option[] = [
  { id: "none", label: "None", value: "none" },
  { id: "ocean", label: "Ocean", value: "ocean" }, // maps to public/sounds/ocean.mp3
  // add more tracks here with matching filenames in public/sounds/
];

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

export function MusicSelector({ value, onChange }: Props) {
  return <Selector label="Music" options={musicOptions} value={value} onChange={onChange} />;
}