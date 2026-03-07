export function MoleculeDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bonds */}
      {[
        [140,30,  80,90],  [140,30, 200,90],
        [80, 90, 50,165],  [80, 90, 140,165],
        [200,90, 140,165], [200,90, 250,165],
        [50, 165,80,240],  [50, 165,140,240],
        [140,165,80,240],  [140,165,200,240],
        [250,165,200,240], [80,240,140,295],
        [200,240,140,295],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="white" strokeWidth="1.5" strokeOpacity="0.25" strokeLinecap="round" />
      ))}

      {/* Atoms */}
      {[
        [140,30,  10, 0],
        [80, 90,  7,  80],
        [200,90,  7,  160],
        [50, 165, 9,  240],
        [140,165, 11, 320],
        [250,165, 7,  400],
        [80, 240, 8,  480],
        [200,240, 8,  560],
        [140,295, 10, 640],
      ].map(([cx,cy,r,delay],i) => (
        <circle key={i} cx={cx} cy={cy} r={r}
          fill="white" fillOpacity={i % 3 === 0 ? 0.5 : 0.25}
          style={{ animation: `pulseDot 3s ease-in-out ${delay}ms infinite` }}
        />
      ))}
    </svg>
  );
}
