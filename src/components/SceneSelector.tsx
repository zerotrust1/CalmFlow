import React from "react";
import Selector, { Option } from "./Selector";

const themeOptions: Option[] = [
  { id: "ocean", label: "Ocean", value: "ocean" },
  { id: "forest", label: "Forest", value: "forest" },
  { id: "night", label: "Night", value: "night" },
];

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

export default function SceneSelector({ value, onChange }: Props) {
  return <Selector label="Theme" options={themeOptions} value={value} onChange={onChange} />;
}
