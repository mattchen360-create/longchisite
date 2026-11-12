"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Check, Copy, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { CorporateHero } from "@/components/corporate-hero";
import { homeModules, bannerSlides } from "@/content/home-modules";
const storageKey = "longchi-home-selection-v1";
export function HomeComposition({
  sections,
  review = false,
}: {
  sections: { id: string; node: ReactNode }[];
  review?: boolean;
}) {
  const [hidden, setHidden] = useState<string[]>([]),
    [banner, setBanner] = useState(0),
    [open, setOpen] = useState(false),
    [loaded, setLoaded] = useState(false),
    [copied, setCopied] = useState(false),
    [exportText, setExportText] = useState("");
  useEffect(() => {
    if (!review) return;
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) {
        setHidden(
          Array.isArray(saved.hidden)
            ? saved.hidden.filter((id: unknown) =>
                homeModules.some((m) => m.id === id),
              )
            : [],
        );
        setBanner([0, 1, 2, 3].includes(saved.banner) ? saved.banner : 0);
      }
    } catch {}
    setLoaded(true);
  }, [review]);
  useEffect(() => {
    if (review && loaded)
      try {
        localStorage.setItem(storageKey, JSON.stringify({ hidden, banner }));
      } catch {}
  }, [review, loaded, hidden, banner]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  function toggle(id: string) {
    setHidden((current) =>
      current.includes(id) ? current.filter((s) => s !== id) : [...current, id],
    );
    setCopied(false);
    setExportText("");
  }
  async function copy() {
    const list = (hide: boolean) =>
      homeModules
        .filter((m) => hidden.includes(m.id) === hide)
        .map((m) => m.label)
        .join("、") || "无";
    const text = `龙驰首页筛选结果\nBanner：4 张可切换轮播，当前预览 ${bannerSlides[banner].reviewLabel}\n保留：${list(false)}\n删除：${list(true)}`;
    setExportText(text);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      {review && (
        <div className="home-review-toolbar" lang="zh-CN">
          <div>
            <strong>首页候选版</strong>
            <span>
              20 个板块 / 已显示 {homeModules.length - hidden.length} 个
            </span>
          </div>
          <div>
            <a href="/" target="_blank" rel="noopener noreferrer">
              查看普通首页
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="home-review-panel"
              onClick={() => setOpen((v) => !v)}
            >
              <SlidersHorizontal size={17} />
              筛选板块与 Banner
            </button>
          </div>
        </div>
      )}
      {review && open && (
        <aside
          className="home-review-panel"
          lang="zh-CN"
          id="home-review-panel"
          aria-label="首页板块筛选"
        >
          <div className="home-review-panel-head">
            <h2>边看边排除</h2>
            <button
              type="button"
              aria-label="关闭筛选"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <p>
            选择只保存在本浏览器。勾选保留，不勾选隐藏；完成后复制结果发回对话。
          </p>
          <fieldset>
            <legend>轮播首屏预览</legend>
            {bannerSlides.map((slide, i) => (
              <label key={slide.label}>
                <input
                  type="radio"
                  name="home-banner"
                  checked={banner === i}
                  onChange={() => {
                    setBanner(i);
                    setCopied(false);
                  }}
                />
                {slide.reviewLabel}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>首页板块</legend>
            {homeModules.map((m, i) => (
              <div className="home-review-option" key={m.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={!hidden.includes(m.id)}
                    onChange={() => toggle(m.id)}
                  />
                  <span>
                    <small>
                      {String(i + 1).padStart(2, "0")} · {m.group}
                    </small>
                    {m.label}
                  </span>
                </label>
                {!hidden.includes(m.id) && (
                  <a
                    href={`#review-${m.id}`}
                    onClick={() => setOpen(false)}
                    aria-label={`查看${m.label}`}
                  >
                    查看
                  </a>
                )}
              </div>
            ))}
          </fieldset>
          <div className="home-review-actions">
            <button
              type="button"
              onClick={() => {
                setHidden([]);
                setBanner(0);
                setCopied(false);
                setExportText("");
              }}
            >
              <RotateCcw size={16} />
              恢复全部
            </button>
            <button type="button" onClick={copy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}复制筛选结果
            </button>
          </div>
          <p role="status">{copied ? "已复制，粘贴回对话即可。" : ""}</p>
          {exportText && (
            <textarea
              readOnly
              aria-label="筛选结果文字"
              value={exportText}
              rows={6}
            />
          )}
        </aside>
      )}
      {[
        {
          id: "banner",
          node: (
            <CorporateHero
              activeSlide={review ? banner : undefined}
              onSlideChange={review ? setBanner : undefined}
            />
          ),
        },
        ...sections,
      ].map(({ id, node }) => (
        <div
          id={review ? `review-${id}` : undefined}
          data-home-module={id}
          hidden={review && hidden.includes(id)}
          key={id}
        >
          {review && (
            <div className="home-review-module-label" lang="zh-CN">
              <span>
                {String(homeModules.findIndex((m) => m.id === id) + 1).padStart(
                  2,
                  "0",
                )}{" "}
                / {homeModules.find((m) => m.id === id)?.label}
              </span>
              <button type="button" onClick={() => toggle(id)}>
                隐藏这个板块
                <X size={13} />
              </button>
            </div>
          )}
          {node}
        </div>
      ))}
    </>
  );
}
