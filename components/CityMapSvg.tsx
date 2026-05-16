export type MapStyle =
  | 'manhattan'
  | 'paris'
  | 'london'
  | 'barcelona'
  | 'amsterdam'
  | 'tokyo'
  | 'rome'
  | 'grid'

interface Props {
  style: MapStyle
  city?: string
  width?: string | number
  height?: string | number
}

const C = {
  bg: '#f5f0e6',
  water: '#dbd6cc',
  park: '#d5cfc2',
  major: '#1a1a1a',
  minor: '#4a4743',
  label: '#8a7f72',
}

// Pre-computed values to avoid Math.random (hydration-safe)
const H_SPACINGS = [12,8,14,10,9,13,11,8,15,10,12,8,11,14,9,10,13,8,12,11,10,14,9,12,8,11,13,10,15,8,12,9,14,11,10,13,8,12,11,9]
const V_SPACINGS = [15,10,12,8,14,11,9,13,10,12,8,15,11,14,10,9,12,13,8,11,14,10,12,9,15,11,8,13,10,12]

function range(from: number, to: number, step: number): number[] {
  const out: number[] = []
  for (let v = from; v <= to; v += step) out.push(v)
  return out
}

function Manhattan() {
  const streets = range(85, 520, 11)
  const avenues = [65, 98, 130, 156, 180, 206, 234, 262, 296, 328, 358]
  return (
    <svg viewBox="0 0 400 533" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id="cm"><rect width="400" height="533"/></clipPath>
      </defs>
      <rect width="400" height="533" fill={C.bg}/>
      {/* Rivers */}
      <rect x="0" y="0" width="28" height="533" fill={C.water}/>
      <rect x="370" y="0" width="30" height="533" fill={C.water}/>
      {/* Harlem River top */}
      <path d="M28 28 Q200 8 370 32" fill="none" stroke={C.water} strokeWidth="18" opacity="0.7"/>
      <g clipPath="url(#cm)">
        {/* Cross streets */}
        {streets.map(y => (
          <line key={y} x1="28" y1={y} x2="370" y2={y}
            stroke={C.minor} strokeWidth="0.5" opacity="0.6"/>
        ))}
        {/* Avenues */}
        {avenues.map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="533"
            stroke={C.major} strokeWidth="1.3" opacity="0.8"/>
        ))}
        {/* Broadway diagonal */}
        <line x1="210" y1="533" x2="340" y2="0"
          stroke={C.major} strokeWidth="2.2" opacity="0.85"/>
        {/* Central Park */}
        <rect x="206" y="128" width="90" height="166"
          fill={C.park} stroke={C.major} strokeWidth="1.1"/>
      </g>
      <rect x="10" y="10" width="380" height="513" fill="none" stroke={C.major} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Inter,sans-serif"
        fill={C.label} opacity="0.7" letterSpacing="3.5">NEW YORK</text>
    </svg>
  )
}

