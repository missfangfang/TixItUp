"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses: { label: string; value?: string }[] = [
  { label: "Open / In Progress" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams();

  return (
    <Select
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) {
          params.append("status", status);
        }
        const query = params.size ? `?${params.toString()}` : "0";
        router.push(`/tickets${query}`);
      }}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status.value || "0"} value={status.value || "0"}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
