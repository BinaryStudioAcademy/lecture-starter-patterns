import Add from "src/assets/icons/add.svg?react";
import Copy from "src/assets/icons/copy.svg?react";
import Delete from "src/assets/icons/delete.svg?react";
import type { IconName } from "src/common/types/types";

type Props = {
  iconName: IconName;
};

const iconNameToComponent: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  add: Add,
  copy: Copy,
  delete: Delete,
};

const Icon: React.FC<Props> = ({ iconName }) => {
  const IconComponent = iconNameToComponent[iconName];

  return <IconComponent />;
};

export { Icon };