function Paris() {
  const cx = 200, cy = 285
  // 12 radial boulevards, pre-computed endpoints at 600px radius
  const radials: [number, number][] = [
    [800, 285], [720, 585], [500, 805], [200, 885],
    [-100, 805], [-320, 585], [-400, 285], [-320, -15],
    [-100, -235], [200, -315], [500, -235], [720, -15],
  ]
  return (
    <svg viewBox="0 0 400 533" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id="cp"><rect width="400" height="533"/></clipPath>
      </defs>
      <rect width="400" height="533" fill={C.bg}/>
      <g clipPath="url(#cp)">
        {/* Background street mesh */}
        {range(42, 520, 19).map((y, i) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y + (i%4)*3}
            stroke={C.minor} strokeWidth="0.4" opacity="0.35"/>
        ))}
        {range(18, 395, 23).map((x, i) => (
          <line key={x} x1={x} y1="0" x2={x - (i%3)*4} y2="533"
            stroke={C.minor} strokeWidth="0.4" opacity="0.3"/>
        ))}
        {/* Boulevard ring roads */}
        <circle cx={cx} cy={cy} r="72" fill="none" stroke={C.major} strokeWidth="1.4" opacity="0.55"/>
        <circle cx={cx} cy={cy} r="152" fill="none" stroke={C.major} strokeWidth="1.1" opacity="0.4"/>
        <circle cx={cx} cy={cy} r="238" fill="none" stroke={C.major} strokeWidth="0.9" opacity="0.28"/>
        {/* Radial boulevards */}
        {radials.map(([x2, y2], i) => (
          <line key={i} x1={cx} y1={cy} x2={x2} y2={y2}
            stroke={C.major} strokeWidth="1.7" opacity="0.7"/>
        ))}
        {/* Seine River */}
        <path d="M-10 318 C50 295 95 332 155 308 S240 272 298 290 S362 316 410 300"
          fill="none" stroke={C.water} strokeWidth="22" opacity="0.75"/>
        <path d="M-10 318 C50 295 95 332 155 308 S240 272 298 290 S362 316 410 300"
          fill="none" stroke={C.water} strokeWidth="10" opacity="0.9"/>
        {/* Île de la Cité */}
        <ellipse cx="195" cy="305" rx="26" ry="11" fill={C.bg} stroke={C.major} strokeWidth="0.9"/>
        {/* Étoile roundabout */}
        <circle cx="78" cy="208" r="13" fill="none" stroke={C.major} strokeWidth="1.8" opacity="0.6"/>
      </g>
      <rect x="10" y="10" width="380" height="513" fill="none" stroke={C.major} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Inter,sans-serif"
        fill={C.label} opacity="0.7" letterSpacing="3.5">PARIS</text>
    </svg>
  )
}

function London() {
  return (
    <svg viewBox="0 0 400 533" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id="cl"><rect width="400" height="533"/></clipPath>
      </defs>
      <rect width="400" height="533" fill={C.bg}/>
      <g clipPath="url(#cl)">
        {/* Organic street mesh */}
        {[45,68,88,112,136,157,180,202,224,248,270,294,318,340,364,388,412,438,462,488,514].map((y, i) => (
          <line key={y} x1="0" y1={y+(i%5)*4} x2="400" y2={y-(i%4)*5}
            stroke={C.minor} strokeWidth="0.5" opacity="0.48"/>
        ))}
        {[28,55,82,110,136,162,188,215,242,270,296,324,352,378].map((x, i) => (
          <line key={x} x1={x+(i%3)*5} y1="0" x2={x-(i%4)*4} y2="533"
            stroke={C.minor} strokeWidth="0.5" opacity="0.42"/>
        ))}
        {/* Thames */}
        <path d="M-10 342 C32 320 82 358 142 336 C202 314 242 352 292 332 C342 312 378 348 410 330"
          fill="none" stroke={C.water} strokeWidth="30" opacity="0.8"/>
        {/* Major radial roads from center (~200, 220) */}
        {([
          [200,220,0,0],[200,220,400,0],[200,220,0,533],[200,220,400,533],
          [200,220,200,0],[200,220,200,533],[200,220,0,220],[200,220,400,220],
        ] as [number,number,number,number][]).map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={C.major} strokeWidth="1.5" opacity="0.6"/>
        ))}
        {/* Hyde Park */}
        <rect x="52" y="148" width="108" height="84" rx="4"
          fill={C.park} stroke={C.major} strokeWidth="0.9" opacity="0.85"/>
        {/* Regent's Park */}
        <ellipse cx="172" cy="95" rx="44" ry="54"
          fill={C.park} stroke={C.major} strokeWidth="0.9" opacity="0.75"/>
        {/* Tower Bridge */}
        <rect x="276" y="328" width="20" height="8" fill={C.major} opacity="0.45"/>
      </g>
      <rect x="10" y="10" width="380" height="513" fill="none" stroke={C.major} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Inter,sans-serif"
        fill={C.label} opacity="0.7" letterSpacing="3.5">LONDON</text>
    </svg>
  )
}

