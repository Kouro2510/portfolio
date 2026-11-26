"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean };
type Packet = { a: number; b: number; t: number; speed: number };

/** Interactive "cluster" network: drifting nodes, links, and packets travelling between them. */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK = 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.min(90, Math.round((w * h) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.8,
        hot: Math.random() < 0.14,
      }));
      packets = [];
      if (still) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!still) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / 140) * 0.6;
            n.x += (dx / Math.sqrt(d2)) * f;
            n.y += (dy / Math.sqrt(d2)) * f;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            links.push([i, j]);
            ctx.strokeStyle = `rgba(243,240,234,${(1 - d / LINK) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const n = nodes[i];
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (dm < 200) {
          ctx.strokeStyle = `rgba(255,90,54,${(1 - dm / 200) * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = n.hot ? "#ff5a36" : "rgba(243,240,234,0.7)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hot ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.hot) {
          ctx.strokeStyle = "rgba(255,90,54,0.25)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (!still) {
        if (packets.length < 14 && links.length && Math.random() < 0.12) {
          const [a, b] = links[Math.floor(Math.random() * links.length)];
          packets.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.02 });
        }
        packets = packets.filter((p) => {
          p.t += p.speed;
          const a = nodes[p.a], b = nodes[p.b];
          if (p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK) return false;
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          ctx.fillStyle = "#6ff2c0";
          ctx.shadowColor = "#6ff2c0";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          return true;
        });
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    resize();
    if (!still) {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
