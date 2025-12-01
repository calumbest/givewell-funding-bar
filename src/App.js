import { useState } from 'react';

function App() {
  const [availableFunding, setAvailableFunding] = useState(280);
  
  // =====================================================
  // EDIT THESE VALUES TO CHANGE THE CHART
  // Each entry: { ce: 'label', gap: dollarAmount, color: 'hexColor' }
  // =====================================================
  const opportunities = [
    { ce: '15x', gap: 50, color: '#1a5f2a' },
    { ce: '12x', gap: 80, color: '#228b3a' },
    { ce: '10x', gap: 120, color: '#2eb84b' },
    { ce: '8x', gap: 90, color: '#5ec76a' },
    { ce: '6x', gap: 70, color: '#8ed49a' },
    { ce: '4x', gap: 100, color: '#bee5c4' },
  ];
  // =====================================================
  
  const maxGap = Math.max(...opportunities.map(o => o.gap));
  const totalGap = opportunities.reduce((sum, o) => sum + o.gap, 0);
  
  // Special case: when funding is $0, show all buckets as unfunded
  const isZeroFunding = availableFunding === 0;

  // Calculate where funding runs out and what the bar is
  let cumulative = 0;
  let barLevel = null;
  let fundingCutoffIndex = -1;

  if (!isZeroFunding) {
    for (let i = 0; i < opportunities.length; i++) {
      if (cumulative + opportunities[i].gap >= availableFunding && barLevel === null) {
        barLevel = opportunities[i].ce;
        fundingCutoffIndex = i;
      }
      cumulative += opportunities[i].gap;
    }

    // If we can fund everything
    if (barLevel === null && availableFunding >= totalGap) {
      barLevel = opportunities[opportunities.length - 1].ce;
      fundingCutoffIndex = opportunities.length - 1;
    }
  }
  
  const barWidth = 72;
  const barSpacing = 16;
  const chartHeight = 240;
  
  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '32px',
      backgroundColor: '#fafafa',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          color: '#1a1a1a',
          marginBottom: '8px'
        }}>
          How GiveWell Sets Its Funding Bar
        </h2>
        <p style={{ 
          fontSize: '14px', 
          color: '#666',
          marginBottom: '32px',
          lineHeight: 1.5
        }}>
          We rank funding opportunities by cost-effectiveness and fund from the top until our budget runs out. 
          The bar is set by the final dollar we allocate.
        </p>
        
        {/* Chart */}
        <div style={{ position: 'relative', marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
          {/* Y-axis label */}
          <div style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '12px',
            color: '#666',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            marginRight: '36px',
            marginBottom: '48px',
            flexShrink: 0
          }}>
            Funding Opportunities
          </div>
          
          {/* Chart area */}
          <div style={{ 
            position: 'relative'
          }}>
            {/* Y-axis ticks */}
            <div style={{
              position: 'absolute',
              left: '-24px',
              top: 0,
              height: chartHeight,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#999'
            }}>
              <span>${maxGap}M</span>
              <span>${Math.round(maxGap/2)}M</span>
              <span>$0</span>
            </div>
            
            {/* Bars */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: chartHeight,
              gap: `${barSpacing}px`,
              borderBottom: '2px solid #ddd',
              paddingBottom: '2px'
            }}>
              {opportunities.map((opp, i) => {
                const height = (opp.gap / maxGap) * (chartHeight - 20);
                const isFunded = i <= fundingCutoffIndex;
                const isBarLevel = i === fundingCutoffIndex;
                // When funding is $0, show all bars as fully colored
                const barOpacity = isZeroFunding ? 1 : (isFunded ? 1 : 0.35);

                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: `${barWidth}px`,
                      height: `${height}px`,
                      backgroundColor: opp.color,
                      borderRadius: '4px 4px 0 0',
                      opacity: barOpacity,
                      position: 'relative',
                      transition: 'opacity 0.3s ease'
                    }}>
                      {/* Funding amount label */}
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: i < 3 ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.7)'
                      }}>
                        ${opp.gap}M
                      </div>

                      {/* Bar indicator - only show when not at $0 */}
                      {isBarLevel && !isZeroFunding && (
                        <div style={{
                          position: 'absolute',
                          top: '-28px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#d64545',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                        }}>
                          FUNDING BAR
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* X-axis labels */}
            <div style={{
              display: 'flex',
              gap: `${barSpacing}px`,
              marginTop: '8px'
            }}>
              {opportunities.map((opp, i) => {
                // When funding is $0, show all labels as colored
                const labelColor = isZeroFunding ? '#1a1a1a' : (i <= fundingCutoffIndex ? '#1a1a1a' : '#999');

                return (
                  <div key={i} style={{
                    width: `${barWidth}px`,
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: labelColor
                  }}>
                    {opp.ce}
                  </div>
                );
              })}
            </div>
            
            {/* X-axis label */}
            <div style={{
              textAlign: 'center',
              marginTop: '12px',
              fontSize: '12px',
              color: '#666',
              fontWeight: 500
            }}>
              Cost-Effectiveness
            </div>
          </div>
        </div>
        
        {/* Summary box */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Available Funding</div>
              <div style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>${availableFunding}M</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Funding Bar</div>
              <div style={{ fontSize: '24px', fontWeight: 600, color: '#d64545' }}>{barLevel || '—'}</div>
            </div>
          </div>
          
          {/* Slider */}
          <div>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '8px' }}>
              Adjust available funding to see how the bar changes:
            </label>
            <input
              type="range"
              min="0"
              max="550"
              step="10"
              value={availableFunding}
              onChange={(e) => setAvailableFunding(Number(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#999',
              marginTop: '4px'
            }}>
              <span>$0</span>
              <span>$550M</span>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#666',
          lineHeight: 1.6
        }}>
          <strong style={{ color: '#1a1a1a' }}>How to read this chart:</strong> Each bar represents funding opportunities at a given cost-effectiveness level. 
          Darker green = more cost-effective. Faded bars = opportunities below our funding bar that we cannot currently fund. 
          The funding bar is set at <strong style={{ color: '#d64545' }}>{barLevel}</strong> because that's the cost-effectiveness of the last dollar we allocate.
        </div>
      </div>
    </div>
  );
}

export default App;