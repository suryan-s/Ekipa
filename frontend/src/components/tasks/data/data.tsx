import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
  {
    value: "research",
    label: "Research",
  },
];

export const statuses = [
  {
    value: "OVERDUE",
    label: "Overdue",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "TODO",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "IN PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "CANCELLED",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "1",
    value: "1",
    icon: ArrowDownIcon,
  },
  {
    label: "2",
    value: "2",
    icon: ArrowRightIcon,
  },
  {
    label: "3",
    value: "3",
    icon: ArrowRightIcon,
  },
  {
    label: "4",
    value: "4",
    icon: ArrowUpIcon,
  },
  {
    label: "5",
    value: "5",
    icon: ArrowUpIcon,
  },
];
