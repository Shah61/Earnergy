import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Link } from "react-router-dom";
import { ArrowRight, User, Users } from "lucide-react";
import { JOIN_LEVELS, JOIN_SYSTEM, type JoinLevel } from "@home/constants/join";
import { revealDelay } from "@home/utils/reveal";

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
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
          observer.unobserve(entry.target);

          const duration = 1400;
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

  return <span ref={ref}>{count.toLocaleString("en-US")}</span>;
}

function CoinStack({ level }: { level: JoinLevel }) {
  const coins = level.coins;
  const cx = 38;
  const rx = 27;
  const ry = 9.5;
  const thickness = 11;
  const step = 13;
  const baseY = 86;
  const face = "color-mix(in srgb, var(--acc) 30%, #fff)";

  return (
    <svg
      viewBox="0 0 76 100"
      className="w-[56px] flex-none self-end md:w-[66px]"
      aria-hidden="true"
    >
      {Array.from({ length: coins }).map((_, i) => {
        const bottomCy = baseY - i * step;
        const topCy = bottomCy - thickness;
        const isTop = i === coins - 1;
        return (
          <g
            key={i}
            className="j-coin"
            style={{ "--cd": `${0.3 + i * 0.08}s` } as CSSProperties}
          >
            <ellipse cx={cx} cy={bottomCy} rx={rx} ry={ry} fill="var(--acc-deep)" />
            <rect
              x={cx - rx}
              y={topCy}
              width={rx * 2}
              height={thickness}
              fill="var(--acc)"
            />
            <ellipse
              cx={cx}
              cy={topCy}
              rx={rx}
              ry={ry}
              fill={face}
              stroke="var(--acc)"
              strokeWidth="1.5"
            />
            <ellipse
              cx={cx}
              cy={topCy}
              rx={rx - 6}
              ry={ry - 3}
              fill="none"
              stroke="var(--acc)"
              strokeWidth="1"
              strokeDasharray="3 2.5"
              opacity="0.7"
            />
            {isTop && (
              <text
                x={cx}
                y={topCy + 3.5}
                textAnchor="middle"
                fontFamily="Archivo, sans-serif"
                fontWeight="800"
                fontSize="10"
                fill="var(--acc-deep)"
              >
                RM
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function LevelRow({ level, index }: { level: JoinLevel; index: number }) {
  const Icon = index === 0 ? User : Users;

  return (
    <div
      className="j-trow c-r-rise grid items-stretch border-t border-neutral-200 md:grid-cols-[1.3fr_0.72fr_1.5fr]"
      style={
        {
          "--d": `${0.12 + index * 0.09}s`,
          "--acc": level.accent,
          "--acc-soft": level.accentSoft,
          "--acc-deep": level.accentDeep,
        } as CSSProperties
      }
    >
      <div className="flex items-center gap-4 px-5 pt-5 md:px-7 md:py-6">
        <span className="grid h-11 w-13 flex-none place-items-center rounded-xl bg-[var(--acc)] font-display text-sm font-extrabold text-white shadow-[0_8px_18px_-8px_var(--acc)]">
          {level.id}
        </span>
        <span className="grid size-11 flex-none place-items-center rounded-full border-2 border-[var(--acc)] bg-white text-[var(--acc-deep)]">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-extrabold uppercase tracking-[-0.01em] text-black">
            {level.name}
          </h3>
          <p className="text-sm text-neutral-500">{level.sub}</p>
        </div>
      </div>

      <div className="flex items-baseline gap-2 px-5 pt-3 md:flex-col md:items-center md:justify-center md:gap-0.5 md:border-x md:border-dashed md:border-neutral-200 md:px-4 md:py-6 md:pt-6 md:text-center">
        <span className="font-display text-2xl font-extrabold text-black md:text-3xl">
          {JOIN_SYSTEM.perUnit}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          {JOIN_SYSTEM.perUnitLabel}
        </span>
      </div>

      <div className="px-5 pb-5 pt-3 md:px-5 md:py-4">
        <div className="j-pot flex h-full items-center justify-between gap-5 rounded-2xl bg-[var(--acc-soft)] px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">
              {level.calc}
            </p>
            <p className="mt-0.5 font-display text-3xl font-extrabold tracking-[-0.01em] text-[var(--acc-deep)] md:text-4xl">
              RM
              <CountUp value={level.potential} />
            </p>
            <div className="j-bar mt-2.5 max-w-[220px] bg-white/80">
              <span
                className="j-bar-fill"
                style={{ "--w": `${level.bar}%` } as CSSProperties}
              />
            </div>
          </div>
          <CoinStack level={level} />
        </div>
      </div>
    </div>
  );
}

export function JoinCircleSystem() {
  return (
    <section id="circle-system" className="scroll-mt-24 px-1 py-6 md:py-10">
      <div className="mb-10 grid items-start gap-6 md:grid-cols-[minmax(180px,0.9fr)_minmax(0,1.5fr)] md:gap-14">
        <p
          className="c-r-fade font-display text-sm font-bold uppercase tracking-[0.16em] text-black"
          style={revealDelay(0)}
        >
          {JOIN_SYSTEM.tag} <span className="text-[#74c157]">•</span>
        </p>
        <div>
          <h2
            className="c-r-rise font-display text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] md:text-3xl"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            <span className="text-black">{JOIN_SYSTEM.title}</span>{" "}
            <span className="text-[#4f9e34]">{JOIN_SYSTEM.titleDim}</span>
          </h2>
          <p
            className="c-r-fade mt-4 max-w-xl text-base leading-7 text-neutral-600"
            style={{ "--d": "0.18s" } as CSSProperties}
          >
            {JOIN_SYSTEM.text}
          </p>
        </div>
      </div>

      <div
        className="c-r-scale overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_18px_50px_-30px_rgba(0,0,0,0.25)]"
        style={{ "--d": "0.05s" } as CSSProperties}
      >
        {/* Desktop header band */}
        <div className="hidden md:grid md:grid-cols-[1.3fr_0.72fr_1.5fr]">
          <div className="flex items-center bg-[#121212] px-7 py-4">
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-white">
              {JOIN_SYSTEM.columns[0]}
            </span>
          </div>
          <div className="flex items-center justify-center border-l border-white/10 bg-[#121212] px-4 py-4 text-center">
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-white">
              {JOIN_SYSTEM.columns[1]}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 bg-[#74c157] px-6 py-4">
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-black">
              {JOIN_SYSTEM.columns[2]}
            </span>
            <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-[#74c157]">
              All RM50 Is Now Yours!
            </span>
          </div>
        </div>

        {/* Mobile header band */}
        <div className="flex flex-col gap-2 bg-[#121212] px-5 py-4 md:hidden">
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-white">
            {JOIN_SYSTEM.columns[0]}
          </span>
          <span className="self-start rounded-full bg-[#74c157] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] text-black">
            All RM50 Is Now Yours!
          </span>
        </div>

        {JOIN_LEVELS.map((level, index) => (
          <LevelRow key={level.id} level={level} index={index} />
        ))}

        {/* Footer band with BUY NOW */}
        <div
          className="c-r-fade flex flex-col items-center justify-between gap-4 border-t border-neutral-200 bg-[#121212] px-6 py-5 sm:flex-row md:px-7"
          style={{ "--d": "0.5s" } as CSSProperties}
        >
          <p className="text-center text-sm leading-6 text-white/70 sm:text-left">
            {JOIN_SYSTEM.footnote}
          </p>
          <Link
            to={JOIN_SYSTEM.buyBar.buttonHref}
            className="inline-flex w-full flex-none items-center justify-center gap-2 rounded-full bg-[#74c157] px-7 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto"
          >
            {JOIN_SYSTEM.buyBar.buttonLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <p
        className="c-r-fade mt-5 text-center text-sm text-neutral-500"
        style={{ "--d": "0.1s" } as CSSProperties}
      >
        {JOIN_SYSTEM.buyBar.prompt}
      </p>
    </section>
  );
}
