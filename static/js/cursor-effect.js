// Cursor Effect with p5.js instance mode
// 小さな流れ星がカーソルを追いかけるエフェクト

const cursorEffect = (p) => {
  let stars = [];
  const MAX_STARS = 50; // 星の最大数を制限

  p.setup = () => {
    // キャンバスを作成（画面全体）
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0, 0);
    canvas.style("position", "fixed");
    canvas.style("top", "0");
    canvas.style("left", "0");
    canvas.style("pointer-events", "none"); // マウスイベントを貫通
    canvas.style("z-index", "9999"); // 最前面に配置
  };

  p.draw = () => {
    p.clear(); // 透明背景

    // 星を描画・更新
    for (let i = stars.length - 1; i >= 0; i--) {
      stars[i].update();
      stars[i].display();

      // 消えた星を削除
      if (stars[i].isDead()) {
        stars.splice(i, 1);
      }
    }
  };

  p.mouseMoved = () => {
    // 星の数を制限
    if (stars.length < MAX_STARS) {
      stars.push(new Star(p, p.mouseX, p.mouseY));
    }
  };

  p.mouseMoved = () => {
    // 星の数を制限
    if (stars.length < MAX_STARS) {
      stars.push(new Star(p, p.mouseX, p.mouseY));
    }
  };

  // iPhone用タッチイベント
  p.touchMoved = () => {
    if (stars.length < MAX_STARS) {
      stars.push(new Star(p, p.touchX, p.touchY));
    }
    return false;
  };

  // 星クラス
  class Star {
    constructor(p, x, y) {
      this.p = p;
      this.x = x;
      this.y = y;
      this.vx = p.random(-0.5, 0.5); // 横方向の速度
      this.vy = p.random(-1.5, -0.5); // 上方向の速度（流れ星効果）
      this.alpha = 255; // 不透明度
      this.size = p.random(2, 4); // サイズ
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 4; // ゆっくりフェードアウト
    }

    display() {
      this.p.push();
      this.p.noStroke();
      this.p.fill(5, 52, 92, this.alpha); // #05345c

      // 星を描画（小さな円）
      this.p.ellipse(this.x, this.y, this.size);

      // 尾を描画（流れ星効果）
      this.p.stroke(5, 52, 92, this.alpha * 0.5);
      this.p.strokeWeight(1);
      this.p.line(this.x, this.y, this.x - this.vx * 3, this.y - this.vy * 3);

      this.p.pop();
    }

    isDead() {
      return this.alpha <= 0;
    }
  }

  // ウィンドウサイズ変更時にキャンバスをリサイズ
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

// p5インスタンス作成（DOMContentLoaded後に実行）
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new p5(cursorEffect);
  });
} else {
  new p5(cursorEffect);
}
