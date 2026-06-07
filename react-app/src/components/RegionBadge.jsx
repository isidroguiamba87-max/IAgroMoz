function RegionBadge({ region, province }) {
  return (
    <div className="region-badge">
      <span>📍</span>
      <span>{region} – {province}</span>
    </div>
  )
}

export default RegionBadge
