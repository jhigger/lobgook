import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RecordDocType } from "./Record.model";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatISODateString(isoString: string) {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-PH", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
}

export function getLatestApplicationNumber(records: RecordDocType[]) {
  if (!records.length) return "1";

  const record = records.reduce((prev, current) => {
    return prev &&
      Number(prev.applicationNumber) > Number(current.applicationNumber)
      ? prev
      : current;
  });

  const latestApplicationNumber = String(Number(record.applicationNumber) + 1);
  return latestApplicationNumber;
}

export function capitalize(str: string) {
  const regex = /(?:^|\s|["'([{])+\S/g;
  const result = str
    .trim()
    .toLowerCase()
    .replace(regex, (match: string) => match.toUpperCase());
  return result;
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function showEstimatedQuota() {
  if (navigator.storage && navigator.storage.estimate) {
    const estimation = await navigator.storage.estimate();
    console.log(`Quota: ${formatBytes(Number(estimation.quota))}`);
    console.log(`Usage: ${formatBytes(Number(estimation.usage))}`);
  } else {
    console.error("StorageManager not found");
  }
}

async function tryPersistWithoutPromptingUser() {
  if (!navigator.storage || !navigator.storage.persisted) {
    return "never";
  }
  let persisted = await navigator.storage.persisted();
  if (persisted) {
    return "persisted";
  }
  if (!navigator.permissions || !navigator.permissions.query) {
    return "prompt"; // It MAY be successful to prompt. Don't know.
  }
  const permission = await navigator.permissions.query({
    name: "persistent-storage",
  });
  if (permission.state === "granted") {
    persisted = await navigator.storage.persist();
    if (persisted) {
      return "persisted";
    } else {
      throw new Error("Failed to persist");
    }
  }
  if (permission.state === "prompt") {
    return "prompt";
  }
  return "never";
}

export async function initStoragePersistence() {
  const persist = await tryPersistWithoutPromptingUser();
  switch (persist) {
    case "never":
      console.log("Not possible to persist storage");
      break;
    case "persisted":
      console.log("Successfully persisted storage silently");
      break;
    case "prompt":
      console.log("Not persisted, but we may prompt user when we want to.");
      break;
  }
}
