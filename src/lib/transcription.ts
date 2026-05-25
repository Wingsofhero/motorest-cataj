export async function transcribeAudio(_audioBlob?: Blob): Promise<string> {
  return "";
}

export function splitActivities(transcript: string): string[] {
  return transcript
    .split(/\n|[.!?]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
