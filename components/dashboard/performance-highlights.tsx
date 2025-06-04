// components/performance-highlights.tsx

type Props = {
  insights: {
    topCampaign: any
    underperformingCampaign: any
    totalConversions: number
    conversionChange: number
    overallRoas: number
    targetRoas: number
  }
}

export default function PerformanceHighlights({ insights }: Props) {
  const { topCampaign, underperformingCampaign, totalConversions, conversionChange, overallRoas, targetRoas } = insights

  const convChangeText =
    conversionChange >= 0
      ? `🟢 Total Conversiones: ${totalConversions.toLocaleString()} (+${conversionChange.toFixed(1)}% vs. período anterior)`
      : `🔴 Total Conversiones: ${totalConversions.toLocaleString()} (${conversionChange.toFixed(1)}% vs. período anterior)`

  const roasEmoji = overallRoas >= targetRoas ? "🟢" : "🟠"
  const roasText = `${roasEmoji} ROAS general: ${overallRoas.toFixed(1)} (vs. ${targetRoas} objetivo)`

  const bestText = topCampaign ? `🏆 Mejor campaña: ${topCampaign.name} (ROAS ${topCampaign.roas.toFixed(2)})` : null

  const worstText = underperformingCampaign
    ? `⚠️ Peor campaña: ${underperformingCampaign.name} (ROAS ${underperformingCampaign.roas.toFixed(2)})`
    : null

  return (
    <div className="p-4 bg-muted rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Performance Highlights</h3>
      <ul className="space-y-1 text-sm text-muted-foreground">
        <li>{convChangeText}</li>
        <li>{roasText}</li>
        {bestText && <li>{bestText}</li>}
        {worstText && <li>{worstText}</li>}
      </ul>
    </div>
  )
}
