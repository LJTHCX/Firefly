
---
title: Daily whispers
published: 2026-05-13
pinned: True
password: "ljt1111111111"
passwordHint: "密码四位数"
description: Daily whispers
image: ./cover.jpg
tags: [Daily whispers]
category: Daily whispers
draft: False
---
<div class="timeline-glass">
  <div class="timeline-item">
    <div class="timeline-marker">
      <div class="marker-dot"></div>
      <div class="marker-line"></div>
    </div>
    <div class="timeline-card">
      <div class="card-glow"></div>
      <div class="card-header">
        <span class="date">01/15</span>
        <span class="year">2024</span>
        <span class="tag">里程碑</span>
      </div>
      <h3>发布第一篇文章</h3>
      <p>完成了个人博客的首篇文章记录，开启技术分享之旅。</p>
      <div class="card-footer">
        <span class="badge">📝 首发</span>
        <span class="read-more">阅读全文 →</span>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker">
      <div class="marker-dot"></div>
      <div class="marker-line"></div>
    </div>
    <div class="timeline-card">
      <div class="card-glow"></div>
      <div class="card-header">
        <span class="date">02/20</span>
        <span class="year">2024</span>
        <span class="tag">基础</span>
      </div>
      <h3>完成博客搭建</h3>
      <p>配置域名、主题深度优化、自动化部署上线，访问速度提升50%。</p>
      <div class="card-footer">
        <span class="badge">🚀 部署</span>
        <span class="read-more">阅读全文 →</span>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker">
      <div class="marker-dot"></div>
      <div class="marker-line"></div>
    </div>
    <div class="timeline-card">
      <div class="card-glow"></div>
      <div class="card-header">
        <span class="date">03/10</span>
        <span class="year">2024</span>
        <span class="tag">功能</span>
      </div>
      <h3>添加评论功能</h3>
      <p>集成 Giscus 评论系统，支持 GitHub 账号登录，方便互动交流。</p>
      <div class="card-footer">
        <span class="badge">💬 互动</span>
        <span class="read-more">阅读全文 →</span>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker">
      <div class="marker-dot"></div>
      <div class="marker-line"></div>
    </div>
    <div class="timeline-card">
      <div class="card-glow"></div>
      <div class="card-header">
        <span class="date">04/05</span>
        <span class="year">2024</span>
        <span class="tag">优化</span>
      </div>
      <h3>优化移动端显示</h3>
      <p>全面响应式设计，优化触控交互，移动端阅读体验大幅提升。</p>
      <div class="card-footer">
        <span class="badge">📱 响应式</span>
        <span class="read-more">阅读全文 →</span>
      </div>
    </div>
  </div>
</div>

<style>
/* 基础重置 */
.timeline-glass {
  position: relative;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px 0;
}

/* 时间轴整体背景光晕 */
.timeline-glass::before {
  content: '';
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, 
    rgba(59,130,246,0) 0%,
    rgba(59,130,246,0.6) 20%,
    rgba(139,92,246,0.6) 80%,
    rgba(139,92,246,0) 100%);
  box-shadow: 0 0 8px rgba(59,130,246,0.3);
}

/* 时间轴项目 */
.timeline-item {
  position: relative;
  display: flex;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateX(-30px);
  animation: slideInRight 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 左侧标记区 */
.timeline-marker {
  position: relative;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-dot {
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(59,130,246,0.2), 0 0 0 8px rgba(139,92,246,0.1);
  transition: all 0.3s ease;
  z-index: 2;
}

.timeline-item:hover .marker-dot {
  transform: scale(1.3);
  box-shadow: 0 0 0 6px rgba(59,130,246,0.3), 0 0 0 12px rgba(139,92,246,0.15);
}

/* 卡片主体 - 玻璃拟态 */
.timeline-card {
  position: relative;
  flex: 1;
  margin-left: 20px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  cursor: pointer;
  overflow: hidden;
}

/* 卡片光效 */
.card-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255,255,255,0.4), 
    transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.timeline-card:hover {
  transform: translateY(-6px) scale(1.02);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border-color: rgba(59,130,246,0.4);
}

.timeline-card:hover .card-glow {
  left: 100%;
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.date {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 1px;
}

.year {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.tag {
  margin-left: auto;
  padding: 4px 12px;
  background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15));
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #3b82f6;
}

/* 标题 */
.timeline-card h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  transition: color 0.3s ease;
}

.timeline-card:hover h3 {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* 正文 */
.timeline-card p {
  margin: 0 0 16px 0;
  color: #475569;
  line-height: 1.6;
  font-size: 14px;
}

/* 卡片底部 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.badge {
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  font-size: 12px;
  color: #64748b;
  transition: all 0.3s ease;
}

.timeline-card:hover .badge {
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1));
  color: #3b82f6;
}

.read-more {
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.timeline-card:hover .read-more {
  color: #3b82f6;
  transform: translateX(4px);
  display: inline-block;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .timeline-card {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(255, 255, 255, 0.08);
  }
  
  .timeline-card:hover {
    background: rgba(30, 41, 59, 0.95);
  }
  
  .timeline-card h3 {
    color: #f1f5f9;
  }
  
  .timeline-card p {
    color: #cbd5e1;
  }
  
  .year, .badge {
    color: #94a3b8;
  }
  
  .card-footer {
    border-top-color: rgba(255, 255, 255, 0.08);
  }
}

/* 移动端适配 */
@media (max-width: 640px) {
  .timeline-marker {
    width: 40px;
  }
  
  .timeline-card {
    margin-left: 10px;
    padding: 16px;
  }
  
  .date {
    font-size: 20px;
  }
  
  .timeline-card h3 {
    font-size: 16px;
  }
  
  .tag {
    font-size: 10px;
    padding: 2px 8px;
  }
}
</style>