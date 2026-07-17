import { useEffect, useRef, useState, type CSSProperties } from "react";

type NumStatProps = {
  value: number;
  suffix: string;
  label: string;
  style?: CSSProperties;
};

export function NumStat({ value, suffix, label, style }: NumStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const duration = 1300;
          const start = performance.now();
          const ease = (t: number) => 1 - Math.pow(1 - t, 3);

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.round(value * ease(progress)));
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="ncard r-rise" ref={ref} style={style}>
      <div className="nnum">
        {count}
        <span className="u">{suffix}</span>
      </div>
      <p className="nlabel">{label}</p>
    </div>
  );
}
