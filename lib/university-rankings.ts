export type UniversityRankingView = {
  system: string;
  year: number;
  rank: string;
  label: string;
  sourceUrl: string | null;
};

type RankingRecord = {
  universityId: string;
  system: string;
  year: number;
  rankFrom: number | null;
  rankTo: number | null;
  rankText: string | null;
  sourceUrl: string | null;
};

const systemLabels: Record<string, string> = {
  qs: "Global Ranking",
  the: "World University Ranking",
  arwu: "Academic Ranking of World Universities",
  usnews: "U.S. News Global Ranking",
};

const systemPriority = ["qs", "the", "arwu", "usnews"];

export function formatRankingRank(record: {
  rankFrom: number | null;
  rankTo: number | null;
  rankText: string | null;
}) {
  if (record.rankText && record.rankText.trim().length > 0) {
    return `#${record.rankText.trim()}`;
  }

  if (record.rankFrom !== null && record.rankTo !== null) {
    return record.rankFrom === record.rankTo
      ? `#${record.rankFrom}`
      : `#${record.rankFrom}-${record.rankTo}`;
  }

  if (record.rankFrom !== null) {
    return `#${record.rankFrom}`;
  }

  return "Unranked";
}

export function formatRankingSystem(system: string) {
  return system.toUpperCase();
}

export function formatRankingLabel(system: string) {
  return systemLabels[system.toLowerCase()] ?? "Ranking";
}

export function toUniversityRankingView(
  record: RankingRecord,
): UniversityRankingView {
  return {
    system: formatRankingSystem(record.system),
    year: record.year,
    rank: formatRankingRank(record),
    label: formatRankingLabel(record.system),
    sourceUrl: record.sourceUrl,
  };
}

export function pickPrimaryRanking(records: RankingRecord[]) {
  return [...records].sort((left, right) => {
    if (left.year !== right.year) {
      return right.year - left.year;
    }

    const leftPriority = systemPriority.indexOf(left.system.toLowerCase());
    const rightPriority = systemPriority.indexOf(right.system.toLowerCase());

    return (
      (leftPriority === -1 ? Number.MAX_SAFE_INTEGER : leftPriority) -
      (rightPriority === -1 ? Number.MAX_SAFE_INTEGER : rightPriority)
    );
  })[0];
}
