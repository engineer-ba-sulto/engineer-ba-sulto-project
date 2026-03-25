import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP アニメーションの初期化
 * ヘッダー入場、カード in-view + stagger、ホバー/タップ効果
 */
export function initAnimations() {
  const browserGlobal = globalThis as {
    document?: unknown;
    matchMedia?: (query: string) => { matches: boolean };
  };

  if (!browserGlobal.document || !browserGlobal.matchMedia) {
    return;
  }

  // ユーザーが動きを抑える設定（prefers-reduced-motion）をしているかチェック
  const prefersReducedMotion = browserGlobal.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    // 動きを抑える設定の場合はアニメーションをスキップ、または透明度のみにするなどの対応
    gsap.set("[data-animate]", { opacity: 1, y: 0, scale: 1 });
    return;
  }

  // GSAP Context を使用してクリーンアップを容易にする（Astro の <script> では必須ではないが推奨）
  const ctx = gsap.context(() => {
    // 1. ヘッダー入場アニメーション
    gsap.from("[data-animate='header']", {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power3.out",
    });

    // 1.5. ポートフォリオヘッダーのアニメーション
    gsap.from("[data-animate='portfolio-header']", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-animate='portfolio-header']",
        start: "top 90%",
      },
    });

    // 2. ポートフォリオアイテムの ScrollTrigger + Stagger アニメーション
    // コンテナごとに stagger をかけるのが一般的
    const portfolioItems = gsap.utils.toArray(
      "[data-animate='portfolio-item']",
    );
    if (portfolioItems.length > 0) {
      gsap.from(portfolioItems, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: portfolioItems[0] as Element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  });

  return () => ctx.revert(); // クリーンアップ関数を返す
}