function Barcelona() {
  const blockSize = 40, gap = 12, pitch = 52, chamfer = 8
  const blocks: string[] = []
  for (let row = -1; row < 12; row++) {
    for (let col = 0; col < 9; col++) {
      const bx = col * pitch + 2
      const by = row * pitch + 2
      const s = blockSize, c = chamfer
      blocks.push(`M${bx+c},${by} L${bx+s-c},${by} L${bx+s},${by+c} L${bx+s},${by+s-c} L${bx+s-c},${by+s} L${bx+c},${by+s} L${bx},${by+s-c} L${bx},${by+c}Z`)
    }
  }
  return (
    <svg viewBox="0 0 400 533" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id="cb"><rect width="400" height="533"/></clipPath>
      </defs>
      <rect width="400" height="533" fill="#ece7da"/>
      <g clipPath="url(#cb)">
        {/* Eixample octagonal blocks */}
        {blocks.map((d, i) => (
          <path key={i} d={d} fill={C.bg} stroke={C.major} strokeWidth="0.7" opacity="0.55"/>
        ))}
        {/* Avinguda Diagonal */}
        <line x1="0" y1="158" x2="400" y2="330"
          stroke={C.major} strokeWidth="3" opacity="0.8"/>
        {/* Las Ramblas */}
        <line x1="172" y1="0" x2="165" y2="533"
          stroke={C.major} strokeWidth="2.4" opacity="0.75"/>
        {/* Gothic Quarter (organic, lower-center) */}
        <rect x="100" y="385" width="75" height="148" fill="#ece7da" opacity="0.6"/>
        {range(392, 528, 10).map((y, i) => (
          <line key={y} x1="100" y1={y} x2="175" y2={y+(i%3)*6}
            stroke={C.minor} strokeWidth="0.6" opacity="0.55"/>
        ))}
        {/* Mediterranean south */}
        <rect x="0" y="506" width="400" height="27" fill={C.water} opacity="0.65"/>
        <line x1="0" y1="506" x2="400" y2="506" stroke={C.major} strokeWidth="0.8" opacity="0.4"/>
      </g>
      <rect x="10" y="10" width="380" height="513" fill="none" stroke={C.major} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Inter,sans-serif"
        fill={C.label} opacity="0.7" letterSpacing="3.5">BARCELONA</text>
    </svg>
  )
}

function Amsterdam() {
  const cx = 200, cy = 460
  const canals = [90, 168, 248, 335]
  // Spoke angles: radians, pointing upward (-π/2) with spread
  const spokeAngles = [-2.4,-2.0,-1.6,-1.2,-0.8,-0.4,0,0.4,0.8,1.2,1.6,2.0,2.4]
  return (
    <svg viewBox="0 0 400 533" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id="ca"><rect width="400" height="533"/></clipPath>
      </defs>
      <rect width="400" height="533" fill={C.bg}/>
      <g clipPath="url(#ca)">
        {/* IJ Waterway (north) */}
        <rect x="0" y="0" width="400" height="42" fill={C.water} opacity="0.75"/>
        {/* Background street mesh */}
        {range(48, 510, 20).map(y => (
          <line key={y} x1="0" y1={y} x2="400" y2={y}
            stroke={C.minor} strokeWidth="0.4" opacity="0.32"/>
        ))}
        {/* Spoke streets */}
        {spokeAngles.map((angle, i) => (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + 550 * Math.cos(angle - Math.PI/2)}
            y2={cy + 550 * Math.sin(angle - Math.PI/2)}
            stroke={C.major} strokeWidth="1" opacity="0.5"/>
        ))}
        {/* Concentric canals (arcs/circles clipped) */}
        {canals.map((r, i) => (
          <circle key={r} cx={cx} cy={cy} r={r}
            fill="none"
            stroke={C.water}
            strokeWidth={i === 0 ? 5 : i === 1 ? 9 : i === 2 ? 11 : 14}
            opacity="0.85"/>
        ))}
        {/* Canal outlines */}
        {canals.map((r, i) => (
          <circle key={`o${r}`} cx={cx} cy={cy} r={r}
            fill="none" stroke={C.major} strokeWidth="0.6" opacity="0.3"/>
        ))}
        {/* Bridges: short lines where spokes cross canals */}
        {spokeAngles.map((angle, si) =>
          canals.map((r, ci) => {
            const bx = cx + r * Math.cos(angle - Math.PI/2)
            const by = cy + r * Math.sin(angle - Math.PI/2)
            const pa = angle - Math.PI/2 + Math.PI/2
            return (
              <line key={`${si}-${ci}`}
                x1={bx - 7*Math.cos(pa)} y1={by - 7*Math.sin(pa)}
                x2={bx + 7*Math.cos(pa)} y2={by + 7*Math.sin(pa)}
                stroke={C.major} strokeWidth="1.4" opacity="0.55"/>
            )
          })
        )}
        {/* Central station */}
        <rect x="165" y="44" width="70" height="20" rx="2"
          fill={C.major} opacity="0.12" stroke={C.major} strokeWidth="0.8"/>
      </g>
      <rect x="10" y="10" width="380" height="513" fill="none" stroke={C.major} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Inter,sans-serif"
        fill={C.label} opacity="0.7" letterSpacing="3.5">AMSTERDAM</text>
    </svg>
  )
}

