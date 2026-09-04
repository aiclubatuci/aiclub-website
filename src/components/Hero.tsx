"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function Hero({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;

    const el: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;

    // Read W/H from the canvas's parent rect, not window.innerHeight.
    // On mobile, window.innerHeight changes as the URL bar collapses on
    // scroll, which would otherwise resize the canvas mid-scroll and
    // visibly jump the logo. The parent uses 100svh (small viewport height)
    // which is stable across scroll.
    function resize() {
      const rect = el.getBoundingClientRect();
      W = Math.round(rect.width) || window.innerWidth;
      H = Math.round(rect.height) || window.innerHeight;
      el.width = W * dpr;
      el.height = H * dpr;
      el.style.width = `${W}px`;
      el.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const NODE_COUNT = window.innerWidth <= 768 ? 44 : 90;
    const margin = 80;
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => {
      const isLarge = Math.random() < 0.18;
      return {
        x: margin + Math.random() * (W - margin * 2),
        y: margin + Math.random() * (H - margin * 2),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: isLarge ? 3.5 + Math.random() * 3.5 : 1.5 + Math.random() * 2,
      };
    });

    const logoImg = new Image();
    let logoReady = false;
    logoImg.onload = () => {
      logoReady = true;
    };
    logoImg.src = "/img/global/hero-logo.png";

    const mouse = { x: -9999, y: -9999 };
    const parallax = { x: 0, y: 0 };
    let animId = 0;
    let lastSubAlpha = 0;
    const startTime = performance.now();

    type HitRegion = { id: string; x: number; y: number; w: number; h: number };
    const hitRegions: HitRegion[] = [];

    function drawNetwork(alpha: number) {
      if (alpha <= 0) return;
      const connDist = 160;
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < connDist) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / connDist) * 0.38 * alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((node) => {
        if (node.r > 3.5) {
          const grad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.r * 3.5,
          );
          grad.addColorStop(0, `rgba(255,255,255,${0.22 * alpha})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(255,255,255,${0.88 * alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate() {
      const now = performance.now();
      const elapsed = now - startTime;
      const fade = (delay: number) =>
        Math.min(1, Math.max(0, (elapsed - delay) / 350));
      const fadeFast = (delay: number) =>
        Math.min(1, Math.max(0, (elapsed - delay) / 250));
      const netAlpha = fadeFast(0);
      const headAlpha = fade(80);
      const logoAlpha = fade(260);
      const subAlpha = fade(420);

      ctx.fillStyle = "#171717";
      ctx.fillRect(0, 0, W, H);

      const targetPX = mouse.x > 0 ? mouse.x - W / 2 : 0;
      const targetPY = mouse.y > 0 ? mouse.y - H / 2 : 0;
      parallax.x += (targetPX - parallax.x) * 0.055;
      parallax.y += (targetPY - parallax.y) * 0.055;

      nodes.forEach((node) => {
        node.vx += (Math.random() - 0.5) * 0.16;
        node.vy += (Math.random() - 0.5) * 0.16;
        node.vx *= 0.985;
        node.vy *= 0.985;
        const mdx = node.x - mouse.x,
          mdy = node.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 140 && mdist > 0.5) {
          const f = (1 - mdist / 140) * 2.8;
          node.vx += (mdx / mdist) * f;
          node.vy += (mdy / mdist) * f;
        }
        const spd = Math.hypot(node.vx, node.vy);
        if (spd > 3.5) {
          node.vx = (node.vx / spd) * 3.5;
          node.vy = (node.vy / spd) * 3.5;
        }
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < node.r) {
          node.x = node.r;
          node.vx = Math.abs(node.vx);
        }
        if (node.x > W - node.r) {
          node.x = W - node.r;
          node.vx = -Math.abs(node.vx);
        }
        if (node.y < node.r) {
          node.y = node.r;
          node.vy = Math.abs(node.vy);
        }
        if (node.y > H - node.r) {
          node.y = H - node.r;
          node.vy = -Math.abs(node.vy);
        }
      });

      drawNetwork(netAlpha);

      const isMobile = W <= 768;

      const fontSize = isMobile
        ? Math.min(60, W * 0.13)
        : Math.min(84, W * 0.065);
      const lineH = fontSize * 0.88;
      const blockH = lineH * 3;
      const logoOX = isMobile ? 0 : parallax.x * 0.011,
        logoOY = isMobile ? 0 : parallax.y * 0.011;
      const headOX = isMobile ? 0 : parallax.x * 0.006,
        headOY = isMobile ? 0 : parallax.y * 0.006;
      const subOX = isMobile ? 0 : parallax.x * 0.003,
        subOY = isMobile ? 0 : parallax.y * 0.003;

      if (headAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = headAlpha;
        const textX = isMobile ? W / 2 + headOX : W * 0.19 + headOX;
        const textY = isMobile
          ? H * 0.17 + headOY
          : (H - blockH) / 2 - H * 0.05 + headOY;
        ctx.font = `400 ${fontSize}px Redaction50, Georgia, serif`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = isMobile ? "center" : "left";
        ctx.textBaseline = "top";
        ctx.letterSpacing = `${(fontSize * 0.03).toFixed(1)}px`;
        ctx.fillText("Artificial", textX, textY);
        ctx.fillText("Intelligence", textX, textY + lineH);
        ctx.fillText("@ UCI", textX, textY + lineH * 2);
        ctx.letterSpacing = "0px";
        ctx.restore();
      }

      if (logoAlpha > 0 && logoReady) {
        ctx.save();
        // Source art is a faint light anteater; boost so it reads as the hero mark.
        ctx.globalAlpha = Math.min(1, logoAlpha * 3.2);
        const scaleH = isMobile ? H * 0.28 : H * 0.6;
        const scaleW = scaleH * (logoImg.width / logoImg.height);
        const cx = isMobile ? W / 2 + logoOX : W * 0.68 + logoOX;
        const cy = isMobile ? H * 0.68 + logoOY : H * 0.5 + logoOY;
        ctx.drawImage(
          logoImg,
          cx - scaleW / 2,
          cy - scaleH / 2,
          scaleW,
          scaleH,
        );
        ctx.restore();
      }

      if (subAlpha > 0) {
        hitRegions.length = 0;
        ctx.save();
        ctx.globalAlpha = subAlpha;
        lastSubAlpha = subAlpha;
        const subFontSize = fontSize * (isMobile ? 0.32 : 0.28);
        const subLineH = subFontSize * 1.55;
        const subBaseX = isMobile ? W * 0.5 + subOX : W * 0.19 + subOX;
        const subY = isMobile
          ? H * 0.17 + blockH + lineH * 0.55 + subOY
          : (H - blockH) / 2 -
            H * 0.05 +
            lineH * 2 +
            lineH * 0.75 +
            H * 0.05 +
            subOY;
        const maxSubW = isMobile
          ? Math.min(W * 0.86, 400)
          : Math.min(W * 0.42, 560);
        ctx.font = `400 ${subFontSize}px 'Space Grotesk', Arial, sans-serif`;
        ctx.textBaseline = "top";

        const runs: [string, boolean][] = [
          [
            "Spreading the learning of artificial intelligence and machine learning through workshops, projects, and real world applications",
            false,
          ],
        ];

        if (isMobile) {
          type Token = { text: string; isBlue: boolean };
          const tokens: Token[] = [];
          for (const [runText, isBlue] of runs) {
            for (const part of runText.split(/(\s+)/)) {
              if (part.length) tokens.push({ text: part, isBlue });
            }
          }
          type Line = { tokens: Token[]; width: number };
          const lines: Line[] = [];
          let curLine: Line = { tokens: [], width: 0 };
          for (const tok of tokens) {
            const isSpace = /^\s+$/.test(tok.text);
            const tw = ctx.measureText(tok.text).width;
            if (!isSpace && curLine.width + tw > maxSubW && curLine.width > 0) {
              while (
                curLine.tokens.length &&
                /^\s+$/.test(curLine.tokens[curLine.tokens.length - 1].text)
              ) {
                const trailing = curLine.tokens.pop()!;
                curLine.width -= ctx.measureText(trailing.text).width;
              }
              lines.push(curLine);
              curLine = { tokens: [], width: 0 };
            }
            if (isSpace && curLine.width === 0) continue;
            curLine.tokens.push(tok);
            curLine.width += tw;
          }
          if (curLine.tokens.length) lines.push(curLine);

          ctx.textAlign = "left";
          let sy = subY;
          for (const line of lines) {
            let sx = subBaseX - line.width / 2;
            for (const tok of line.tokens) {
              const tw = ctx.measureText(tok.text).width;
              ctx.fillStyle = tok.isBlue ? "#4a8fd4" : "#ffffff";
              ctx.fillText(tok.text, sx, sy);
              if (
                tok.isBlue &&
                (tok.text === "learning" ||
                  tok.text === "projects" ||
                  tok.text === "community")
              ) {
                hitRegions.push({
                  id: tok.text,
                  x: sx,
                  y: sy,
                  w: tw,
                  h: subLineH,
                });
              }
              sx += tw;
            }
            sy += subLineH;
          }
        } else {
          let sx = subBaseX,
            sy = subY;
          for (const [runText, isBlue] of runs) {
            const parts = runText.split(/(\s+)/);
            for (const part of parts) {
              if (!part.length) continue;
              const isSpace = /^\s+$/.test(part);
              const tw = ctx.measureText(part).width;
              if (!isSpace && sx + tw > subBaseX + maxSubW && sx > subBaseX) {
                sx = subBaseX;
                sy += subLineH;
              }
              if (isSpace && sx === subBaseX) continue;
              const wordX = sx;
              ctx.fillStyle = isBlue ? "#4a8fd4" : "#ffffff";
              ctx.fillText(part, sx, sy);
              if (
                isBlue &&
                (part === "learning" ||
                  part === "projects" ||
                  part === "community")
              ) {
                hitRegions.push({
                  id: part,
                  x: wordX,
                  y: sy,
                  w: tw,
                  h: subLineH,
                });
              }
              sx += tw;
            }
          }
        }
        ctx.restore();
      }

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      const bridge = ctx.createLinearGradient(0, H - 120, 0, H);
      bridge.addColorStop(0, "rgba(0,0,0,0)");
      bridge.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = bridge;
      ctx.fillRect(0, H - 120, W, 120);
      ctx.restore();

      animId = requestAnimationFrame(animate);
    }

    function onWindowMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onWindowMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function scrollToPillar(id: string) {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function pointInRegions(x: number, y: number) {
      for (const r of hitRegions) {
        if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h)
          return r.id;
      }
      return null;
    }

    function canvasPoint(e: MouseEvent | Touch) {
      const rect = el.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onCanvasMouseMove(e: MouseEvent) {
      if (lastSubAlpha < 0.5) {
        el.style.cursor = "";
        return;
      }
      const { x, y } = canvasPoint(e);
      el.style.cursor = pointInRegions(x, y) ? "pointer" : "";
    }

    function onCanvasMouseLeave() {
      el.style.cursor = "";
    }

    function onClick(e: MouseEvent) {
      if (lastSubAlpha < 0.5) return;
      const { x, y } = canvasPoint(e);
      const id = pointInRegions(x, y);
      if (id) scrollToPillar(id);
    }

    function onTouchEnd(e: TouchEvent) {
      if (lastSubAlpha < 0.5 || e.changedTouches.length === 0) return;
      const { x, y } = canvasPoint(e.changedTouches[0]);
      const id = pointInRegions(x, y);
      if (id) scrollToPillar(id);
    }

    function onResize() {
      resize();
    }

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseleave", onWindowMouseLeave);
    el.addEventListener("mousemove", onCanvasMouseMove);
    el.addEventListener("mouseleave", onCanvasMouseLeave);
    el.addEventListener("click", onClick);
    el.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    document.fonts.load("400 64px Redaction50").catch(() => {});

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseleave", onWindowMouseLeave);
      el.removeEventListener("mousemove", onCanvasMouseMove);
      el.removeEventListener("mouseleave", onCanvasMouseLeave);
      el.removeEventListener("click", onClick);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      id="home"
      className={`relative w-full ${className}`}
      style={{ background: "transparent", height: "100svh" }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
