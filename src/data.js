export const tags = [
  {
    label: "javascript",
    color: "#AFE19F",
  },
  {
    label: "regex",
    color: "#FF8B0D",
  },
  {
    label: "react",
    color: "#7DC9E7",
  },
  {
    label: "css",
    color: "#FDB35D",
  },
  {
    label: "vscode",
    color: "#78DBF3⁣",
  },
  {
    label: "mix",
    color: "#E8DDCD",
  },
  {
    label: "node",
    color: "#816AD6",
  },
  {
    label: "git",
    color: "#C9AFA5",
  },
  {
    label: "SASS",
    color: "#FBBC58",
  },
  {
    label: "es6+",
    color: "#AAF0D1",
  },
];

export const tagColors = tags.reduce(
  (acc, { label, color }) => ({ ...acc, [label]: color }),
  {}
);