function Tokyo() {
  const hYs: number[] = []
  let hy = 40
  for (const s of H_SPACINGS) { if (hy > 525) break; hYs.push(hy); hy += s }
  const vXs: number[] = []
  let vx = 18
  for (const s of V_SPACINGS) { if (vx > 392) break; vXs.push(vx); vx += s }
  return (
    <svg viewBox="0 0 400 533" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id="ct"><rect width="400" height="533"/></clipPath>
      </defs>
      <rect width="400" height="533" fill={C.bg}/>
      <g clipPath="url(#ct)">
        {hYs.map((y, i) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y}
            stroke={C.minor} strokeWidth={i % 7 === 0 ? 1.3 : 0.5} opacity="0.62"/>
        ))}
        {vXs.map((x, i) => (
          <line key={x} x1={x} y1="0" x2={x} y2="533"
            stroke={C.minor} strokeWidth={i % 5 === 0 ? 1.3 : 0.5} opacity="0.62"/>
        ))}
        {/* Yamanote Line loop */}
        <ellipse cx="200" cy="268" rx="132" ry="166"
          fill="none" stroke={C.major} strokeWidth="2.6" opacity="0.65"/>
        {/* Imperial Palace moat */}
        <ellipse cx="200" cy="268" rx="52" ry="47"
          fill="none" stroke={C.water} strokeWidth="10" opacity="0.75"/>
        {/* Palace grounds */}
        <ellipse cx="200" cy="268" rx="42" ry="38"
          fill={C.park} stroke={C.major} strokeWidth="1"/>
        {/* Station dots on Yamanote */}
        {([
          [200,102],[326,188],[330,350],[200,432],[72,350],[70,188],
        ] as [number,number][]).map(([sx,sy], i) => (
          <circle key={i} cx={sx} cy={sy} r="4.5" fill={C.major} opacity="0.45"/>
        ))}
      </g>
      <rect x="10" y="10" width="380" height="513" fill="none" stroke={C.major} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Inter,sans-serif"
        fill={C.label} opacity="0.7" letterSpacing="3.5">TOKYO</text>
    </svg>
  )
}

