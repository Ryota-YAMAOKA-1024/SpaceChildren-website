// Cursor Effect with p5.js instance mode (改善版v4)
// 小さな星がカーソルを追いかけるエフェクト
// iPhone: スクロール対応 / PC: マウス移動対応

const cursorEffect = (p) => {
  let stars = [];
  const MAX_STARS = 50; // 星の最大数を制限

  // タッチ状態管理（iPhone/iPad用）
  let touching = false;
  let touchX = 0;
  let touchY = 0;
  let lastTouchX = 0;
  let lastTouchY = 0;

  p.setup = () => {
    // キャンバスを作成（画面全体）
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0, 0);
    canvas.style("position", "fixed");
    canvas.style("top", "0");
    canvas.style("left", "0");
    canvas.style("pointer-events", "none"); // マウスイベントを貫通
    canvas.style("z-index", "9999"); // 最前面に配置

    // =====================================
    // グローバルタッチイベント（ネイティブJS）
    // pointer-events: none を突き抜けて検出
    // =====================================

    document.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches[0]) {
          touching = true;
          touchX = e.touches[0].clientX;
          touchY = e.touches[0].clientY;
          lastTouchX = touchX;
          lastTouchY = touchY;
        }
      },
      { passive: true }
    ); // スクロール性能維持

    document.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches[0]) {
          touchX = e.touches[0].clientX;
          touchY = e.touches[0].clientY;
          touching = true; // スクロール中も星生成を有効化
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      () => {
        touching = false;
      },
      { passive: true }
    );
  };

  p.draw = () => {
    p.clear(); // 透明背景

    // =====================================
    // iPhone/iPad: タッチ中に星を生成
    // =====================================
    if (touching && stars.length < MAX_STARS) {
      // 前回位置からの移動距離をチェック
      let distance = p.dist(touchX, touchY, lastTouchX, lastTouchY);

      if (distance > 10) {
        // 10px以上動いたら新しい星を生成
        stars.push(new Star(p, touchX, touchY));
        lastTouchX = touchX;
        lastTouchY = touchY;
      }
    }

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

  // =====================================
  // PC用：マウス移動イベント
  // =====================================
  p.mouseMoved = () => {
    if (stars.length < MAX_STARS) {
      stars.push(new Star(p, p.mouseX, p.mouseY));
    }
  };

  // 星クラス
  class Star {
    constructor(p, x, y) {
      this.p = p;
      this.x = x;
      this.y = y;

      // カーソルから少し離れる方向にゆっくり移動
      let angle = p.random(p.TWO_PI);
      let speed = p.random(0.2, 0.5);
      this.vx = p.cos(angle) * speed;
      this.vy = p.sin(angle) * speed;

      this.alpha = 255;
      this.size = p.random(5, 10);
      this.rotation = p.random(p.TWO_PI);
      this.rotationSpeed = p.random(-0.05, 0.05);
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.alpha -= 6; // 早く消える
    }

    display() {
      this.p.push();
      this.p.translate(this.x, this.y);
      this.p.rotate(this.rotation);
      this.p.fill(213, 199, 84, this.alpha); // #d5c754
      this.p.noStroke();

      // 星型を描画
      this.drawStar(0, 0, this.size * 0.5, this.size * 0.25, 5);

      this.p.pop();
    }

    // 星型を描画する関数
    drawStar(x, y, radius1, radius2, npoints) {
      let angle = this.p.TWO_PI / npoints;
      let halfAngle = angle / 2.0;
      this.p.beginShape();
      for (
        let a = -this.p.PI / 2;
        a < this.p.TWO_PI - this.p.PI / 2;
        a += angle
      ) {
        let sx = x + this.p.cos(a) * radius1;
        let sy = y + this.p.sin(a) * radius1;
        this.p.vertex(sx, sy);
        sx = x + this.p.cos(a + halfAngle) * radius2;
        sy = y + this.p.sin(a + halfAngle) * radius2;
        this.p.vertex(sx, sy);
      }
      this.p.endShape(this.p.CLOSE);
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