function Rome() {
  return (
    <svg viewBox="0 0 400 533" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id="cr"><rect width="400" height="533"/></clipPath>
      </defs>
      <rect width="400" height="533" fill={C.bg}/>
      <g clipPath="url(#cr)">
        {/* Organic street mesh */}
        {[45,68,90,112,136,158,180,202,225,248,272,296,318,342,365,388,412,438,462,488,514].map((y, i) => (
          <line key={y} x1="0" y1={y+(i%5)*3} x2="400" y2={y-(i%4)*5}
            stroke={C.minor} strokeWidth="0.52" opacity="0.48"/>
        ))}
        {[26,52,80,108,134,160,186,213,240,268,295,322,350,378].map((x, i) => (
          <line key={x} x1={x+(i%3)*4} y1="0" x2={x-(i%5)*3} y2="533"
            stroke={C.minor} strokeWidth="0.52" opacity="0.42"/>
        ))}
        {/* Tiber River */}
        <path d="M82 0 C97 80 77 162 92 242 C107 322 87 402 102 480 C112 510 122 533 132 533"
          fill="none" stroke={C.water} strokeWidth="22" opacity="0.78"/>
        {/* Ancient Roman roads */}
        <line x1="132" y1="0" x2="252" y2="533" stroke={C.major} strokeWidth="1.6" opacity="0.58"/>
        <line x1="0" y1="198" x2="400" y2="183" stroke={C.major} strokeWidth="1.4" opacity="0.55"/>
        <line x1="0" y1="338" x2="400" y2="312" stroke={C.major} strokeWidth="1.3" opacity="0.5"/>
        {/* Colosseum */}
        <ellipse cx="285" cy="338" rx="22" ry="18"
          fill="none" stroke={C.major} strokeWidth="2" opacity="0.62"/>
        {/* Vatican / St. Peter's Square */}
        <ellipse cx="55" cy="202" rx="28" ry="20"
          fill={C.park} stroke={C.major} strokeWidth="0.9" opacity="0.68"/>
        {/* Piazza Navona */}
        <ellipse cx="175" cy="255" rx="9" ry="18"
          fill={C.park} stroke={C.major} strokeWidth="0.8" opacity="0.5"/>
        {/* Piazza del Popolo */}
        <circle cx="218" cy="82" r="9" fill={C.park} stroke={C.major} strokeWidth="0.8" opacity="0.5"/>
      </g>
      <rect x="10" y="10" width="380" height="513" fill="none" stroke={C.major} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Inter,sans-serif"
        fill={C.label} opacity="0.7" letterSpacing="3.5">ROME</text>
    </svg>
  )
}

function GenericGrid({ city, seed = 0 }: { city: string; seed?: number }) {
  const av = range(30 + (seed % 14), 375, 28 + (seed % 9))
  const st = range(42, 518, 12 + (seed % 6))
  const label = city.toUpperCase().slice(0, 12)
  return (
    <svg viewBox="0 0 400 533" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="400" height="533" fill={C.bg}/>
      {st.map(y => (
        <line key={y} x1="18" y1={y} x2="382" y2={y}
          stroke={C.minor} strokeWidth="0.5" opacity="0.58"/>
      ))}
      {av.map(x => (
        <line key={x} x1={x} y1="18" x2={x} y2="515"
          stroke={C.major} strokeWidth="1.3" opacity="0.75"/>
      ))}
      {/* River hint */}
      <path d={`M0 ${260+seed%60} Q200 ${240+seed%40} 400 ${255+seed%50}`}
        fill="none" stroke={C.water} strokeWidth="18" opacity="0.65"/>
      <rect x="10" y="10" width="380" height="513" fill="none" stroke={C.major} strokeWidth="0.5" opacity="0.2"/>
      <text x="200" y="52" textAnchor="middle" fontSize="8.5" fontFamily="Inter,sans-serif"
        fill={C.label} opacity="0.7" letterSpacing="3.5">{label}</text>
    </svg>
  )
}

export default function CityMapSvg({ style, city = '', width = '100%', height = '100%' }: Props) {
  const style2 = { width, height, display: 'block' }
  const inner = (() => {
    switch (style) {
      case 'manhattan': return <Manhattan/>
      case 'paris':     return <Paris/>
      case 'london':    return <London/>
      case 'barcelona': return <Barcelona/>
      case 'amsterdam': return <Amsterdam/>
      case 'tokyo':     return <Tokyo/>
      case 'rome':      return <Rome/>
      default:          return <GenericGrid city={city} seed={city.length * 13 + city.charCodeAt(0)}/>
    }
  })()
  return <div style={style2}>{inner}</div>
}
